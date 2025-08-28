import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeartAnimation from '@/components/HeartAnimation';
import ConfettiEffect from '@/components/ConfettiEffect';
import LoveTimer from '@/components/LoveTimer';

export default function Home() {
  // 恋爱开始日期 - 可以修改为实际的纪念日
  const loveStartDate = new Date('2024-9-28');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  // 页面加载时的动画触发
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 点击爱心时触发撒花效果
  const handleHeartClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden">
      {/* 背景装饰爱心 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <HeartAnimation 
            key={i} 
            size={Math.random() * 20 + 10} 
            top={Math.random() * 100} 
            left={Math.random() * 100} 
            delay={Math.random() * 5} 
            duration={Math.random() * 10 + 10} 
            opacity={Math.random() * 0.5 + 0.2}
          />
        ))}
      </div>
      
      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* 标题 */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          我们的爱情故事
        </motion.h1>
        
        {/* 恋爱时间显示 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md mb-12 border border-pink-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-center text-lg text-gray-600 mb-4">我们已经相爱</h2>
          <LoveTimer startDate={loveStartDate} />
        </motion.div>
        
        {/* 互动爱心按钮 */}
        <motion.button
          onClick={handleHeartClick}
          className="relative group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-8xl text-pink-500">
            <i class="fa-solid fa-heart"></i>
          </div>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-pink-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            点击撒花
          </span>
        </motion.button>
        
        {/* 日期纪念 */}
        <motion.div 
          className="mt-12 text-center text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>始于 <span className="font-semibold text-pink-500">2024年9月28日</span></p>
        </motion.div>
      </div>
      
      {/* 撒花效果 */}
      {showConfetti && <ConfettiEffect />}
    </div>
  );
}