import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Input } from "antd";
import {
  ClockCircleFilled,
  EditOutlined,
  EyeFilled,
  EyeOutlined,
} from "@ant-design/icons";

import axios from "src/config/axios.config";

import { Error } from "src/component/messages/messages";
import { Stripe } from "src/component/payments/Stripe";

import { ContactInfo } from "src/component/contactInfo/ContactInfo";
import Pagination from "src/component/pagination/pagination";

import container from "./FindJobs.container";

import "../Job.css";

const { Search } = Input;

const FindJobs = (props) => {
  const {
    auth: { isAuthenticated, currentUser },
  } = props;

  const history = useHistory();

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllJobs = async () => {
    await axios.get("/api/jobs/get").then((res) => {
      if (res.status === 200) {
        setJobs(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };

  const getMatchingJobs = async () => {
    await axios
      .post("/api/jobs/get/matching-jobs", { skills: currentUser.skills })
      .then((res) => {
        if (res.status === 200) {
          setJobs(res.data);
        } else {
          Error(res.data.successMessage);
        }
      });
  };

  const getMostRecentJobs = async () => {
    await axios.get("/api/jobs/get/most-recent").then((res) => {
      if (res.status === 200) {
        setJobs(res.data);
      } else {
        Error(res.data.successMessage);
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
    getAllJobs();
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
    <div className="find-jobs container">
      <div className="row ">
        <div className="col-md-3">
          <div className="jobs-filters">
            <h4>Rasti paslaugų teikėją</h4>
            <div className="links">
              <p>
                <Link onClick={() => getAllJobs()}>Visi pasiūlymai</Link>
              </p>
              <p>
                <Link onClick={() => getMatchingJobs()}>
                  Arčiausiai esantys
                </Link>
              </p>
              <Link className="mt-2" onClick={() => getMostRecentJobs()}>
                Geriausiai įvertinti
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Search
            placeholder="Search for jobs"
            onSearch={onSearch}
            style={{ width: 200 }}
          />{" "}
          <br />
          <Link className="mt-2">Paieška</Link>
          <br />
          <div className="my-5">
            <h4>Mano kategorijos</h4>
            <Pagination
              mainCategories={categories}
              getSubCategories={() => ""}
            />
          </div>
          <div className="jobs-list">
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Geriausi pasiūlymai jums</h4>
                </div>
              </div>
              <hr className="my-2" />
              <p>
                Suveskite paieškos langelyje jus dominančią paslaugą ir mes
                pateiksime jums kriterijus atitinkančius specialistus.
              </p>
              <div className="job">
                {jobs.length > 0 ? (
                  jobs.map((job) => {
                    return (
                      <>
                        <hr
                          className="mt-4 mb-4 fw-bolder"
                          style={{ height: "2px" }}
                        />
                        <Link to={"/job/" + job._id}>
                          <h5>{job.title}</h5>
                          <p className="job-description">{job.detail}</p>
                          <a>daugiau</a>
                          <div className="job-btns">
                            {job.tags &&
                              job.tags.length > 0 &&
                              job.tags.map((tag) => {
                                return (
                                  <>
                                    <button className="btn rounded-pill px-4 mr-2">
                                      {tag}
                                    </button>
                                  </>
                                );
                              })}
                          </div>
                        </Link>
                        <hr />
                        <h4>prisegti failai</h4>
                        <div>
                          {job.files &&
                            job.files.map((file, index) => {
                              return (
                                <img
                                  key={file}
                                  src={file.url}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                  className="d-block text-decoration-underline my-2"
                                />
                              );
                            })}
                        </div>
                        <hr />
                        <div className="job-footer">
                          <div>
                            <h5>
                              <span>fiksuota kaina: </span>
                              <strong>€{job.budget}</strong>
                            </h5>
                          </div>
                          <div className="button-wrapper ">
                            {currentUser && job.postedBy == currentUser._id ? (
                              <button
                                className="btn submit-proposal px-4"
                                onClick={() =>
                                  history.push(`/user/job/${job._id}`)
                                }
                              >
                                peržiūrėti pasiūlymą
                              </button>
                            ) : currentUser && currentUser.subscription ? (
                              <>
                                <ContactInfo
                                  user={currentUser}
                                  clientId={job.postedBy}
                                />
                                <Link
                                  className="btn submit-proposal px-3"
                                  to={`/apply/${job._id}`}
                                >
                                  pateikti pasiūlymą
                                </Link>
                              </>
                            ) : (
                              <Stripe user={currentUser} jobId={job._id} />
                            )}
                          </div>
                        </div>
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
        {currentUser && (
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

export default container(FindJobs);
