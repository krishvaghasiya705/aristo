import Catalogsection from "./components/homecomponents/catalogcardsection";
import Exclusivebrands from "./components/homecomponents/exclusivebrands";
import Homeherobanner from "./components/homecomponents/herobanner";
import Highendsection from "./components/homecomponents/highendsection";
import Homebuttonsection from "./components/homecomponents/homebuttonsection";
import Homeslidersection from "./components/homecomponents/homeslidersection";
import Ourpartners from "./components/homecomponents/ourpartners";
import Showroomsection from "./components/homecomponents/showroomsection";

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
      <Homebuttonsection />
      <Highendsection />
      <Exclusivebrands />
      <Ourpartners />
      <Catalogsection />
      <Showroomsection />
    </>
  );
}
