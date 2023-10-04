import { useContext } from "react";
import styles from "./profilePage.module.css";
import { authContext } from "../../context/authentication";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";

export const ProfilePage = () => {
      const loaderData = useAsyncValue();
      const { logout } = useContext(authContext);

      const navigate = useNavigate();
      const logoutButtonClickHandler = () => {
            logout();
            navigate("/");
      };

      if (loaderData.status === "error") {
            console.log("hello");
            return "";
      }
      return (
            <>
                  <div className={styles["option-data"]}>
                        <div className={styles["user-details"]}>
                              <div className={styles["user-detail"]}>
                                    <span className={styles["label"]}>
                                          Email:
                                    </span>
                                    <span>{loaderData.payload.email}</span>
                              </div>
                              <div className={styles["user-detail"]}>
                                    <span className={styles["label"]}>
                                          name:
                                    </span>
                                    <span>{loaderData.payload.name}</span>
                              </div>
                        </div>
                        <button
                              className={styles["logout-button"]}
                              onClick={logoutButtonClickHandler}
                        >
                              Logout
                        </button>
                  </div>
            </>
      );
};
