import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Col, Row, Spin, message } from "antd";
import { Form, Input, Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import axios from "../../config/axios.config";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleEditUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const showEditDrawer = () => {
    setEditVisible(true);
  };

  const onEditClose = () => {
    setEditVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p
        className="site-description-item-profile-p-label"
        style={{ marginBottom: "0px", fontWeight: "bolder", marginTop: "19px" }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

  useEffect(() => {
    getUsers();
    setToken(localStorage.getItem("token"));

    return () => {};
  }, [success]);

  const getUsers = async () => {
    setLoading(true);
    await axios.get(`/api/users/get`).then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
        setLoading(false);
      } else {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: "20vh",
          },
        });
      }
    });
  };

  const getUserById = async (userId) => {
    setLoading(true);
    await axios.get(`/api/users/get/${userId}`).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        setUserId(res.data._id);
        setLoading(false);
      } else {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: "20vh",
          },
        });
      }
    });
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    await axios
      .delete(`/api/users/delete/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: "20vh",
            },
          });
          getUsers();
        } else {
        }
      });
  };

  /*****************************************Submit Handler ***************************************************/
  const handleSubmit = async () => {
    setLoading(true);
    let data = new FormData();
    data.append("name", user.name);
    data.append("email", user.email);
    data.append("phone", user.phone);
    data.append("role", user.role);
    await axios
      .post(`/api/users/admin/update/${userId}`, data, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: "20vh",
            },
          });
          getUsers();
        } else if (res.status === 201) {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: "20vh",
            },
          });
        } else {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: "20vh",
            },
          });
        }
      });
  };

  const submitPasswordHandler = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmNewPassword) {
    } else {
      await axios
        .post(
          `/api/users/admin/change/password/${userId}`,
          {
            newPassword: password.newPassword,
            confirmNewPassword: password.confirmNewPassword,
          },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            message.success({
              content: res.data.successMessage,
              style: {
                marginTop: "20vh",
              },
            });
          } else {
            message.error({
              content: res.data.errorMessage,
              style: {
                marginTop: "20vh",
              },
            });
          }
        });
    }
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );

  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <th className="pt-4" scope="row">
                  {index + 1}
                </th>
                <td className="pt-4">
                  {user.firstName} {user.name}
                </td>
                <td className="pt-4">{user.email}</td>
                <td className="pt-4">
                  <span className="border p-2">{user.role}</span>
                </td>
                <td className="pt-4">
                  <a
                    onClick={() => {
                      getUserById(user._id);
                      showDrawer();
                    }}
                  >
                    <EyeOutlined />
                  </a>
                  <a
                    className="ml-3"
                    onClick={() => {
                      getUserById(user._id);
                      showEditDrawer();
                      setSuccess(true);
                    }}
                  >
                    <EditOutlined />
                  </a>
                  <a
                    className="ml-3"
                    onClick={() => {
                      deleteHandler(user._id);
                      setSuccess(true);
                    }}
                  >
                    <DeleteOutlined />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/******************************************* Drawer for User Information *******************************/}

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginTop: "80px", fontWeight: "bold" }}
        >
          User Profile
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={<span>{user.name}</span>}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="E-mail" content={user.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Role" content={user.role} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone" content={user.phone} />
          </Col>
        </Row>
      </Drawer>

      {/******************************************* Drawer for Editing User Information *******************************/}
      {loading ? (
        <div className="text-center fixed-top" style={{ marginTop: "50vh" }}>
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onEditClose}
          visible={editVisible}
        >
          <Form className="editUserForm mt-5">
            <h2 className="text-center mb-3">Edit User Details</h2>
            <Row>
              <Col span={12} style={{ paddingLeft: "23px" }}>
                <h6>Name:</h6>
                <Input
                  style={{ marginBottom: "32px" }}
                  name="name"
                  onChange={handleEditUserChange}
                  value={user.name}
                />
              </Col>
              <Col span={12} style={{ paddingLeft: "23px" }}>
                <h6>Email:</h6>
                <Input
                  style={{ marginBottom: "32px" }}
                  name="email"
                  onChange={handleEditUserChange}
                  value={user.email}
                />
              </Col>
              <Col span={12} style={{ paddingLeft: "23px" }}>
                <h6>Role:</h6>
                <Input
                  style={{ marginBottom: "32px" }}
                  name="role"
                  onChange={handleEditUserChange}
                  value={user.role}
                />
              </Col>
              <Col span={12} style={{ paddingLeft: "23px" }}>
                <h6>Phone:</h6>
                <Input
                  style={{ marginBottom: "32px" }}
                  name="phone"
                  onChange={handleEditUserChange}
                  value={user.phone}
                />
              </Col>
              <Col
                className="text-center"
                span={24}
                style={{ paddingLeft: "23px", marginTop: "32px" }}
              >
                <Button onClick={handleSubmit} type="primary">
                  Submit
                </Button>
                <div className="px-5 mt-4">
                  <Link
                    onClick={showModal}
                    className="btn submit-btn bg-white border-secondary text-dark font-weight-bolder"
                  >
                    Change Passsword
                  </Link>
                </div>
                <Modal
                  width={460}
                  footer={false}
                  title="Change Password"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                >
                  <div className="address edit-profile password-modal mx-4">
                    <form onSubmit={submitPasswordHandler}>
                      <div className="floating-label-group">
                        <label className="floating-label">New Password*</label>
                        <Input.Password
                          onChange={handlePasswordChange}
                          name="newPassword"
                          className="form-control"
                        />
                      </div>
                      <div className="floating-label-group mt-2">
                        <label className="floating-label">
                          Confirm New Password*
                        </label>
                        <Input.Password
                          onChange={handlePasswordChange}
                          name="confirmNewPassword"
                          className="form-control"
                          autocomplete="off"
                          autofocus
                          required
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          className="btn submit-btn btn-outline-dark w-50"
                          type="submit"
                        >
                          Change
                        </button>
                      </div>
                      {/* <div className = 'mt-4'>
                                <Link onClick = {() => setIsModalVisible(false)} className = 'btn submit-btn bg-white border-secondary text-dark font-weight-bolder'>Cancel</Link> 
                                </div>   */}
                    </form>
                  </div>
                </Modal>
              </Col>
            </Row>
          </Form>
        </Drawer>
      )}
    </div>
  );
};
