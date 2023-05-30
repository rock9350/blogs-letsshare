import Image from "next/image";
import style from "./letsShare.module.css"


const LetsShare = () => {
    return ( <>
     <div  className={style["home"]} >
          <div className={style["home-start"]} >
            <h1>Stay curious.</h1>
            <h3>
              Discover stories, thinking, and expertise from writers on any
              topic.
            </h3>
            <button>Start Reading</button>
          </div>
          <div className={style["home-img"]}>
            <Image src="/data/lets-favicon.png" width="520" height="180" alt="aa"></Image>
          </div>
        </div>
    </> );
}
 
export default LetsShare;