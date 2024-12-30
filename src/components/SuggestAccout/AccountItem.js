import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SuggestAccount.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function AccountItem({ children }) {
  const [allUsers, setAllUsers] = useState([]); // Danh sách tất cả người dùng
  const [followingUsers, setFollowingUsers] = useState([]); // Danh sách ID người dùng đang follow

  // Lấy danh sách tất cả người dùng
  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/getallusers");
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        setAllUsers(data.result);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  // Lấy danh sách ID người dùng đang follow
  const getFollowingUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/follow/followers/4"); // Thay '4' bằng ID user hiện tại nếu cần động
      const data = await response.json();
      if (Array.isArray(data)) {
        setFollowingUsers(data); // Lưu danh sách ID đang follow
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách following:", error);
    }
  };

  // Follow/Unfollow một người dùng
  const toggleFollow = async (idFollower) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const idUser = loggedInUser.idUser;

      console.log("idUser:", idUser);
      console.log("idFollower:", idFollower);

      const response = await fetch(
        `http://localhost:5000/follow/toggle?idUser=${idUser}&idFollower=${idFollower}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Followed successfully.") {
          setFollowingUsers([...followingUsers, idFollower]);
        } else if (data.message === "Unfollowed successfully.") {
          setFollowingUsers(followingUsers.filter((id) => id !== idFollower));
        }
      } else {
        console.error("Lỗi khi thực hiện toggle follow.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API toggle follow:", error);
    }
  };

  // Kiểm tra trạng thái follow
  const isFollowing = (idUser) => followingUsers.includes(idUser);

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
      await getFollowingUsers();
    };
    fetchData();
  }, []);

  return (
    <div>
      {allUsers.map((user) => (
        <div key={user.id} className={cx("wrapper")}>
          <Link style={{ textDecoration: "none" }} to={`/profileall/${user.idUser}`}>
            <div className={cx("account-item")}>
              <img
                className={cx("img")}
                src={`http://localhost:5000/images/users/${user.img}`}
                alt={user.name}
              />
              <div className={cx("item-info")}>
                <p className={cx("nickname")}>
                  <strong>{user.bio}</strong>
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faCircleCheck}
                  />
                </p>
                <p className={cx("name")}>{user.name}</p>
              </div>
            </div>
          </Link>
          <button
            className={cx("follow-btn", { followed: isFollowing(user.idUser) })}
            onClick={() => toggleFollow(user.idUser)} // Sửa đúng ID của user
          >
            {isFollowing(user.idUser) ? "Unfollow" : "Follow"}
          </button>
          {children}
        </div>
      ))}
    </div>
  );
}

export default AccountItem;
