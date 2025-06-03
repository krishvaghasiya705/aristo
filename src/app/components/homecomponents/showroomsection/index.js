"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./showroomsection.module.scss";
import { useLanguage } from "@/app/context/LanguageContext";
import Arrowicon from "@/assets/icon/arrowicon";
import Commonbutton from "../../commonbutton/button";
import showroomimage1 from "@/assets/images/showroomimage1.jpg";
import showroomimage2 from "@/assets/images/showroomimage2.png";
import Image from "next/image";
import Googlemap from "@/assets/icon/googlemap";
import Waze from "@/assets/icon/waze";

export default function Showroomsection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const spansRef = useRef([]);
  const detailRef = useRef([]);
  const { t } = useLanguage();

  // Animation for the card layer
  useEffect(() => {
    const effectClass = styles.showroomsectioncardlayer;
    const effects = document.querySelectorAll(`.${effectClass}`);
    
    effects.forEach((effect) => {
      const animation = gsap.fromTo(
        effect,
        {
          height: "100%"
        },
        {
          height: "0%",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: effect,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      return () => {
        animation.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === effect) {
            trigger.kill();
          }
        });
      };
    });
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollTrigger);
    const timeoutId = setTimeout(refreshScrollTrigger, 1000);

    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      clearTimeout(timeoutId);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = spansRef.current.filter(Boolean);
      gsap.fromTo(
        spans,
        {
          y: 100,
          rotation: 5,
          transformOrigin: "left bottom",
          opacity: 0,
        },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: {
            amount: 1,
            from: "start",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );

      const detail = detailRef.current.filter(Boolean);
      gsap.fromTo(
        detail,
        {
          y: 100,
          rotation: 5,
          transformOrigin: "left bottom",
          opacity: 0,
        },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 30%",
            end: "top 0%",
            scrub: 1,
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    }, cardRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const showrooms = t("showroomSection.showrooms");

  return (
    <>
      <div className={styles.showroomsectionmain} ref={sectionRef}>
        <div className="container">
          <div className={styles.showroomsection}>
            <div className={styles.showroomsectiontitle}>
              <h4>
                <p>
                  <span ref={(el) => (spansRef.current[0] = el)}>
                    {t("showroomSection.title")}
                  </span>
                </p>
              </h4>
            </div>
            <div className={styles.showroomsectioncardgrdmain} ref={cardRef}>
              {showrooms.map((showroom, index) => (
                <div key={index} className={styles.showroomsectioncard}>
                  <div className={styles.showroomsectioncardimg}>
                    <div className={styles.showroomsectioncardlayer}></div>
                    <Image 
                      src={index === 0 ? showroomimage1 : showroomimage2} 
                      alt={`showroomimage${index + 1}`} 
                    />
                  </div>
                  <div className={styles.showroomsectioncarddetails}>
                    <div className={styles.showroomsectioncarddetailsleft}>
                      <h5>
                        <p>
                          <span ref={(el) => (detailRef.current[index * 8] = el)}>
                            {showroom.name}
                          </span>
                        </p>
                        <p>
                          <span ref={(el) => (detailRef.current[index * 8 + 1] = el)}>
                            {showroom.location}
                          </span>
                        </p>
                      </h5>
                      <div>
                        <p className={styles.showroomcarddetaillinemain}>
                          <span className={styles.showroomcarddetilline}>
                            <span ref={(el) => (detailRef.current[index * 8 + 2] = el)}>
                              {showroom.address}
                            </span>
                          </span>
                        </p>
                        <p className={styles.showroomcarddetaillinemain}>
                          <span className={styles.showroomcarddetilline}>
                            <span ref={(el) => (detailRef.current[index * 8 + 3] = el)}>
                              {showroom.phone}
                            </span>
                          </span>
                        </p>
                        <p className={styles.showroomcarddetaillinemain}>
                          <span className={styles.showroomcarddetilline}>
                            <span ref={(el) => (detailRef.current[index * 8 + 4] = el)}>
                              {showroom.email}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.showroomsectioncarddetailsright}>
                      <p>
                        <span className={styles.navigationtitle}>
                          <span ref={(el) => (detailRef.current[index * 8 + 5] = el)}>
                            {t("showroomSection.navigate")}
                          </span>
                        </span>
                      </p>
                      <div className={styles.navigationlinkmain}>
                        <a 
                          href={`https://www.waze.com/ul?ll=${index === 0 ? '32.793095,35.042546' : '32.812235,35.001519'}&navigate=yes`} 
                          ref={(el) => (detailRef.current[index * 8 + 6] = el)} 
                          target="_blank"
                        >
                          <Waze />
                        </a>
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(showroom.address)}`} 
                          ref={(el) => (detailRef.current[index * 8 + 7] = el)} 
                          target="_blank"
                        >
                          <Googlemap />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.showroomsectionbutton}>
              <Commonbutton
                Buttonlink="/"
                Buttontext={t("showroomSection.contactUs")}
                ButtonIcon={<Arrowicon />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
