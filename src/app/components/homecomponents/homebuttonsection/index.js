import React from 'react'
import styles from "./homebuttonsection.module.scss"

export default function Homebuttonsection() {
  return (
    <>
      <div className={styles.homebuttonsectionmain}>
        <div className="container">
            <div className={styles.homebuttonsection}>
                <div className={styles.homebuttonsectionflx}>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Kitchens</span>
                        <span>Kitchens</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Furniture</span>
                        <span>Furniture</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Appliances</span>
                        <span>Appliances</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Closets</span>
                        <span>Closets</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Bathrooms</span>
                        <span>Bathrooms</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Sound</span>
                        <span>Sound</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Surfaces</span>
                        <span>Surfaces</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Decoration</span>
                        <span>Decoration</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Art</span>
                        <span>Art</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Lighting</span>
                        <span>Lighting</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Carpets</span>
                        <span>Carpets</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Faucets</span>
                        <span>Faucets</span>
                      </div>
                    </button>
                    <button type='button' className={styles.homebutton}>
                      <div className={styles.homebuttontext}>
                        <span>Outdoor</span>
                        <span>Outdoor</span>
                      </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
