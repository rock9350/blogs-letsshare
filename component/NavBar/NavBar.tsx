import Link from "next/link";
import style from "./NavBar.module.css"  
import Image from "next/image";

const NavBar = () => {
    return ( <>
       <div className={style["nav"]} >
        <a href="/" className={style["nav-logo"]}>
          <Image className="logo" width="45" height="40" alt="aa" src="/data/lets-high.png"></Image>
        </a>

        <ul className={style["nav-list"]} >
          <li>
          
          </li>
          <li>
            <Link href="/Write">Write</Link>
          </li>
          <li>
            <Link href="/SignIn">Sign In</Link>
          </li>
        </ul>
      </div>
    </> );
}
 
export default NavBar;