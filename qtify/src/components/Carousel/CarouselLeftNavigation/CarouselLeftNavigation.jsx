import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import LeftArrow from "../../../assets/leftArrow.svg";
import styles from "./CarouselLeftNavigation.module.css";

function CarouselLeftNavigation() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);

 useEffect(() => {
  if (!swiper || typeof swiper.on !== "function") return;
  const update = () => setIsBeginning(swiper.isBeginning);
  update();
  const events = ["slideChange", "fromEdge", "reachBeginning", "resize", "breakpoint", "update"];
  events.forEach((e) => swiper.on(e, update));
  return () => events.forEach((e) => swiper.off(e, update));
}, [swiper]);

  return (
    <div className={styles.leftNavigation} slot="container-end">
      {!isBeginning && (
        <img src={LeftArrow} alt="previous" onClick={() => swiper.slidePrev()} />
      )}
    </div>
  );
}

export default CarouselLeftNavigation;