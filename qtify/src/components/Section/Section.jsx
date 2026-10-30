import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, endpoint }) {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(endpoint);
        setAlbums(res.data);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      }
    };
    fetchAlbums();
  }, [endpoint]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          className={styles.toggle}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      <div className={styles.grid}>
        {(collapsed ? albums.slice(0, 7) : albums).map((album) => (
          <Card
            key={album.id}
            image={album.image}
            follows={album.follows}
            title={album.title}
          />
        ))}
      </div>
    </section>
  );
}

export default Section;