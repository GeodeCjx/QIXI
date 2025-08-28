import { useState, useEffect } from 'react';


export default function Home() {
  // 恋爱开始日期 - 可以修改为实际的纪念日
  const loveStartDate = new Date('2024-9-28');
  const [showConfetti] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  // 页面加载时的动画触发
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  

  
  return (
    <div>
      fffff
      </div>
 
  );
}