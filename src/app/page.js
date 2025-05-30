// "use client";
// import { useEffect } from "react";
// import gsap from "gsap";

import Homeherobanner from "./components/homecomponents/herobanner";
import Homeslidersection from "./components/homecomponents/homeslidersection";

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
      <Homeslidersection />
    </>
  );
}
