import React, { useEffect, useRef } from 'react'
import styles from "./catalogcardpage.module.scss"
import Image from 'next/image'
import Commonbutton from '../../commonbutton/button';
import Arrowicon from "@/assets/icon/arrowicon";

export default function Catalogcardpage({ catalogItem }) {

  if (!catalogItem) {
    return <div>Item not found</div>;
  }

  return (
    <>
    <div className={styles.catalogcardpagemain}>
      <div className="container">
        <div className={styles.catalogcardpage}>
          <div className={styles.catalogcardpageleft}>
            <div className={styles.catalogcardpagecolumnslider}>
            {catalogItem.CardPageData.Sliderimages && catalogItem.CardPageData.Sliderimages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${catalogItem.CardName} image ${index + 1}`}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
          <div></div>
          <div className={styles.catalogcardpageright}>
            <div className={styles.catalogcardpagerightcontent}>
              <h1>{catalogItem.CardPageData.Title}</h1>
              <span>{catalogItem.CardPageData.Hexcode}</span>
              <p>{catalogItem.CardPageData.Paragraph}</p>
              <div className={styles.cardbuttonsalignment}>
                <Commonbutton Buttonlink="/" Buttontext="contact us" ButtonIcon={<Arrowicon />} />
                <a href={catalogItem.CardPageData.InfoLink} target="_blank" rel="noopener noreferrer">
                  <Commonbutton Buttonlink="no" Buttontext="more info" ButtonIcon={<Arrowicon />} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
