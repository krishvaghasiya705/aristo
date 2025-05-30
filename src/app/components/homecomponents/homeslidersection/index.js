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
  const containerRef = useRef(null);
  const timeline = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Initialize GSAP timeline
    timeline.current = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1.5,
        ease: "power3.inOut"
      }
    });

    // Initial setup
    gsap.set(slideRefs.current, {
      x: "100%",
      scale: 1.0551,
      y: "-1.1029%",
      z: 0,
      opacity: 0.8,
      visibility: "hidden"
    });

    gsap.set(slideRefs.current[0], {
      x: "0%",
      scale: 1.0551,
      y: "-1.1029%",
      z: 0,
      opacity: 1,
      visibility: "visible"
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
    
    // Make next slide visible before animation
    gsap.set(slideRefs.current[next], { visibility: "visible" });

    timeline.current
      .to(slideRefs.current[current], {
        x: "-100%",
        scale: 1.0551,
        y: "-1.1029%",
        z: 0,
        opacity: 0.8,
        duration: 1.5,
        ease: "power3.inOut"
      })
      .fromTo(
        slideRefs.current[next],
        {
          x: "100%",
          scale: 1.0551,
          y: "-1.1029%",
          z: 0,
          opacity: 0.8
        },
        {
          x: "0%",
          scale: 1.0551,
          y: "-1.1029%",
          z: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            // Hide previous slide after animation
            gsap.set(slideRefs.current[current], { visibility: "hidden" });
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
                <Image
                  src={slide}
                  alt={`slider image ${index + 1}`}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
