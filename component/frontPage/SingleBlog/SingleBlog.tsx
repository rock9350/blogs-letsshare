"use client";
import React, { useEffect, useState } from "react";
import style from "./SingleBlog.module.css";

const SingleBlog = ({ blogName }: { blogName: any }) => {
  const [newsData, setNewsData] = useState<any>(null);
  console.log(blogName);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw";
      const options = {
        method: "GET",
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "a8eea09364msh764fd9747b71581p1fd23ajsn55ff9a275859",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
      try {
        const res = await fetch(url, options);
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
        {newsData["value"]
          .filter((item: any) => {
            const name = `${item.datePublished}`;
            return name == blogName;
          })
          .map((items: any, index: any) => {
            const date = new Date(items.datePublished);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div key={index}>
                <div className={style["SingleblogTitle"]}>
                  <p>{items.name}</p>
                </div>
                <div>
                  <img
                    src={items["image"]["thumbnail"]["contentUrl"]}
                    className={style["SingleblogImg"]}
                  ></img>
                </div>
                <div className={style["SingleblogDesc"]}>
                  <p>{items.description}</p>
                </div>

                <div className={style["SingleblogDateBox"]}>
                  {items.provider.map((items: any, indexs: any) => {
                    return <p key={indexs}>By {items.name}</p>;
                  })}

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
