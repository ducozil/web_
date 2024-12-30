import React, { useState, useEffect } from "react";
import styles from "./Video.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import VideoContents from "./VideoContents"; // Đảm bảo đường dẫn đúng

const cx = classNames.bind(styles);

function VideoInfo() {
  const [videos, setVideos] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Fetch videos
  const getVideo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/video/get-allvideo`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Lỗi khi lấy video:', error);
    }
  };

  // Fetch the following users for the current logged-in user
  const getFollowingUsers = async () => {
    if (loggedInUser) {
      try {
        const response = await fetch(`http://localhost:5000/follow/followers/${loggedInUser.idUser}`);
        const data = await response.json();
        setFollowingUsers(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách following:', error);
      }
    }
  };

  // Toggle follow/unfollow
  const toggleFollow = async (userId) => {
    if (loggedInUser) {
      try {
        const response = await fetch(`http://localhost:5000/follow/toggle?idUser=${loggedInUser.idUser}&idFollower=${userId}`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.message === "Followed successfully.") {
            setFollowingUsers([...followingUsers, userId]);
          } else if (data.message === "Unfollowed successfully.") {
            setFollowingUsers(followingUsers.filter((id) => id !== userId));
          }
        } else {
          console.error("Lỗi khi thực hiện toggle follow.");
        }
      } catch (error) {
        console.error('Lỗi khi gọi API toggle follow:', error);
      }
    }
  };

  // Check if the current user is following a specific user
  const isFollowing = (userId) => followingUsers.includes(userId);

  useEffect(() => {
    getVideo();
    getFollowingUsers();
  }, [loggedInUser?.idUser, videos.length]);

  return (
    <div>
      {videos.length > 0 ? videos.map((video) => (
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
            <div className={cx("button")}>
              {loggedInUser && (
                <Button
                  rounded
                  onClick={() => toggleFollow(video.user.idUser)}
                >
                  {isFollowing(video.user.idUser) ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
          <VideoContents
            video={video.url}
            idVideo={video.idVideo}
            userId={loggedInUser?.idUser}
          />
        </div>
      )) : <></>}
    </div>
  );
}

export default VideoInfo;
