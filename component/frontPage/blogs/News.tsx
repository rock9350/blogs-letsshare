"use client";
import React, { useEffect, useState } from "react";
import style from "./News.module.css";
import Link from "next/link";

const NewsPage = () => {
  const [newsData, setNewsData] = useState<any>(null);
  const [contentData, setContentData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=O6x2TMss3T0BpLaxa9ImDbUWutmFJh87";

      try {
        const res = await fetch(url);
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setNewsData(data.results);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error: " + error);
        setError(true);
      }
    };

    const storedContent = localStorage.getItem("key");
    if (storedContent) {
      setContentData(JSON.parse(storedContent));
      localStorage.removeItem("key");
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>The server responded with a status of 426</p>
      </div>
    );
  }

  if (!newsData) {
    return <div>Loading...</div>;
  }

  if (contentData) {
    if (!newsData.value) {
      newsData.value = [];
    }
    newsData.value.unshift(contentData);
  }

  return (
    <div className={style["dashboard"]}>
      {newsData &&
        newsData
          .filter((item: any) => item?.multimedia?.length > 0)
          .map((item: any, index: any) => {
            const date = new Date(item.published_date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <Link
                href={`/blogs/${item.published_date}`}
                key={index}
                className={style["dashboard-item"]}
              >
                <img
                  src={item.multimedia[0].url}
                  className={style["blogImg"]}
                  alt={item.title}
                />
                <div className={style["blogDetails"]}>
                  <p className={style["blogTitle"]}>{item.title}</p>
                  <p className={style["blogdescription"]}>{item.abstract}</p>
                  <div className={style["blogDateBox"]}>
                    <p>By {item.byline}</p>
                    <p>
                      {formattedDate} {formattedTime}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default NewsPage;
