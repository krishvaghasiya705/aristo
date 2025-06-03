import React from "react";
import Link from "next/link";
import styles from "./commonbutton.module.scss";

export default function Commonbutton({Buttonlink, Buttontext, ButtonIcon}) {
  return (
    <Link href={Buttonlink}>
      <button
        type="button"
        className={styles.commonbutton}
        data-cursor-hover
      >
        <span>{Buttontext}</span>
        {ButtonIcon}
      </button>
    </Link>
  );
}
