import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ProfileAll() {
  const { userId } = useParams(); // Get userId from the URL params
  const [userDetails, setUserDetails] = useState(null); // Store user info
  const [followerCount, setFollowerCount] = useState(0); // Store number of followers

  const idUser = parseInt(userId);

  // Fetch user details by userId
  const getUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/getuserbyid/${idUser}`);
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        setUserDetails(data.result[0]); // Assuming 'result' contains an array of user data
      } else {
        console.log("Không tìm thấy người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  // Fetch the follower count for the user
  const getFollowerCount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/follow/countfollowers/${idUser}`);
      const data = await response.json();
      setFollowerCount(data.length); // Assuming data is an array of follower IDs
    } catch (error) {
      console.error("Lỗi khi lấy số lượng followers:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getFollowerCount();
  }, [idUser]);

  if (!userDetails) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className={cx("profile")}>
      <div className={cx("accout")}>
        {/* Render User Info */}
        <img src={`http://localhost:5000/images/users/${userDetails.img}`} alt={userDetails.name} />
        <div className={cx("name")} style={{ marginRight: "15px" }}>
          <h3>{userDetails.name}</h3>
          <h4>{userDetails.bio}</h4>

        </div>
        <p>{followerCount} followers</p>
      </div>
    </div>
  );
}

export default ProfileAll;
