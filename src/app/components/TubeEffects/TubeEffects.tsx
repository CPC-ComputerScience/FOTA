
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./TubeEffects.css";

const TubeEffects = () => {
  const [isChangingChannel, setIsChangingChannel] = useState(false);
  const [staticIntensity, setStaticIntensity] = useState(0.05); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.getAttribute("href")?.startsWith("/") && !link.getAttribute("target")) {
        e.preventDefault();
        const href = link.getAttribute("href") || "/";
        
        if (href === pathname) return;
        
        setIsChangingChannel(true);
        setStaticIntensity(0.8); 
        
        setTimeout(() => {
          router.push(href);
          
          setTimeout(() => {
            setIsChangingChannel(false);
            setStaticIntensity(0.05);
          }, 600);
        }, 600);
      }
    };

    document.addEventListener("click", handleLinkClick);
    
    const staticInterval = setInterval(() => {
      if (!isChangingChannel) {
        setStaticIntensity(0.05 + Math.random() * 0.03);
      }
    }, 2000);
    
    return () => {
      document.removeEventListener("click", handleLinkClick);
      clearInterval(staticInterval);
    };
  }, [pathname, router, isChangingChannel]);

  return (
    <>
      <div 
        className="tube-static" 
        style={{ opacity: staticIntensity }}
      />
      
      {isChangingChannel && (
        <div className="channel-change">
          <div className="horizontal-line"></div>
        </div>
      )}
      
      <div className="scan-lines"></div>
      
      <div className="tube-vignette"></div>
    </>
  );
};

export default TubeEffects;
