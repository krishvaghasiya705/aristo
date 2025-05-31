import React from 'react'
import styles from "./homebuttonsection.module.scss"

export default function Homebuttonsection() {
  return (
    <>
      <div className={styles.homebuttonsectionmain}>
        <div className="container">
            <div className={styles.homebuttonsection}>
                <div className={styles.homebuttonsectionflx}>
                    <button type='button' className={styles.homebutton}>Kitchens</button>
                    <button type='button' className={styles.homebutton}>Furniture</button>
                    <button type='button' className={styles.homebutton}>Appliances</button>
                    <button type='button' className={styles.homebutton}>Closets</button>
                    <button type='button' className={styles.homebutton}>Bathrooms</button>
                    <button type='button' className={styles.homebutton}>Sound</button>
                    <button type='button' className={styles.homebutton}>Surfaces</button>
                    <button type='button' className={styles.homebutton}>Decoration</button>
                    <button type='button' className={styles.homebutton}>Art</button>
                    <button type='button' className={styles.homebutton}>Lighting</button>
                    <button type='button' className={styles.homebutton}>Carpets</button>
                    <button type='button' className={styles.homebutton}>Faucets</button>
                    <button type='button' className={styles.homebutton}>Outdoor</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
