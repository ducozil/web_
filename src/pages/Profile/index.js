import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import images from "~/assets/Image";
import Button from "~/components/Button";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React,{ useState, useRef } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import EditProfile from "~/components/EditProfile/EditProfile";
import { useAuth } from "~/AuthContext"; // Import useAuth hook
import axios from "axios";

const cx = classNames.bind(styles);

function Profile() {

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [videos, setVideos] = useState([]);

  const { isLoggedIn, users, updateUser } = useAuth(); // Truy cập thông tin người dùng từ useAuth hook
  const isUserLoaded = isLoggedIn && users;
  const [title, setTitle] = useState(""); // Thêm trạng thái cho title
  // const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  // const handleVideo = () => {
  //   if (playing) {
  //     videoRef.current.pause();
  //     setPlaying(false);
  //   } else {
  //     videoRef.current.play();
  //     setPlaying(true);
  //   }
  // };
  const getVideosByUserId = async () => {
    try {
      const response = await fetch(`http://localhost:5000/video/videobyIdUser/${users.idUser}`);
      const data = await response.json();
      console.log(data) ; 
      if (data.result && data.result.length > 0) {
        // Cập nhật trạng thái hoặc thực hiện bất kỳ thao tác hiển thị nào bạn muốn với danh sách video
        setVideos(data.result);
      } else {
        // Xử lý khi không có video được tìm thấy
        console.log("Không tìm thấy video.");
      }
    } catch (error) {
      // Xử lý lỗi khi lấy dữ liệu video
      console.error('Lỗi khi lấy video:', error);
    }
  };

  React.useEffect(() => {
    // Gọi hàm getVideosByUserId khi component được mount (có thể điều chỉnh theo nhu cầu của bạn)
    getVideosByUserId();
  }, [users.idUser]); // Thêm users.id vào dependencies để gọi lại useEffect khi idUser thay đổi
  const handleCreateTitle = () => {
    // Gọi hàm tạo mới người dùng với title được thêm vào
    const updatedUserData = {
      ...users,
      title: title,
    };

    updateUser(updatedUserData, () => {
      alert("Cập nhật tiểu sử thành công");
    });
  };
console.log(users) ; 

  return (
    <div className={cx("profile")}>
      <div className={cx("accout")}>
        {isUserLoaded ? (
          <>
            <img src={`http://localhost:5000/images/users/${users.img}`} />
          </>
        ) : (
          <h3>Loading...</h3>
        )}
        <div className={cx("name")}>
          {isUserLoaded ? (
            <>
              <h3>{users.name}</h3>
              <h4>{users.bio}</h4>
            </>
          ) : (
            <h3>Loading...</h3>
          )}
          <Tippy
            visible={isTooltipVisible}
            interactive
            render={(attrs) => (
              <div className={cx("edit")} tabIndex="-1" {...attrs}>
                <PopperWrapper edit>
                  <EditProfile />
                </PopperWrapper>
              </div>
            )}
          >
            <div>
              <Button
                onClick={() => setTooltipVisible(!isTooltipVisible)}
                rounded
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit profile
              </Button>
            </div>
          </Tippy>
        </div>
      </div>
      <div className={cx("title-profile")}>
        <div className={cx("interact")}>
          <div className={cx("following")}>
            <strong>113</strong>
            <span> Following</span>
          </div>
          <div className={cx("following")}>
            <strong>1144</strong>
            <span> Follower</span>
          </div>
          <div className={cx("following")}>
            <strong>14K</strong>
            <span> Like</span>
          </div>
        </div>
        <div className={cx("title")}>
          {isUserLoaded ? (
            <>
              <div className={cx("title-type")}>
                <h3>{users.title}</h3>
              </div>
              <div className={cx("form-group")}>
                <input
                  type="text"
                  name="title"
                  className={cx("input")}
                  placeholder="  Nhập tiểu sử"
                  value={title} // Gán giá trị từ trạng thái title
                  onChange={(e) => setTitle(e.target.value)} // Cập nhật trạng thái title khi giá trị thay đổi
                />
              </div>
              {/* <div className={cx("form-group")}>
          <label className={cx("label")}>Profile Image</label>
          <input type="file" name="file-upload" className={cx("input")} />
        </div> */}

              <Button id="create" onClick={handleCreateTitle} rounded>
                cập nhật{" "}
              </Button>
            </>
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
      <div className={cx("layout-video")}>
        <div className={cx("feed-tab")}>
          <Button textbutton>Videos</Button>
          <Button textbutton>Like</Button>
          <Button textbutton>Favorite</Button>
        </div>
        <div className={cx("all-video")}>
          {isUserLoaded ? 
          videos.map((video) => (
            <>
          <div className={cx("video")}>
                      <video
                        // onClick={() => handleVideo(video)}
                        controls
                        className={cx("videos")}
                      >
                        <source src={`http://localhost:5000/images/videos/${video.url}`} type="video/mp4" />
                      </video>
                  </div>
            </>
          )) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
