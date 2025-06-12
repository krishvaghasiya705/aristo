import React from 'react'
import styles from "./branddetailspage.module.scss"
import { Branddata } from "../branddatajs/branddata"
import Image from "next/image"
import Downloadicon from '@/assets/icon/downloadicon'
import Commonbutton from '../../commonbutton/button'

export default async function Branddetailspage({ params }) {
    const brandTitle = params?.detailespage?.toLowerCase()
    const brand = Branddata.find(b => b.details.Title.toLowerCase() === brandTitle)

    if (!brand) {
        return <div>Brand not found</div>
    }

    return (
        <div className={styles.branddetailspagemain}>
            <div className="container">
                <div className={styles.branddetailspagetitle}>
                    <h1>
                        <p>{brand.details.Title}</p>
                    </h1>
                    <a
                        href={brand.details.BrandExplorelink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Commonbutton
                            Buttonlink="no"
                            Buttontext="download pdf catalog"
                            ButtonIcon={<Downloadicon />}
                        />
                    </a>
                </div>
                <div className={styles.brandbannerimage}>
                    <Image src={brand.details.Bannerimage} alt="brand.details.Bannerimage" />
                </div>
                <div className={styles.branddetailsmain}></div>
            </div>
            {/* <div className={styles.brandbanner}>
                <Image 
                    src={brand.details.Bannerimage} 
                    alt={brand.details.Title}
                    className={styles.bannerimage}
                />
                <div className={styles.brandlogo}>
                    {brand.details.Brandlogo}
                </div>
            </div>
            <div className={styles.brandcontent}>
                <h1>{brand.details.Title}</h1>
                <p>{brand.details.Branddescription}</p>
                <div className={styles.brandimages}>
                    {brand.details.BrandImages.map((image, index) => (
                        <div key={index} className={styles.brandimage}>
                            <Image 
                                src={image} 
                                alt={`${brand.details.Title} - Image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <a 
                    href={brand.details.BrandExplorelink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.explorelink}
                >
                    Explore More
                </a>
            </div> */}
        </div>
    )
}
