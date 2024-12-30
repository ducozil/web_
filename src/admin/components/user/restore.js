import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';  // Import icon thùng rác

function ManageRestoreUser() {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/getallusersDeleted');
                const data = await response.json();
                setUsers(data.result);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const showRestoreModal = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleConfirmRestore = async () => {
        if (selectedUser) {
            try {
                const response = await fetch(`http://localhost:5000/users/restoreUser/${selectedUser.idUser}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                if (result.result) {
                    message.success('Khôi phục người dùng thành công');
                    // Cập nhật lại danh sách người dùng sau khi khôi phục
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.idUser !== selectedUser.idUser)
                    );
                } else {
                    message.error('Không thể khôi phục người dùng');
                }
            } catch (error) {
                console.error('Error restoring user:', error);
                message.error('Đã xảy ra lỗi khi khôi phục người dùng');
            } finally {
                setIsModalVisible(false);
                setSelectedUser(null);
            }
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idUser',
            key: 'idUser',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: (
                <Space>
                    Hành động
                </Space>
            ),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/admin/video/${record.idUser}`}>
                        <Button type="primary">Xem</Button>
                    </Link>
                    <Button style={{ color: "#fff", background: "red" }} type="danger" onClick={() => showRestoreModal(record)}>
                        Khôi phục
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={users} rowKey="idUser" />
            <Modal
                title="Xác nhận khôi phục"
                visible={isModalVisible}
                onOk={handleConfirmRestore}
                onCancel={handleCancel}
                okText="Khôi phục"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn khôi phục người dùng <strong>{selectedUser?.username}</strong> không?</p>
            </Modal>
        </>
    );
}

export default ManageRestoreUser;
