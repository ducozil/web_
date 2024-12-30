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
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "~/AuthContext";
import axios from "axios";

const cx = classNames.bind(styles);

function Videobyid() {
  const [video, setVideo] = useState([]);
  const { videoId } = useParams();
  const { isLoggedIn, users } = useAuth();
  const [comment, setComment] = useState([]);

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
      console.log("result: ", result)
      setVideo(result.data); // Use the first video object in the array
    } catch (error) {
      console.error("Lỗi khi lấy video:", error);
    }
  };

  useEffect(() => {
    getVideo();
    console.log("video: ", video)
    getCommentById();
  }, [video]);


  return (
    <div>
      <div key={video.idVideo} className={cx("wrapper")}>
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
            <Button rounded>Follow</Button>
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

export default Videobyid;
