"use client";

import { useEffect, useState } from "react";

/** 单字符符号/数字池 — 单个出现、像星星一样亮灭 */
const STAR_CHARS = [
  "0", "1", "{", "}", "<", "/", ">", ".", "_", "#", "*", "+", "&",
  "|", "~", "^", "%", "@", ":", ";", "[", "]",
];

const STAR_COUNT = 36;

/** 线性同余伪随机（固定种子 → 位置在服务端/客户端一致，避免 hydration mismatch） */
function seedRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// 位置与节奏保持固定种子随机（已足够分散，不随字符变动），仅字符真正随机
const rng = seedRand(42);
const positions = Array.from({ length: STAR_COUNT }, () => ({
  left: `${4 + rng() * 92}%`,
  top: `${3 + rng() * 90}%`,
  delay: `${(rng() * 9).toFixed(1)}s`,
  dur: `${(2.5 + rng() * 5).toFixed(1)}s`,
  size: 8 + Math.floor(rng() * 10),
}));

function randChar(): string {
  return STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)];
}

function Star({
  pos,
  initialIndex,
}: {
  pos: { left: string; top: string; delay: string; dur: string; size: number };
  initialIndex: number;
}) {
  // 初始用确定性字符以避免 SSR/CSR hydration 不一致；挂载后即随机化
  const [char, setChar] = useState(STAR_CHARS[initialIndex % STAR_CHARS.length]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setChar(randChar()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // 每次闪烁周期结束 → 换一个随机字符，像星星一样不停变换
  const handleIterate = () => setChar(randChar());

  return (
    <span
      className="star-particle"
      style={{
        left: pos.left,
        top: pos.top,
        fontSize: `${pos.size}px`,
        animationDelay: pos.delay,
        animationDuration: pos.dur,
      }}
      onAnimationIteration={handleIterate}
    >
      {char}
    </span>
  );
}

export default function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {positions.map((pos, i) => (
        <Star key={i} pos={pos} initialIndex={i} />
      ))}
    </div>
  );
}
