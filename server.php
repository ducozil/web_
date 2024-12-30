<!-- <?php
// server.php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["bio"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $bio = $_POST["bio"];

    $imgPath = null;
    if (isset($_FILES["image"])) {
        $targetDir = "uploads/";
        
        // Tạo thư mục nếu chưa tồn tại
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $targetFile = $targetDir . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile);
        $imgPath = $targetFile;
    }

    // Tạo mảng dữ liệu người dùng
    $userData = array(
        "username" => $username,
        "password" => $password,
        "bio" => $bio,
        "imgPath" => $imgPath
    );

    // Đọc dữ liệu từ tập tin db.json hiện có
    $jsonData = file_get_contents("db.json");
    $data = json_decode($jsonData, true);

    // Thêm thông tin người dùng mới vào mảng
    $data["users"][] = $userData;

    // Lưu lại mảng dữ liệu vào tập tin db.json
    file_put_contents("db.json", json_encode($data));

    echo json_encode(array("message" => "User created successfully"));
}
?> -->
