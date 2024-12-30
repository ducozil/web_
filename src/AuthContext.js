import React, { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUser] = useState(); // Thêm state để lưu dữ liệu người dùng
  const [allUsers, setAllUsers] = useState([]); // State để lưu tất cả người dùng

  //cập nahatj danh sách video
  const updateUserVideosLocalStorage = (videos) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const updatedUser = {
        ...loggedInUser,
        videos: videos,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    }
  };
  
  const getAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/getallusers`);
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        
        // Cập nhật trạng thái hoặc thực hiện bất kỳ thao tác hiển thị nào bạn muốn với danh sách video
        setAllUsers(data.result);
      } else {
        // Xử lý khi không có video được tìm thấy
        console.log("Không tìm thấy video.");
      }
    } catch (error) {
      // Xử lý lỗi khi lấy dữ liệu video
      console.error('Lỗi khi lấy video:', error);
    }
  };
  const updateUser = (data, callback) => {
    // Gọi API cập nhật thông tin người dùng
    fetch(`http://localhost:5000/users/${users.idUser}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser); // Cập nhật thông tin người dùng trong state
        callback(); // Gọi callback nếu cần
      });
  };


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
    getAllUsers();
  }, []);

  const logout = () => {
    // Xử lý logic đăng xuất
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,updateUser,users,setUser,logout,getAllUsers,allUsers,updateUserVideosLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
