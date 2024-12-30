import React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss"; // Import your SCSS module
import Button from "~/components/Button";
import config from "~/config";
import { useAuth } from "~/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);
function Login() {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const handleLoginForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    let data = {
      username: username,
      password: password
    }
    try {
      axios.post("http://localhost:5000/users/login", data)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.data) {
            setIsLoggedIn(true);
            alert("thành công");
            setUser(response.data);
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            navigate('/');
          } else {
            alert("Đăng nhập thất bại");

          }
        })
        .catch(function (error) {
          // handle error
          alert("Đăng nhập thất bại");

          console.log(error);
        })
      // const usersResponse = await fetch(userAPI);
      // const users = await usersResponse.json();
      // const matchedUser = users.find(
      //   (user) => user.username === username && user.password === password
      // );


    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      alert("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <div className={cx("login-container")}>
      <form className={cx("login-form")}>
        <h2 className={cx("login-title")}>Login</h2>
        <div className={cx("form-group")}>
          <label htmlFor="username" className={cx("label")}>
            Username
          </label>
          <input type="text" name="username" className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="password" className={cx("label")}>
            Password
          </label>
          <input type="password" name="password" className={cx("input")} />
        </div>
        <Button onClick={handleLoginForm} primary>
          Login
        </Button>
        <div className={cx("tosignin")}>
          <Link className={cx("custom-signin")} to={config.routes.signin}>
            Click here to sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
