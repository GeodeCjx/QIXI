import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 生成随机数的辅助函数
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    fallSpeed: number;
    swaySpeed: number;
  }>>([]);

  useEffect(() => {
    // 创建纸屑
    const createConfetti = () => {
      const newConfetti = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: random(0, window.innerWidth),
        y: random(-50, -10),
        size: random(5, 12),
        color: `hsl(${random(0, 360)}, 80%, 60%)`,
        rotation: random(0, 360),
        fallSpeed: random(2000, 5000),
        swaySpeed: random(1000, 3000)
      }));
      
      setConfetti(newConfetti);
    };
    
    createConfetti();
    
    // 3秒后清除纸屑
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            left: piece.x,
            top: piece.y,
            rotate: `${piece.rotation}deg`
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: window.innerHeight + piece.size,
            x: [
              piece.x,
              piece.x + random(-50, 50),
              piece.x + random(-100, 100),
              piece.x + random(-50, 50)
            ],
            rotate: piece.rotation + 360,
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: piece.fallSpeed / 1000,
            ease: 'ease-in'
          }}
          exit={{ opacity: 0 }}
        />
      ))}
    </AnimatePresence>
  );
}