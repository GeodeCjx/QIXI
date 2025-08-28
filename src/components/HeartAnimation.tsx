import { motion } from 'framer-motion';

interface HeartAnimationProps {
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function HeartAnimation({ 
  size, top, left, delay, duration, opacity 
}: HeartAnimationProps) {
  // 定义爱心的漂浮动画
  const floatAnimation = {
    y: [0, -20, 0],
    opacity: [opacity * 0.8, opacity, opacity * 0.8],
    scale: [0.8, 1, 0.8],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      delay
    }
  };

  return (
    <motion.div
      className="absolute text-pink-300"
      style={{ 
        fontSize: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        transform: 'translate(-50%, -50%)'
      }}
      animate={floatAnimation}
    >
      <i class="fa-solid fa-heart"></i>
    </motion.div>
  );
}