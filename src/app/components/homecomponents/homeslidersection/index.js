"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./homeslidersection.module.scss";
import Image from "next/image";
import gsap from "gsap";
import sliderimages1 from "@/assets/images/sliderimages1.webp";
import sliderimages2 from "@/assets/images/sliderimages2.webp";
import sliderimages3 from "@/assets/images/sliderimages3.webp";
import sliderimages4 from "@/assets/images/sliderimages4.webp";

export default function Homeslidersection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [sliderimages1, sliderimages2, sliderimages3, sliderimages4];
  const slideRefs = useRef([]);
  const imageContainerRefs = useRef([]);
  const containerRef = useRef(null);
  const timeline = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    timeline.current = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1.5,
        ease: "power3.inOut"
      }
    });
    
    // Initial setup for all slides
    gsap.set(slideRefs.current, {
      x: "100%",
      y: 0,
      z: 0,
      opacity: 0.8,
      visibility: "hidden",
      zIndex: 1,
      transformStyle: "preserve-3d",
      transformPerspective: 2500,
      // scale: 1.1
    });

    // Setup image containers
    gsap.set(imageContainerRefs.current, {
      z: -100,
      transformStyle: "preserve-3d",
      // scale: 1.1,
      // rotateY: 15,
      width: "100%",
      height: "100%"
    });

    // Setup first slide
    gsap.set(slideRefs.current[0], {
      x: "0%",
      y: 0,
      z: 0,
      opacity: 1,
      visibility: "visible",
      zIndex: 2,
      transformStyle: "preserve-3d",
      transformPerspective: 2500,
      // scale: 1.1
    });

    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, []);

  const animateSlides = (current, next) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    timeline.current.clear();
    
    // Prepare next slide
    gsap.set(slideRefs.current[next], { 
      visibility: "visible",
      zIndex: 2,
      transformStyle: "preserve-3d",
      transformPerspective: 2500
    });

    // Animate image containers
    gsap.to(imageContainerRefs.current[current], {
      z: -200,
      duration: 1.5,
      // scale: 1,
      // rotateY: -15,
      ease: "power3.inOut",
      transformStyle: "preserve-3d",
      width: "100%",
      height: "100%"
    });

    gsap.fromTo(imageContainerRefs.current[next],
      { 
        z: -200,
        // scale: 1,
        // rotateY: -15,
        width: "100%",
        height: "100%"
      },
      {
        z: -100,
        duration: 1.5,
        // scale: 1.1,
        // rotateY: 15,
        ease: "power3.inOut",
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%"
      }
    );

    timeline.current
      .to(slideRefs.current[current], {
        x: "-100%",
        y: 0,
        z: 0,
        opacity: 0.8,
        // scale: 1,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(slideRefs.current[current], { 
            visibility: "hidden",
            zIndex: 1
          });
        }
      })
      .fromTo(
        slideRefs.current[next],
        {
          x: "100%",
          y: 0,
          z: 0,
          opacity: 0.8,
          // scale: 1
        },
        {
          x: "0%",
          y: 0,
          z: 0,
          opacity: 1,
          // scale: 1.1,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            setCurrentSlide(next);
            isAnimating.current = false;
          }
        },
        "<"
      );

    timeline.current.play();
  };

  useEffect(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    animateSlides(currentSlide, nextSlide);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating.current) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.homeslidersectionmain}>
        <div className="container">
          <div className={styles.homeslidersection} ref={containerRef}>
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={el => slideRefs.current[index] = el}
                className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              >
                <div 
                  ref={el => imageContainerRefs.current[index] = el}
                  className={styles['imagecontainer']}
                >
                  <Image
                    src={slide}
                    alt={`slider image ${index + 1}`}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
