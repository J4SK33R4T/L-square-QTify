import React from "react";
import styles from "./Button.module.css";

function Button({ children, onClick, type = "button" }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      style={{ cursor: "pointer" }}
    >
      {children}
    </button>
  );
}

export default Button;