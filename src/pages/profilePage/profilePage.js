import { useContext } from "react";
import styles from "./profilePage.module.css";
import { authContext } from "../../context/authentication";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
      const email = "aakashdeep954@gamil.com";
      const name = "aakash";
      const { logout } = useContext(authContext);
      const navigate = useNavigate();
      const logoutButtonClickHandler = () => {
            logout();
            navigate("/");
      };

      return (
            <>
                  <div className={styles["option-data"]}>
                        <div className={styles["user-details"]}>
                              <div className={styles["user-detail"]}>
                                    <span className={styles["label"]}>
                                          Email:
                                    </span>
                                    <span>{email}</span>
                              </div>
                              <div className={styles["user-detail"]}>
                                    <span className={styles["label"]}>
                                          name:
                                    </span>
                                    <span>{name}</span>
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
