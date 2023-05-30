import Link from "next/link";
import style from "./SignUp.module.css";

const SignUp = () => {
  return (
    <>
      <div>
        <form className={style["signup-box"]}>
          <table className={style["formTable"]}>
            <tbody>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Name</label>
                </td>
                <td>
                  <input className={style["formInput"]} type="text" placeholder="Name"/>
                </td>
              </tr>
              <tr>
                <td className={style["formLabel"]}>
                  <label>UserName</label>
                </td>
                <td>
                  <input className={style["formInput"]} type="text" placeholder="UserName"/>
                </td>
              </tr>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Phone No</label>
                </td>
                <td>
                  <input className={style["formInput"]} type="number" placeholder="Phone No"/>
                </td>
              </tr>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Email Id</label>
                </td>
                <td>
                  <input className={style["formInput"]} type="text" placeholder="Email Id"/>
                </td>
              </tr>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Password</label>
                </td>
                <td>
                  <input className={style["formInput"]} type="text" placeholder="Password"/>
                </td>
              </tr>
            </tbody>
          </table>

          <Link href="/" className={style["formbuttonn"]}>
            SignUp
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
