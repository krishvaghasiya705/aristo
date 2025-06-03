import React from 'react'
import styles from "./footer.module.scss"
import Footerlogo from '@/assets/icon/footerlogo'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footermain}>
      <div className="container">
        <div className={styles.footer}>
          <div className={styles.footerlogo}>
            <Link href={"/"}>
              <Footerlogo />
            </Link>
          </div>
          
          <div className={styles.footercontentmain}></div>
        </div>
      </div>
    </footer>
  )
}
