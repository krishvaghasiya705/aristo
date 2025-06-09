import React from "react";
import Link from "next/link";
import styles from "./commonbutton.module.scss";

export default function Commonbutton({Buttonlink, Buttontext, ButtonIcon}) {
  const buttonContent = (
    <button
      type="button"
      className={styles.commonbutton}
      data-cursor-hover
    >
      <span>{Buttontext}</span>
      {ButtonIcon}
    </button>
  );

  if (Buttonlink === "no") {
    return buttonContent;
  }

  return (
    <Link href={Buttonlink}>
      {buttonContent}
    </Link>
  );
}
