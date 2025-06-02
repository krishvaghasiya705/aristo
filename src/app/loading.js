"use client";
import React, { useEffect, useState } from 'react';
import Logoicon from '../assets/icon/logoicon';
import styles from "./loading.module.scss"

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loadingcontainer}>
      <div className={styles.loadingcontent}>
        <div className={styles.logowrapper}>
          <Logoicon />
          <div className={styles.textanimation}>
            <span>A</span>
            <span>r</span>
            <span>i</span>
            <span>s</span>
            <span>t</span>
            <span>o</span>
          </div>
        </div>
      </div>
      <div className={styles.loadingprogress}>
        <div className={styles.progressbar}>
          <div 
            className={styles.progressfill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progresstext}>{progress}%</div>
      </div>
    </div>
  );
}
