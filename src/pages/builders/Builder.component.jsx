import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Input, message } from "antd";
import {
  ClockCircleFilled,
  EditOutlined,
  EyeFilled,
  EyeOutlined,
} from "@ant-design/icons";

import axios from "src/config/axios.config";

import { Error } from "src/component/messages/messages";

import container from "./Builder.container";

const { Search } = Input;

const Builder = (props) => {
  const history = useHistory();

  const {
    auth: { currentUser, isAuthenticated },
  } = props;

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    await axios.get(`/api/users/list-builders`).then((res) => {
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

  const getCategories = async () => {
    await axios.get(`/api/categories/jobs/get/sub-categories`).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
        console.log(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getUsers();
    getCategories();
    return () => {};
  }, []);

  const filterJobsByCategory = async (id) => {
    await axios.get(`/api/jobs/filter-by-category/${id}`).then((res) => {
      if (res.status === 200) {
        setJobs(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  const onSearch = async (value) => {
    await axios.post("/api/jobs/search", { query: value }).then((res) => {
      if (res.status === 200) {
        setJobs(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  return (
    <div className="container find-jobs  ">
      <div className="row">
        <div className="col-md-3">
          <div className="jobs-filters">
            <h4>Rasti statybininką ar remontininką</h4>
          </div>
        </div>
        <div className="col-md-6">
          <Search
            placeholder="Search for builders"
            onSearch={onSearch}
            style={{ width: 200 }}
          />{" "}
          <br />
          <Link className="mt-2">Paieška</Link>
          <div className="jobs-list">
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Sąrašo kūrimo priemonė</h4>
                </div>
              </div>
              <hr className="my-2" />

              <div className="job">
                {users.length > 0 ? (
                  users.map((user) => {
                    return (
                      <>
                        <div className="row mt-5">
                          <div className="col-md-1">
                            <img
                              src={user?.userPicture?.url}
                              className="rounded-circle"
                              width="82"
                              height="82"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-11">
                            <div className="row">
                              <div className="col-md-8 align-self-center">
                                <div className="">
                                  <p className="fw-bolder">{user?.name}</p>
                                  <p>{user?.title}</p>
                                  <div className="d-flex flex-nowrap gap-4 mt-5">
                                    <div className="rate">
                                      <span className="fw-bold">
                                        €{user?.rate}
                                      </span>{" "}
                                      <span className="text-muted">
                                        {" "}
                                        / val{" "}
                                      </span>
                                    </div>
                                    <div className="rate">
                                      <span className="fw-bold">€0 </span>{" "}
                                      <span className="text-muted">
                                        {" "}
                                        earned{" "}
                                      </span>
                                    </div>
                                    <div className="rate">
                                      0% Job Success Rate
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4 my-4 my-md-0">
                                <button
                                  className="btn rounded-pill w-100 border border-3 fw-bolder"
                                  style={{ color: "#EF771E" }}
                                >
                                  Message
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </>
                    );
                  })
                ) : (
                  <>
                    <hr
                      className="mt-4 mb-4 fw-bolder"
                      style={{ height: "2px" }}
                    />
                    <div className="d-flex justify-content-center align-items-center fw-bolder text-warning">
                      Specialistų nerasta
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {isAuthenticated && (
          <div className="col-md-3 profile-info mt-5">
            <div className="img-profile">
              <img
                src={
                  currentUser.userPicture
                    ? currentUser.userPicture
                    : "/assets/images/default.svg"
                }
                alt="pic-user"
                className="rounded-circle"
                style={{ width: "auto" }}
                width="62"
                height="62"
              />
              <span>
                <Link to={"/profile/" + currentUser._id}>Mano profilis</Link>
              </span>
            </div>
            <div className="view-profile">
              <Link>
                <EyeOutlined style={{ color: "#FB6D3A" }} />{" "}
                <span>
                  <Link to={"/profile/" + currentUser._id}>
                    Peržiūrėti profilį{" "}
                  </Link>
                </span>
              </Link>
            </div>
            <div className="visiblity mt-4 mb-4">
              <div className="d-flex gap-4">
                <h5 className="fw-bolder">Matomumas</h5>
                <div>
                  <Link to={"/profile/edit/" + currentUser._id}>
                    <EditOutlined shape="circle" />
                  </Link>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <EyeFilled />
                </div>
                <p className="fw-bolder">{currentUser.visiblity}</p>
              </div>
            </div>
            <div className="availability">
              <div className="d-flex gap-4">
                <h5 className="fw-bolder">Statusas</h5>
                <div>
                  <Link to={"/profile/edit/" + currentUser._id}>
                    <EditOutlined shape="circle" />
                  </Link>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <p>
                    <ClockCircleFilled />
                  </p>
                </div>
                <p className="fw-bolder">{currentUser.availability}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default container(Builder);
