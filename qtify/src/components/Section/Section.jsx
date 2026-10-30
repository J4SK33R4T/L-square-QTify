import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

const GENRES_URL = "https://qtify-backend.labs.crio.do/genres";

function Section({ title, endpoint, type = "album" }) {
  const isSongs = type === "song";

  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [collapsed, setCollapsed] = useState(false);

  // Fetch albums or songs
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(endpoint);
        setItems(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchItems();
  }, [endpoint]);

  // Fetch genres only for the Songs section
  useEffect(() => {
    if (!isSongs) return;
    const fetchGenres = async () => {
      try {
        const res = await axios.get(GENRES_URL);
        setGenres(res.data.data); // response looks like { data: [...] }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, [isSongs]);

  const filteredItems =
    isSongs && selectedGenre !== "all"
      ? items.filter((song) => song.genre.key === selectedGenre)
      : items;

  const renderCard = (item) =>
    isSongs ? (
      <Card image={item.image} count={item.likes} label="Likes" title={item.title} />
    ) : (
      <Card image={item.image} count={item.follows} label="Follows" title={item.title} />
    );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {!isSongs && (
          <button
            className={styles.toggle}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Show All" : "Collapse"}
          </button>
        )}
      </div>

      {isSongs && (
        <Tabs
          value={selectedGenre}
          onChange={(e, newValue) => setSelectedGenre(newValue)}
          className={styles.tabs}
          TabIndicatorProps={{ style: { backgroundColor: "var(--color-primary)" } }}
        >
          <Tab label="All" value="all" className={styles.tab} />
          {genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
              className={styles.tab}
            />
          ))}
        </Tabs>
      )}

      {isSongs || collapsed ? (
        <Carousel
          key={selectedGenre}
          data={filteredItems}
          renderComponent={renderCard}
        />
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id}>{renderCard(item)}</div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;