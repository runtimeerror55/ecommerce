import styles from "./loginPage.module.css";
import { useNavigate, useFetcher } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authContext } from "../../context/authentication";
import { toastOptions } from "../../utilities/utilities";
export const LoginPage = () => {
      const { login } = useContext(authContext);

      const navigate = useNavigate();

      const loginFetcher = useFetcher();

      const logingFetcherStatus =
            loginFetcher.state === "idle" && loginFetcher.data;

      useEffect(() => {
            if (logingFetcherStatus) {
                  const data = loginFetcher.data;
                  console.log(data);
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                        login(data);
                        navigate("/products");
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [loginFetcher]);

      return (
            <div className={styles["page"]}>
                  <ToastContainer />

                  <main className={styles["main"]}>
                        <loginFetcher.Form
                              action="/login?type=login+user"
                              method="POST"
                              className={styles["login-form"]}
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
                              <button
                                    type="submit"
                                    className={styles["login-button"]}
                              >
                                    login
                              </button>
                        </loginFetcher.Form>
                  </main>
            </div>
      );
};