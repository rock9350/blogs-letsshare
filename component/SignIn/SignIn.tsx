import Link from "next/link";
import style from "./SignIn.module.css";

const Login = () => {
  return (
    <>
      <div>
        <form className={style["signup-box"]}>
          <table className={style["formTable"]}>
            <tbody>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Email Id</label>
                </td>
                <td>
                  <input
                    className={style["formInput"]}
                    type="text"
                    placeholder="Email Id"
                  />
                </td>
              </tr>
              <tr>
                <td className={style["formLabel"]}>
                  <label>Password</label>
                </td>
                <td>
                  <input
                    className={style["formInput"]}
                    type="text"
                    placeholder="Password"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <Link href="/" className={style["formbuttonn"]}>
            SignUp
          </Link>
          <div>
            <p className={style["NoAcount"]}>
              No account?
              <span>
                {" "}
                <Link href="/SignUp" className={style["Createone"]}>Create one</Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
