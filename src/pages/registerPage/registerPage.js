import styles from "./registerPage.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { authContext } from "../../context/authentication";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import NavBar from "../../components/navBar/NavBar";
export const RegisterPage = () => {
      const { login } = useContext(authContext);
      const navigate = useNavigate();

      const callBack = (data) => {
            console.log(data);
            login(data);
            navigate("/products");
      };
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>

                  <main className={styles["main"]}>
                        <ButtonWithActionAndLoader
                              buttonText="Register"
                              buttonClass={styles["register-button"]}
                              loaderHeight="25"
                              loaderWidth="100"
                              action="/register?type=register+user"
                              method="POST"
                              formClass={styles["register-form"]}
                              callBack={callBack}
                        >
                              <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                        </ButtonWithActionAndLoader>
                  </main>
            </div>
      );
};
