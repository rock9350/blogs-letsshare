"use client";
import React, { useEffect, useState } from "react";
import style from "./SingleBlog.module.css";

const SingleBlog = ({ blogName }: { blogName: any }) => {
  const [newsData, setNewsData] = useState<any>(null);
  console.log(blogName);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=O6x2TMss3T0BpLaxa9ImDbUWutmFJh87";
     
      try {
        const res = await fetch(url);
        const data = await res.json();
        setNewsData(data.results);
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
        {newsData
          .filter((item: any) => {
            const name = `${item.published_date}`;
            return name === blogName;
          })
          .map((item: any, index: any) => {
            const date = new Date(item.published_date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div key={index}>
                <div className={style["SingleblogTitle"]}>
                  <p>{item.title}</p>
                </div>
                <div>
                  <img
                    src={item.multimedia[0].url}
                    className={style["SingleblogImg"]}
                    alt={item.title}
                  />
                </div>
                <div className={style["SingleblogDesc"]}>
                  <p>{item.abstract}</p>
                </div>

                <div className={style["SingleblogDateBox"]}>
                  <p>By {item.byline}</p>
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
