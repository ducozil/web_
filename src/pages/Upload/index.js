import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Upload.module.scss";
import Button from "~/components/Button";
import { useAuth } from "~/AuthContext";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import axios from "axios";

const cx = classNames.bind(styles);
function Upload() {
  const { users, updateUser, updateUserVideosLocalStorage } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const navigate = useNavigate(); // Hook for navigation

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const caption = document.querySelector('input[name="caption"]').value; //
      const music = document.querySelector('input[name="music"]').value;//
      const video = selectedFile;
      if (!caption || !music|| !video) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      console.log(selectedFile) ;

      const formData = new FormData();
      formData.append("idUser", loggedInUser.idUser);
      formData.append("username", loggedInUser.username);
      formData.append("caption", caption);
      formData.append("music", music);
      formData.append("videoUpload",video);

      axios.post("http://localhost:5000/video/uploadVideo", formData ) 
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.data) {
          alert("Tải video thành công");
          navigate("/profile");
        } else {
        alert("Tải video thất bại");
        }
      })
      .catch(function (error) {
        // handle error
        alert("Tải video thất bại");

      })
      // const videoName = video.name;
      // const videoPath = `/uploads/${videoName}`;

      // const updatedVideos = users.videos
      //   ? [...users.videos, { videoUrl: videoPath,caption: caption, music: music  }]
      //   : [{ videoUrl: videoPath, caption: caption, music: music }];

      // updateUser({ ...users, videos: updatedVideos }, () => {
      //   setSelectedFile(null);
      //   updateUserVideosLocalStorage(updatedVideos); // Cập nhật danh sách video trong localStorage
      //   alert("Tải video thành công");
      //   navigate("/profile");
      // });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("upload")}>
          <FontAwesomeIcon
            style={{ fontSize: "30px", marginTop: "20px" }}
            icon={faCloudArrowUp}
          ></FontAwesomeIcon>
          <h2>Select video to upload</h2>
          {/* ... (các thông tin khác) */}
          <div className={cx("upload-file")}>
            <input
              type="file"
              name="file-upload"
              accept=".mp4,.avi,.webm,.mov"
              onChange={handleFileChange}
            />
          </div>
          <div className={cx("upload-file-content")}>
          <label htmlFor="caption" className={cx("label")}>
           <h3>Caption</h3>
          </label>
          <input type="text" name="caption" className={cx("input")} />
        </div>
        <div className={cx("upload-file-content")}>
          <label htmlFor="caption" className={cx("label")}>
           <h3>Music</h3>
          </label>
          <input type="text" name="music" className={cx("input")} />
        </div>
          <div className={cx("button")}>
            <Button small primary onClick={handleUpload}>
              Upload
            </Button>
            <Button small primary to={config.routes.record} >
              Quay video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
