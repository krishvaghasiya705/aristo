"use client"
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./brandslider.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import brandsliderimage1 from "@/assets/images/brandsliderimage1.jpg"
import brandsliderimage2 from "@/assets/images/brandsliderimage2.jpg"
import brandsliderimage3 from "@/assets/images/brandsliderimage3.jpeg"
import brandsliderimage4 from "@/assets/images/brandsliderimage4.jpg"
import brandsliderimage5 from "@/assets/images/brandsliderimage5.png"
import Appliences from "@/assets/icon/appliences";
import Furniture from "@/assets/icon/furniture";
import Kitchensystems from "@/assets/icon/kitchensystems";
import Wardrobes from "@/assets/icon/wardrobes";
import Modulnovaicon from "@/assets/icon/modulnovaicon";
import Meridianiicon from "@/assets/icon/meridianiicon";
import Fiamicon from "@/assets/icon/fiamicon";
import Frigerioicon from "@/assets/icon/frigerioicon";
import Sangiagomoicon from "@/assets/icon/sangiagomoicon";
import { Branddata } from "../branddatajs/branddata";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Brandslider({ category = 'all' }) {
    const { t } = useLanguage();
    const router = useRouter();
    const sectionRef = useRef(null);
    const titleRefs = useRef([]);
    const sliderRef = useRef(null);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(category);

    useEffect(() => {
        setCurrentCategory(category);
    }, [category]);

    const filteredData = currentCategory === 'all' 
      ? Branddata 
      : Branddata.filter(item => item.id === currentCategory);

    const handleCategoryChange = (newCategory) => {
      setCurrentCategory(newCategory);
      router.push(`/brands?category=${newCategory}`);
    };

    useEffect(() => {
        const handleMenuState = (e) => {
            if (e.detail !== undefined) {
                setIsMenuOpen(e.detail);
            }
        };

        window.addEventListener("menuStateChange", handleMenuState);
        return () => window.removeEventListener("menuStateChange", handleMenuState);
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            if (sliderRef.current) {
                setSliderWidth(sliderRef.current.scrollWidth);
                setViewportWidth(window.innerWidth);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        gsap.set(titleRefs.current, {
            y: 146,
        });
      
        gsap.to(titleRefs.current, {
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        });

        const slider = sliderRef.current;
        if (sliderWidth > viewportWidth && !isMenuOpen) {
            gsap.set(slider, {
                x: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${sliderWidth - viewportWidth}`,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        gsap.set(slider, { x: 0 });
                    },
                    onLeaveBack: () => {
                        gsap.set(slider, { x: 0 });
                    }
                }
            });

            tl.to(slider, {
                x: -(sliderWidth - viewportWidth + 250),
                ease: "none",
                duration: 1
            });
        } else {
            gsap.set(slider, {
                x: (viewportWidth - sliderWidth) / 2
            });
        }
      
        return () => {
            gsap.killTweensOf(titleRefs.current);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', updateDimensions);
        };
    }, [sliderWidth, viewportWidth, filteredData, isMenuOpen]);

    return (
      <>
        <div className={styles.brandslidermain} ref={sectionRef}>
          <div className="container">
            <div className={styles.brandslidertitle}>
              <h1>
                <p>
                  <span ref={el => titleRefs.current[0] = el}>{t('brandSlider.title')}</span>
                </p>
              </h1>
            </div>
          </div>
          <div className={styles.brandslideralignment}>
            <div 
              className={styles.brandslider}
              ref={sliderRef}
            >
              {filteredData.map((i, index) => (
                <Link href={`/brands/${i.details.Title.toLowerCase()}`} key={index}>
                  <div className={styles.brandsliderboxmain}>
                    <div className={styles.brandsliderimage}>
                      <Image src={i.sliderimage} alt={i.details.Title} />
                    </div>
                    <div className={styles.brandsliderlogo}>
                      {i.sliderlogo}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filteredData.length === 0 && (
              <div className={styles.brandsliderboxmain}>
                <div className={styles.nodata}>
                  <p>{t('brandSlider.noData')}</p>
                </div>
              </div>
            )}
          </div>
          <div className="container">
            <div className={styles.brandsliderbuttonmain}>
              <button 
                type="button" 
                className={`${styles.brandsliderbutton} ${currentCategory === 'all'}`}
                onClick={() => handleCategoryChange('all')}
              >
                <span>{t('brandSlider.categories.all')}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.brandsliderbutton} ${currentCategory === 'wardrobes' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('wardrobes')}
              >
                <Wardrobes />
                <span>{t('brandSlider.categories.wardrobes')}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.brandsliderbutton} ${currentCategory === 'furniture' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('furniture')}
              >
                <Furniture />
                <span>{t('brandSlider.categories.furniture')}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.brandsliderbutton} ${currentCategory === 'appliences' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('appliences')}
              >
                <Appliences />
                <span>{t('brandSlider.categories.appliences')}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.brandsliderbutton} ${currentCategory === 'kitchen' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('kitchen')}
              >
                <Kitchensystems />
                <span>{t('brandSlider.categories.kitchen')}</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
