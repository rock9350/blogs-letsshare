"use client";
import React, { useEffect, useState } from "react";
import style from "./News.module.css";
import Link from "next/link";

const NewsPage = () => {
  const [newsData, setNewsData] = useState<any>(null);
  const [contentData, setContentData] = useState(null);

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

    const storedContent = localStorage.getItem("key");
    if (storedContent) {
      setContentData(JSON.parse(storedContent));
      localStorage.removeItem("key");
    }

    fetchData();
  }, []);

  if (!newsData) {
    return <div>Loading...</div>;
  }

  const filteredArticles = newsData?.articles?.filter((item: any) => {
    return (
      item.urlToImage != null &&
      item.description != null &&
      item.author != null &&
      item.author.trim() !== "" &&
      item.publishedAt != null
    );
  });

  if (contentData) {
    if (!filteredArticles) {
      setNewsData({ ...newsData, articles: [] });
    }
    setNewsData((prevData) => ({
      ...prevData,
      articles: [contentData, ...prevData.articles],
    }));
  }

  return (
    <div className={style["dashboard"]}>
      {filteredArticles?.map((item: any, index: any) => {
        const titleParts = item.title.split("-");
        const slicedTitle = titleParts[0].trim();

        const date = new Date(item.publishedAt);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return (
          <Link
            href={`/blogs/${item["source"]["name"]} ${item.author} ${item.publishedAt}`}
            key={index}
            className={style["dashboard-item"]}
          >
            <img src={item.urlToImage} className={style["blogImg"]} alt={item.title} />
            <div className={style["blogDetails"]}>
              <p className={style["blogTitle"]}>{slicedTitle}</p>
              <p className={style["blogdescription"]}>{item.description}</p>
              <div className={style["blogDateBox"]}>
                <p>By {item.author}</p>
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








// "use client";
// import React, { useEffect, useState } from "react";
// import style from "./News.module.css";
// import Link from "next/link";

// const NewsPage = () => {
//   const [newsData, setNewsData] = useState<any>(null);
//   const [contentData, setContentData] = useState(null);
//   const [Array , setArray] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("get");
//       try {
//         const res = await fetch(
//           "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd30fa6193ce4be9b555e865013a2ff2"
//         );
//         const data = await res.json();
//         setNewsData(data);
//       } catch (error) {
//         console.log("Error :" + error);
//       }
//     };

//     const storedContent = localStorage.getItem("key");
//     if (storedContent) {
//       setContentData(JSON.parse(storedContent));
//       localStorage.removeItem("key");
//     }

//     fetchData();
//   }, []);

//   if (!newsData) {
//     return <div>Loading...</div>;
//   }

//   // if (contentData) {
//   //   if (!newsData.articles) {
//   //     newsData.articles = [];
//   //   }
//   //   newsData.articles.unshift(contentData);
//   // }
  

//   return (
//     <>
//       <div className={style["dashboard"]}>
//         {!newsData || !newsData.articles?newsData["articles"]
//           .filter((items: any) => {
//             return (
//               items.urlToImage != null &&
//               items.description != null &&
//               items.author != null &&
//               items.author != " " &&
//               items.publishedAt != null
//             );
//           })
//           .map((item: any, index: any) => {
//             const titleParts = item.title.split("-");
//             const slicedTitle = titleParts[0].trim();

//             const date = new Date(item.publishedAt);
//             const formattedDate = date.toLocaleDateString();
//             const formattedTime = date.toLocaleTimeString();

//             return (
//               <Link
//                 href={`/blogs/${item["source"]["name"]} ${item.author} ${item.publishedAt}`}
//                 key={index}
//                 className={style["dashboard-item"]}
//               >
//                 {/* <Image src={item.urlToImage} alt={item.name} width="100" height="100" ></Image> */}
//                 <img src={item.urlToImage} className={style["blogImg"]}></img>
//                 <div className={style["blogDetails"]}>
//                   <p className={style["blogTitle"]}>{slicedTitle}</p>
//                   <p className={style["blogdescription"]}>{item.description}</p>
//                   <div className={style["blogDateBox"]}>
//                     <p>By {item.author}</p>
//                     <p>
//                       {formattedDate} {formattedTime}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             );
//           }) :<></>}
//       </div>
//     </>
//   );
// };

// export default NewsPage;
