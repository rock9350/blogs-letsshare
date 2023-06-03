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
        "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw";
      const options = {
        method: "GET",
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": "a8eea09364msh764fd9747b71581p1fd23ajsn55ff9a275859",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
      const url2 = 'https://bing-news-search1.p.rapidapi.com/news/search?q=teasla%20apple&freshness=Day&textFormat=Raw&safeSearch=Off';
const options2 = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': 'a8eea09364msh764fd9747b71581p1fd23ajsn55ff9a275859',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
	}
};

      try {
        const res = await fetch(url, options);

        if (res.status === 200) {
          const data = await res.json();

          setNewsData(data);
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
      {newsData.value &&
        newsData.value
          .filter((item: any) => item?.image !== undefined)
          .map((item: any, index: any) => {
            const date = new Date(item.datePublished);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
          console.log(item["image"]["thumbnail"]["contentUrl"]);
          
            return (
              <Link
                href={`/blogs/${item.datePublished}`}
                key={index}
                className={style["dashboard-item"]}
              >
                <img
                  src={item["image"]["thumbnail"]["contentUrl"]}
                  className={style["blogImg"]}
                  alt={item.name}
                />
                <div className={style["blogDetails"]}>
                  <p className={style["blogTitle"]}>{item.name}</p>
                  <p className={style["blogdescription"]}>{item.description}</p>
                  <div className={style["blogDateBox"]}>
                    {item.provider.map((items: any, indexs: any) => {
                      return <p key={indexs}>By {items.name}</p>;
                    })}
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
