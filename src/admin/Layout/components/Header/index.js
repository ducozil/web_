import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/Image";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AccountItem } from "~/components/SuggestAccout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faMessage,
  faPaperPlane,
  faUser,
  faRightFromBracket,
  faStar,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Button from "~/components/Button";
import config from "~/config";
import { useAuth } from "~/AuthContext";
const cx = classNames.bind(styles);
function Header() {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const { isLoggedIn, logout, users } = useAuth();
  const handleLogoutForm = () => {
    logout();
  };
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to="/">
            <img
              style={{ width: 120, height: 90 }}
              src={images.logo}
              alt="viralmix"
            />
          </Link>
        </div>
        <Tippy
          interactive
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <PopperWrapper header>
                <AccountItem></AccountItem>
                <AccountItem></AccountItem>
                <AccountItem></AccountItem>
                <AccountItem></AccountItem>
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input placeholder="Search user and video"></input>
            <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <button className={cx("loading")}>
              <FontAwesomeIcon icon={faSpinner} />
            </button>
            <button className={cx("btn-search")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>

        <div className={cx("accout")}>
          {isLoggedIn ? (
            <div>
              <Tippy
                visible={isTooltipVisible}
                interactive
                render={(attrs) => (
                  <div className={cx("edit")} tabIndex="-1" {...attrs}>
                    <div className={cx("menu-profile")}>
                      <ul>
                        <li to={config.routes.upload}>
                          <button className={cx("message")}>
                            <Link
                              style={{ color: "rgb(254, 44, 85)" }}
                              to={config.routes.profile}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </Link>
                          </button>
                          <span>View Profile</span>
                        </li>
                        <li>
                          <button
                            onClick={handleLogoutForm}
                            className={cx("message")}
                          >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                          </button>
                          <span>Log out</span>
                        </li>
                        <li>
                          <button className={cx("message")}>
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                          <span>Favorites</span>
                        </li>
                        <li>
                          <button className={cx("message")}>
                            <FontAwesomeIcon icon={faGear} />
                          </button>
                          <span>Setting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              >
                <div className={cx("accoutlogin ")}>
                  <Button textbutton to="/upload">
                    Upload
                  </Button>
                  <button className={cx("message")}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                  <button className={cx("message")}>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                  <img
                    onClick={() => setTooltipVisible(!isTooltipVisible)}
                    className={cx("img")}
                    src={`http://localhost:5000/images/users/${users.img}`}
                  />
                </div>
              </Tippy>
            </div>
          ) : (
            <div>
              <Button textbutton to="/upload">
                Upload
              </Button>
              <Button primary to="/login">
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
