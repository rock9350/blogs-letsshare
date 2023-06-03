"use client";
import Image from "next/image";
import style from "./Blogs.module.css";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Blogs = () => {
  const textArea = useRef(null);

  const content = {
    title: "",
    abstract: "",
    byline: "By Demo Author",
    published_date: new Date(),

    multimedia: [
      {
        url: "",
      },
    ],
    Check: false,
  };

  

  const [Content, setContent] = useState(content);

  const resizeHeight = (e: any) => {
    let text: any = textArea.current;
    text.style.height = "61px";
    text.style.height = e.target.scrollHeight + 2 + "px";
  };

  const [imageData, setImageData] = useState(null);

  const onChangehandle = (event: any) => {
    let inputName = event.target.name;
    if (inputName == "urlToImage") {
      const file = event.target.files[0];
      if (file) {
        const imageUrl: any = URL.createObjectURL(file);
        setImageData(imageUrl);
        let Contents = { ...Content };
        Contents.multimedia[0].url = imageUrl;

        setContent({ ...Contents });
      }
    } else {
      let inputValue = event.target.value;
      let Contents = { ...Content };
      setContent({ ...Contents, [inputName]: inputValue });
    }
  };

  const onClickHandle = () => {
    Content.Check = true;
    console.log(Content);

    localStorage.setItem("key", JSON.stringify(Content));
  };

  return (
    <>
      <div className={style["box"]}>
        <div className={style["blogBox"]}>
          <div>
            <input
              className={style["input"]}
              type="text"
              name="title"
              onChange={onChangehandle}
              value={Content.title}
              placeholder="Title"
            />
          </div>
          <div>
            {!imageData && (
              <input
                type="file"
                className={style["custom-file-input"]}
                onChange={onChangehandle}
                value={Content.multimedia[0].url}
                name="urlToImage"
              />
            )}
            {imageData && (
              <Image
                src={imageData}
                style={{ width: "30%", height: "0%" }}
                width="10"
                height="10"
                alt="Selected"
              ></Image>
            )}
          </div>
          <div>
            <textarea
              className={style["textBox"]}
              ref={textArea}
              onInput={resizeHeight}
              onChange={onChangehandle}
              placeholder="Start Writing Blog"
              value={Content.abstract}
              name="abstract"
            />
          </div>
          <div>
            <Link
              href="/"
              onClick={onClickHandle}
              className={style["Publishbuttonn"]}
            >
              Publish
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
