// "use client";
// import { useEffect } from "react";
// import gsap from "gsap";

import Homeherobanner from "./components/homecomponents/herobanner";

export default function Home() {
  // useEffect(() => {
  //   gsap.from(`.${styles.container}`, {
  //     opacity: 0,
  //     y: 50,
  //     duration: 1,
  //   });
  // }, []);

  return (
    <>
      <Homeherobanner />
    </>
  );
}
