import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, title }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.banner}>
          <Chip
            label={`${follows} Follows`}
            size="small"
            className={styles.chip}
          />
        </div>
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;