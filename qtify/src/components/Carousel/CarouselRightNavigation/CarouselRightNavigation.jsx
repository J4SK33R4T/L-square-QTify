import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import RightArrow from "../../../assets/rightArrow.svg";
import styles from "./CarouselRightNavigation.module.css";

function CarouselRightNavigation() {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const update = () => setIsEnd(swiper.isEnd);
    update(); // sync immediately on mount
    const events = ["slideChange", "fromEdge", "reachEnd", "resize", "breakpoint", "update"];
    events.forEach((e) => swiper.on(e, update));
    return () => events.forEach((e) => swiper.off(e, update));
  }, [swiper]);

  return (
    <div className={styles.rightNavigation} slot="container-end">
      {!isEnd && (
        <img src={RightArrow} alt="next" onClick={() => swiper.slideNext()} />
      )}
    </div>
  );
}

export default CarouselRightNavigation;