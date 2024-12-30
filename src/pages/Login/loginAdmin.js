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

function LoginAdmin() {
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

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:5000/admin/login", data);
            if (response.data) {
                setIsLoggedIn(true);
                setUser(response.data);
                localStorage.setItem("loggedInAdmin", JSON.stringify(response.data));
                alert("Đăng nhập thành công");
                navigate('/admin/dashboard'); // Redirect to dashboard
            } else {
                alert("Đăng nhập thất bại");
            }
        } catch (error) {
            console.error("Đăng nhập thất bại:", error);
            alert("Đăng nhập thất bại");
        }
    };

    return (
        <div className={cx("login-container")}>
            <form className={cx("login-form")} onSubmit={handleLoginForm}>
                <h2 className={cx("login-title")}>Login admin</h2>
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
                <Button type="submit" primary>
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

export default LoginAdmin;
