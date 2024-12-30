import React, { useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faBookBookmark,
  faComment,
  faHeart,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "~/AuthContext";
import axios from "axios";

const cx = classNames.bind(styles);

function VideobyidAdmin() {
  const [video, setVideo] = useState([]);
  const { videoId } = useParams();
  const { isLoggedIn, users } = useAuth();
  const [comment, setComment] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]); // Danh sách người dùng đang follow

  const handleUploadComment = async (event) => {
    event.preventDefault();
    const commentText = document.querySelector('input[name="comment"]').value;
    if (!commentText) {
      alert("Vui lòng nhập comment");
    } else {
      const data = {
        comment: commentText,
        idUser: users.idUser,
        idVideo: videoId,
        username: users.username,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/comment/add-new",
          data
        );
        if (response.data) {
          alert("Thành công");
          getCommentById();
        } else {
          alert("Bình luận thất bại");
        }
      } catch (error) {
        alert("Bình luận thất bại");
        console.error(error);
      }
    }
  };

  const handleDeleteComment = async (idComment) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
      try {
        await axios.delete(`http://localhost:5000/comment/deleteComment/${idComment}`);
        alert("Xóa bình luận thành công");
        getCommentById();
      } catch (error) {
        alert("Xóa bình luận thất bại");
        console.error(error);
      }
    }
  };

  const getCommentById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/comment/get-By-idVideo/${videoId}`
      );
      const data = await response.json();
      setComment(data);
    } catch (error) {
      console.error("Lỗi khi lấy comment", error);
    }
  };

  const getVideo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/video/videoByIdOwner/${videoId}`);
      const result = await response.json();
      setVideo(result.data); // Use the first video object in the array
    } catch (error) {
      console.error("Lỗi khi lấy video:", error);
    }
  };

  // Hàm follow/unfollow
  const toggleFollow = async (idFollower) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const idUser = loggedInUser.idUser;

      const response = await fetch(
        `http://localhost:5000/follow/toggle?idUser=${idUser}&idFollower=${idFollower}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Followed successfully.") {
          // Thêm user vào danh sách following
          setFollowingUsers((prev) => [...prev, idFollower]);
        } else if (data.message === "Unfollowed successfully.") {
          // Xóa user khỏi danh sách following
          setFollowingUsers((prev) => prev.filter((id) => id !== idFollower));
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

  // Lấy danh sách người dùng đang follow
  const getFollowingUsers = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const response = await fetch(
        `http://localhost:5000/follow/get-following?idUser=${loggedInUser.idUser}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setFollowingUsers(data.map((follow) => follow.idFollower));
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách following:", error);
    }
  };

  useEffect(() => {
    getVideo();
    getCommentById();
    getFollowingUsers();
  }, []);

  return (
    <div style={{ marginLeft: "-300px" }}>
      <div key={video.idVideo} className={cx("wrapper")}>
        <div>
          <div className={cx("video-info")}>
            <img
              src={`http://localhost:5000/images/users/${video.user?.img || "default-avatar.png"}`}
              alt={users?.name || "User"}
            />
            <div className={cx("user")}>
              <div className={cx("user-info")}>
                <h3>{video.user?.username || "Unknown User"}</h3>
                <h4>{video.user?.bio || "No bio available"}</h4>
              </div>
              <h>{video.caption}</h>
              <div>
                <FontAwesomeIcon className={cx("icon")} icon={faMusic} />
                <h>{video.music}</h>
              </div>
            </div>
            <div className={cx("button")}>
              <Button
                rounded
                onClick={() => toggleFollow(video.user?.idUser)}
              >
                {isFollowing(video.user?.idUser) ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </div>
          <div className={cx("video-contents")} style={{ marginBottom: "50px" }}>
            <video controls className={cx("video")}>
              <source
                src={`http://localhost:5000/images/videos/${video.url}`}
                type="video/mp4"
              />
            </video>
            <div className={cx("icon-like")}>
              <FontAwesomeIcon className={cx("icon-new")} icon={faHeart} />
              <strong>{video.count}</strong>
              <FontAwesomeIcon className={cx("icon-new")} icon={faComment} />
              <strong>1495</strong>
              <FontAwesomeIcon className={cx("icon-new")} icon={faBookBookmark} />
              <strong>149k</strong>
              <FontAwesomeIcon className={cx("icon-new")} icon={faShare} />
              <strong>2015</strong>
            </div>
          </div>
        </div>
      </div>
      {/* Comment Section */}
      <div style={{ marginTop: "220px" }}>
        <div className={cx("comment")}>
          {comment.map((commentItem) => (
            <div key={commentItem.id} className={cx("profilecmt1")}>
              <img
                src={`http://localhost:5000/images/users/${commentItem.user?.img || "default-avatar.png"}`}
                alt={commentItem.user?.name || "User"}
              />
              <div className={cx("name")}>
                <span>{commentItem.username || "Unknown User"}</span>
                <label>{commentItem.comment}</label>
              </div>
              <FontAwesomeIcon
                className={cx("icon-delete")}
                icon={faTrash}
                onClick={() => handleDeleteComment(commentItem.idComment)}
              />
            </div>
          ))}
        </div>
        {isLoggedIn && users ? (
          <div className={cx("comment")} style={{ marginBottom: "30px", marginTop: "20px" }}>
            <div className={cx("profilecmt")}>
              <img
                src={`http://localhost:5000/images/users/${users.img}`}
                alt={users.name}
              />
              <input
                type="text"
                name="comment"
                className={cx("input")}
                placeholder="Comment here"
              />
              <Button onClick={handleUploadComment} rounded>
                Đăng
              </Button>
            </div>
          </div>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    </div>
  );
}

export default VideobyidAdmin;
