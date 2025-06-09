import React, { useEffect, useRef, useState } from 'react';
import styles from "./catalogcardpage.module.scss";
import Image from 'next/image';
import Commonbutton from '../../commonbutton/button';
import Arrowicon from "@/assets/icon/arrowicon";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from "@/app/context/LanguageContext";

export default function Catalogcardpage({ catalogItem }) {
  const { t, currentLanguage } = useLanguage();
  const sliderRef = useRef(null);
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    gsap.registerPlugin(ScrollTrigger);

    let ctx;

    if (!isMenuOpen) {
      const timeout = setTimeout(() => {
        ctx = gsap.context(() => {
          const totalHeight =
            sliderRef.current.scrollHeight - containerRef.current.offsetHeight;

          gsap.to(sliderRef.current, {
            y: -totalHeight,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${totalHeight}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }, containerRef);
      }, 150); // Adjust delay if your menu animation is longer

      return () => {
        clearTimeout(timeout);
        if (ctx) ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    } else {
      // If menu is open, kill animations and reset position
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (sliderRef.current) {
        gsap.set(sliderRef.current, { y: 0 });
      }
    }

    return () => {
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [catalogItem, isMenuOpen]);

  // Guard: no catalog item
  if (!catalogItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className={styles.catalogcardpagemain} ref={containerRef}>
      <div className="container">
        <div className={styles.catalogcardpage}>
          <div className={styles.catalogcardpageleft}>
            <div className={styles.catalogcardpagecolumnslider} ref={sliderRef}>
              {catalogItem.CardPageData.Sliderimages.map((image, index) => (
                <div
                  key={index}
                  className={styles.sliderImageWrapper}
                  ref={el => (imagesRef.current[index] = el)}
                >
                  <Image
                    src={image}
                    alt={`${catalogItem.CardName} image ${index + 1}`}
                    priority={index === 0}
                    width={768}
                    height={1024}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.catalogcardpageright}>
            <div className={styles.catalogcardpagerightcontent}>
              <h1>{catalogItem.CardPageData.Title[currentLanguage]}</h1>
              <span className={styles.cardhexcode}>{catalogItem.CardPageData.Hexcode}</span>
              <p>{catalogItem.CardPageData.Paragraph[currentLanguage]}</p>
              <div className={styles.cardbuttonsalignment}>
                <Commonbutton
                  Buttonlink="/"
                  Buttontext={t('catalogSection.contactUs')}
                  ButtonIcon={<Arrowicon />}
                />
                <a
                  href={catalogItem.CardPageData.InfoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.moreinfolink}
                >
                  <Commonbutton
                    Buttonlink="no"
                    Buttontext={t('catalogSection.moreInfo')}
                    ButtonIcon={<Arrowicon />}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
