"use client";
import React, { useEffect, useState } from "react";
import style from "./SingleBlog.module.css";

const SingleBlog = ({ blogName }: { blogName: any }) => {
  const [newsData, setNewsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd30fa6193ce4be9b555e865013a2ff2"
        );
        const data = await res.json();
        setNewsData(data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchData();
  }, []);

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style["SingleblogBox"]}>
        {newsData["articles"]
          .filter((item: any) => {
            const name = `${item["source"]["name"]} ${item.author} ${item.publishedAt}`;
            return name == blogName;
          })
          .map((items: any, index: any) => {
            const titleParts = items.title.split("-");
            const slicedTitle = titleParts[0].trim();

            const date = new Date(items.publishedAt);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div key={index}>
                <div className={style["SingleblogTitle"]}>
                  <p>{slicedTitle}</p>
                </div>
                <div>
                  <img
                    src={items.urlToImage}
                    className={style["SingleblogImg"]}
                  ></img>
                </div>
                <div className={style["SingleblogDesc"]}>
                  <p>{items.description}</p>
                </div>

                <div className={style["SingleblogDateBox"]}>
                  <p>By {items.author}</p>
                  <p>
                    {formattedDate} {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SingleBlog;
