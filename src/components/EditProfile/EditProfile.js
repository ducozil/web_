import classNames from "classnames/bind";
import styles from "./EditProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "~/AuthContext"; // Import useAuth hook
const cx = classNames.bind(styles);
function EditProfile({ children }) {
  const navigate = useNavigate(); // Hook for navigation
  const { isLoggedIn, users,updateUser } = useAuth(); // Truy cập thông tin người dùng từ useAuth hook
  const isUserLoaded = isLoggedIn && users;
  console.log(users);
  const handleChangefile = (e) => {
    console.log(e);
  };
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    var username = document.querySelector('input[name="username"]').value;
    var bio = document.querySelector('input[name="bio"]').value;
    var name = document.querySelector('input[name="name"]').value;
    var avatar = document.querySelector('input[name="avatarImg"]');
    console.log(avatar.files[0]);
    if (!avatar|| !username || !bio || !name) {
      alert("Nhập đầy đủ thông tin");
    } else {
      const formData = new FormData();
      formData.append("idUser", users.idUser);
      formData.append("username", username);
      formData.append("bio", bio);
      formData.append("name", name);
      formData.append("avatarImg", avatar.files[0]);
      axios.post("http://localhost:5000/users/update-user", formData)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.data) {
            let item = {
              bio: bio,
              idUser:users.idUser,
              img:response.data,
              name:name,
              username: username,
            }
            localStorage.setItem("loggedInUser", JSON.stringify(item));

            alert("Thành công");
            // updateUser sẽ cập nhật thông tin người dùng và kích hoạt render lại
            updateUser(response.data, () => {
              alert("Cập nhật trạng thái thành công");
            });
            navigate('/profile');
          } else {
            alert("Cập nhật thất bại");
          }
        })
        .catch(function (error) {
          // handle error
          alert("Cập nhật thất bại");
        });
    }
  };
  

  return (
    <div className={cx("wrapper")}>
      {isUserLoaded ? (
        <>
          <div className={cx("edit-profile")}>
            <h4>Edit Profile</h4>
            <div className={cx("icon1")}>
              <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
            </div>
          </div>
          <div className={cx("edit-profile")}>
            <h4>Avatar</h4>
            <input 
              type="file"
              name="avatarImg"
              className={cx("input")}
              onChange={handleChangefile()}
              style={{paddingTop:"15px",paddingLeft:"25px"}}

            />            
            <div className={cx("img-icon")}>
              <FontAwesomeIcon
                className={cx("icon2")}
                icon={faPenToSquare}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className={cx("edit-profile")}>
            <h4>Username</h4>
            <input
              type="text"
              name="username"
              className={cx("input")}
              placeholder={users.username}
            ></input>
          </div>
          <div className={cx("edit-profile")}>
            <h4>Id</h4>
            <input
              type="text"
              name="bio"
              className={cx("input")}
              placeholder={users.bio}
            ></input>
          </div>
          <div className={cx("edit-profile")}>
            <h4>Name</h4>
            <input
              type="text"
              name="name"
              className={cx("input")}
              placeholder={users.name}
            ></input>
          </div>
          <div
            className={cx("edit-profile-button")}
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "10px",
            }}
          >
            {/* <Button rounded>Cancel</Button> */}
            <Button onClick={handleUpdateUser} rounded>
              Save
            </Button>
          </div>
        </>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}
export default EditProfile;
