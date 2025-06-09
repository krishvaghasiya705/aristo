"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./catalogcardsection.module.scss"
import Link from "next/link";
import Image from "next/image";
import Dropdownicon from "@/assets/icon/dropdownicon";
import { Catalogdat } from "../catalogjson/catalogdata.js";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Catalogcardsection() {
    const { t, currentLanguage } = useLanguage();
    const sectionRef = useRef(null);
    const spansRef = useRef([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [filteredItems, setFilteredItems] = useState(Catalogdat);

    // Function to get the correct image path
    const getImagePath = (path) => {
        // Remove the leading slash if it exists
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `/${cleanPath}`;
    };

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
                        start: "top center",
                        end: "bottom center",
                        scrub: false,
                        toggleActions: "play none none reverse",
                        markers: false,
                    },
                }
            );
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Filter items based on selected filters
    React.useEffect(() => {
        let filtered = Catalogdat;

        if (selectedBrand !== "all") {
            filtered = filtered.filter(item => item.brand.includes(selectedBrand));
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter(item => item.CardCategory.includes(selectedCategory));
        }

        if (selectedSubcategory !== "all") {
            filtered = filtered.filter(item => item.CardSubcategory.includes(selectedSubcategory));
        }

        setFilteredItems(filtered);
    }, [selectedBrand, selectedCategory, selectedSubcategory]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setIsDropdownOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    return (
        <>
            <div className={styles.catalogcardsection} ref={sectionRef}>
                <div className="container">
                    <div className={styles.catalogcardsectiontitle}>
                        <h1>
                            <span ref={(el) => (spansRef.current[0] = el)}>{t('catalogSection.title')}</span>
                        </h1>
                    </div>
                    <div className={styles.branddropdownmain}>
                        <div className={styles.branddrodpowntitlemain}>
                            <div className={styles.branddrodpowntitle} onClick={toggleDropdown} ref={(el) => (spansRef.current[1] = el)} data-cursor-hover>
                                <h2>{t('catalogSection.brand')}</h2> <Dropdownicon />
                            </div>
                        </div>
                        <div className={`${styles.dropdownlistmain} ${isDropdownOpen ? styles.dropdownlistmainactive : ''}`}>
                            <div 
                                className={`${styles.dropdownlistallmain} ${selectedBrand === "all" ? styles.dropdownlistallmainactive : ''}`} 
                                onClick={() => handleBrandSelect("all")} 
                                data-cursor-hover
                            >
                                <span>{t('catalogSection.all')}</span>
                            </div>
                            <div className={styles.dropdownlist}>
                                {["sirius", "sangiacomo", "frigerio", "fiam", "meridiani", "modulnova"].map((brand) => (
                                    <span 
                                        key={brand}
                                        className={`${styles.dropdownlisttext} ${selectedBrand === brand ? styles.dropdownlisttextactive : ''}`} 
                                        onClick={() => handleBrandSelect(brand)}
                                        data-cursor-hover
                                    >
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardfiltercategorymain}>
                        <div className={styles.cardfiltercategory}>
                            {["all", "furnitures", "appliances", "sinkFaucet", "bathroom", "worktop", "outdoorKitchen", "indoorKitchen"].map((category) => (
                                <button 
                                    key={category}
                                    type="button" 
                                    className={`${styles.categorybutton} ${selectedCategory === category ? styles.categorybuttonactive : ''}`} 
                                    onClick={() => handleCategorySelect(category)}
                                    data-cursor-hover
                                >
                                    <span>{t(`catalogSection.categories.${category}`)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.cardfiltersubcategorymain}>
                        <div className={styles.cardfiltersubcategory}>
                            {["all", "sofa", "armchair", "bench", "lowTable", "complements", "tables", "mirror", "chairs", "cupboard", "decorative", "induction", "refrigerator", "oven"].map((subcategory) => (
                                <button 
                                    key={subcategory}
                                    type="button" 
                                    className={`${styles.subcategorybutton} ${selectedSubcategory === subcategory ? styles.subcategorybuttonactive : ''}`} 
                                    onClick={() => handleSubcategorySelect(subcategory)}
                                    data-cursor-hover
                                >
                                    <span>{t(`catalogSection.subcategories.${subcategory}`)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.catalogcardsgrdmain}>
                        {filteredItems && filteredItems.map((item, index) => (
                            <Link 
                                key={index}
                                href={`/catalog/${item.CardName[currentLanguage].toLowerCase().replace(/\s+/g, '-')}`}
                            >
                                <div className={styles.catalogcardsmain}>
                                    <div className={styles.catalogcardsimage}>
                                        <Image 
                                            src={item.CardImage} 
                                            alt={item.CardName[currentLanguage]} 
                                            width={1000} 
                                            height={1000}
                                            style={{ objectFit: 'cover' }}
                                            />
                                    </div>
                                    <h3>{item.CardName[currentLanguage]}</h3>
                                    <p>{item.CardTitle[currentLanguage]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
