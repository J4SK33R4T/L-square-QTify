import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
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

  const renderCard = (album) => (
    <Card image={album.image} follows={album.follows} title={album.title} />
  );

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

      {collapsed ? (
        <Carousel data={albums} renderComponent={renderCard} />
      ) : (
        <div className={styles.grid}>
          {albums.map((album) => (
            <div key={album.id}>{renderCard(album)}</div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;