import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoveTimerProps {
  startDate: Date;
}

export default function LoveTimer({ startDate }: LoveTimerProps) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 计算时间差的函数
    const calculateTimeDifference = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();
      
      // 计算天、时、分、秒
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTime({ days, hours, minutes, seconds });
    };
    
    // 初始化计算
    calculateTimeDifference();
    
    // 每秒更新一次
    const timer = setInterval(calculateTimeDifference, 1000);
    
    return () => clearInterval(timer);
  }, [startDate]);
  
  // 数字变化动画组件
  const AnimatedNumber = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <motion.div
        className="text-3xl md:text-4xl font-bold text-pink-500"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      <AnimatedNumber value={time.days} label="天" />
      <AnimatedNumber value={time.hours} label="时" />
      <AnimatedNumber value={time.minutes} label="分" />
      <AnimatedNumber value={time.seconds} label="秒" />
    </div>
  );
}