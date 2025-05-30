'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from "./cursor.module.scss";

const Cursor = () => {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsMoving(true);
    };

    const handleMouseEnter = () => {
      cursorEl.classList.add(styles.change);
    };

    const handleMouseLeave = () => {
      cursorEl.classList.remove(styles.change);
    };

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor-hover]');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    addHoverListeners();

    const animate = () => {
      if (isMoving) {
        gsap.to(cursorEl, {
          duration: 0.5,
          x: mouse.current.x,
          y: mouse.current.y,
          ease: 'power2.out',
        });
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMoving]);

  return <div id="cursor" ref={cursorRef} className={styles.customcursor} />;
};

export default Cursor;
