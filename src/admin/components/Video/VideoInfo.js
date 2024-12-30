import React, { useState, useEffect } from "react";
import styles from "./Video.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import VideoContents from "./VideoContents"; // Ensure correct path
import { useParams } from "react-router-dom";
import { useAuth } from "~/AuthContext"; // Assuming AuthContext exists
import { Modal, Spin, message } from "antd"; // Import Ant Design Modal, Spin, and message

const cx = classNames.bind(styles);

function VideoInfo() {
  const { userId } = useParams();
  const [videos, setVideos] = useState([]);
  const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [videoToDelete, setVideoToDelete] = useState(null); // Store video to delete
  const [isDeleting, setIsDeleting] = useState(false); // State for deletion loading

  const getVideos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/video/videobyIdUser/${userId}`);
      const data = await response.json();

      // Handle potential errors in the API response
      if (!data || !data.result) {
        console.error("Error fetching videos: Invalid response format");
        return; // Exit the function if data is invalid
      }

      setVideos(data.result);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleDeleteVideo = async (idVideo) => {
    setVideoToDelete(idVideo);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true); // Set loading state

    try {
      const response = await fetch(`http://localhost:5000/video/deleteVideo/${videoToDelete}`, {
        method: "DELETE", // Use DELETE method for deletion
      });

      const data = await response.json();

      if (data.status == 200) {
        setVideos(videos.filter((video) => video.idVideo !== videoToDelete)); // Update videos state
        setIsModalVisible(false); // Close modal after confirmation
        message.success("Xóa video thành công!"); // Show success message
      } else {
        console.error("Error deleting video:", data.message);
        message.error("Xóa video thất bại!"); // Show error message
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      message.error("Xóa video thất bại!"); // Show error message
    } finally {
      setIsDeleting(false); // Clear loading state
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false); // Close modal on cancel
  };

  useEffect(() => {
    getVideos();
  }, [userId]); // Update videos when userId changes

  return (
    <div>
      {videos.length > 0 ? (
        videos.map((video) => (
          <>
            <div key={video.idVideo} className={cx("wrapper")}>
              <div className={cx("video-info")}>
                <img src={`http://localhost:5000/images/users/${video.user.img}`} alt="" />
                <div className={cx("user")}>
                  <div className={cx("user-infor")}>
                    <h3>{video.user.name}</h3>
                    <h4>{video.user.bio}</h4>
                  </div>
                  <h>{video.caption}</h>
                  <div>
                    <FontAwesomeIcon className={cx("icon")} icon={faMusic} />
                    <h>{video.music}</h>
                  </div>
                </div>
                <div className={cx("button-xoa")}>
                  <Button rounded onClick={() => handleDeleteVideo(video.idVideo)}>
                    <FontAwesomeIcon icon={faTrash} /> Xóa
                  </Button>
                </div>
              </div>
              <VideoContents video={video.url} idVideo={video.idVideo} userId={loggedInAdmin?.idUser} />
            </div>
          </>
        ))
      ) : (
        <p>No videos found for this user.</p>
      )}
      <Modal
        title="Xác nhận xóa video"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" loading={isDeleting} onClick={handleConfirmDelete}>
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa video này không?</p>
      </Modal>
    </div>
  );
}

export default VideoInfo