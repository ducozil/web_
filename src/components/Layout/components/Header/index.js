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
const Search = () => {
  const [query, setQuery] = useState(""); // Từ khóa tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // Kết quả gợi ý
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [clearVisible, setClearVisible] = useState(false); // Hiển thị nút xóa

  // Hàm gọi API tìm kiếm gợi ý từ nguồn API bạn cung cấp
  const fetchSuggestions = async (query) => {
      if (!query) {
          setSuggestions([]);
          return;
      }
      setLoading(true);
      try {
          // Thay API endpoint ở đây với API thực tế của bạn
          const response = await fetch(`YOUR_API_URL_HERE?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setSuggestions(data); // Lưu kết quả gợi ý vào state
      } catch (error) {
          console.error("Error fetching suggestions:", error);
      } finally {
          setLoading(false);
      }
  };

  // Gọi API khi từ khóa thay đổi
  useEffect(() => {
      fetchSuggestions(query);
  }, [query]);

  // Xử lý sự kiện thay đổi từ khóa
  const handleChange = (e) => {
      const value = e.target.value;
      setQuery(value);
      setClearVisible(value.length > 0); // Hiển thị nút xóa khi có từ khóa
  };

  // Xử lý sự kiện xóa ô tìm kiếm
  const handleClear = () => {
      setQuery("");
      setSuggestions([]);
  };
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
            <ul id="suggestions-list"></ul>
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
