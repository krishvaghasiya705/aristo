'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './cursor.module.scss';

const Cursor = () => {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const updatePosition = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      gsap.to(cursorEl, {
        duration: 0.3,
        x: pos.current.x,
        y: pos.current.y,
        ease: 'cubic-bezier(0.52, 0.02, 0, 0.99)',
        overwrite: true,
      });

      requestAnimationFrame(updatePosition);
    };

    const handleMouseEnter = () => cursorEl.classList.add(styles.change);
    const handleMouseLeave = () => cursorEl.classList.remove(styles.change);

    const addHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor-hover]');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const removeHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor-hover]');
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    addHoverListeners();
    requestAnimationFrame(updatePosition);

    const observer = new MutationObserver(() => {
      removeHoverListeners();
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeHoverListeners();
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className={styles.customcursor} />;
};

export default Cursor;
