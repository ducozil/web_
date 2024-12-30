import React from "react";
import classNames from "classnames/bind";
import styles from "~/pages/Login/Login.module.scss";
import Button from "~/components/Button";
import { useAuth } from "~/AuthContext"; // Import useAuth 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Signin() {
  const navigate = useNavigate(); // Hook for navigation
  const [avatarImg, setAvatarImg] = React.useState();

  const handleChangefile = (e) => {
    console.log(e) ; 
  }

  const handleCreateForm =async (event) => {
    event.preventDefault();
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var bio = document.querySelector('input[name="bio"]').value;
    var name = document.querySelector('input[name="name"]').value;
    var  avatar = document.querySelector('input[name="avatarImg"]');
    console.log(avatar.files[0])
    if (!avatar || !username || !password || !bio || !name) {
      alert("Nhập đầy đủ thông tin");
    }else{
      const formData = new FormData();
      formData.append("username", username) ; 
      formData.append("password", password) ; 
      formData.append("bio", bio) ; 
      formData.append("name", name) ; 
      formData.append("avatarImg", avatar.files[0]) ; 
        axios.post("http://localhost:5000/users/register", formData ) 
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.data) {
            alert("thành công");
            // setUser(response.data); 
            navigate('/'); 
  
          } else {
          alert("Đăng kí thất bại");
          }
        })
        .catch(function (error) {
          // handle error
          alert("Đăng kí thất bại");
  
        })
  

    }

  };
  return (
    <div className={cx("login-container")}>
      <form className={cx("signin-form")}>
        <h2 className={cx("login-title")}>Signin</h2>
        <div className={cx("form-group")}>
          <label className={cx("label")}>Username</label>
          <input type="text" name="username" className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("label")}>Password</label>
          <input type="password" name="password" className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("label")}>Id</label>
          <input type="text" name="bio" className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("label")}>Name</label>
          <input type="text" name="name" className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("label")}>Ảnh đại diện</label>
          <input type="file" name="avatarImg" className={cx("input")}  onChange={handleChangefile()}/>
        </div>

        <Button id="create" onClick={handleCreateForm} primary>
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Signin;
