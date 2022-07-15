import React, { useEffect, useState } from "react";
import { Drawer, Spin, message } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import { UpdateJobForm } from "../../component/forms/UpdateJobPost";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import fileDownload from "js-file-download";

import axios from "../../config/axios.config";
import moment from "moment";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState();
  const [editVisible, setEditVisible] = useState(false);
  const [job, setJob] = useState({});

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
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res && res.data, filename);
        document.location.reload();
      });
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
    getJobs();
    setToken(localStorage.getItem("token"));
  }, []);

  const getJobs = async () => {
    setLoading(true);
    await axios.get(`/api/jobs/get`).then((res) => {
      if (res.status === 200) {
        setJobs(res.data);
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

  const getJobById = async (jobId) => {
    setLoading(true);
    await axios.get(`/api/jobs/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setJob(res.data);
        setJobId(res.data._id);
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
      .delete(`/api/jobs/delete/${id}`, {
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
          getJobs();
        } else {
        }
      });
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
            <th scope="col">Title</th>
            <th scope="col">Creator Id</th>
            <th scope="col">Budget</th>
            <th scope="col">Created at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => {
            return (
              <tr key={job._id}>
                <th className="pt-4" scope="row">
                  {index + 1}
                </th>
                <td className="pt-4">{job.title}</td>
                <td className="pt-4">{job.postedBy}</td>
                <td className="pt-4">
                  <span className="p-2">{job.budget}</span>
                </td>
                <td className="pt-4">
                  {" "}
                  {moment(job.createdAt).format("MM/DD/YYYY")}
                </td>

                <td className="pt-4">
                  <a
                    onClick={() => {
                      getJobById(job._id);
                      showDrawer();
                    }}
                  >
                    <EyeOutlined />
                  </a>
                  <UpdateJobForm jobId={job._id} />
                  <a
                    className="ml-3"
                    onClick={() => {
                      deleteHandler(job._id);
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

      {/******************************************* Drawer for job Information *******************************/}

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="job-details container p-5">
          <div className="row border border-2 rounded">
            <h4 className="my-5  ">{job.title}</h4>

            <div className="col-md-7 p-4">
              <h4 className="mb-3">darbo aprašymas</h4>
              <h6>{job.title}</h6>
              <p className="para mt-1">
                paskelbta{" "}
                {moment(
                  job.timeOfPost,
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                ).fromNow()}{" "}
              </p>
              <hr />
              <h4>Detalės</h4>
              <p className="para">{job.detail}</p>
              <hr />
              <h4>prisegti failai</h4>
              <div>
                {job.files &&
                  job.files.map((file, index) => {
                    return (
                      <a
                        key={file}
                        className="d-block text-decoration-underline my-2"
                        onClick={() => {
                          handleDownload(file.url, file.name);
                        }}
                      >
                        {file.name}
                      </a>
                    );
                  })}
              </div>
              <hr />
              <div className="availability">
                <div className="d-flex gap-5">
                  <div>
                    <h5 className="fw-bolder">Prieinamumas</h5>
                    <div className="d-flex gap-2">
                      <div>
                        <p>
                          <ClockCircleFilled />
                        </p>
                      </div>
                      <p className="para">Daugiau negu 30 val/savaite</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bolder">kaina</h5>
                    <div>
                      <p>€{job.budget}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <p>
                  <span className="fs-5">projekto tipas:</span> &nbsp;
                  <span className="para">vienkartinis projektas</span>
                </p>
              </div>
              <hr />

              <div>
                <h4>įgūdžiai</h4>
                <div className="job-details-btns mt-4 d-flex flex-wrap">
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
              </div>
              <hr />
              <div>
                <h4 className="mb-2">darbo aktyvumas</h4>
                <p>
                  <span className="fs-5">pasiūlymai:</span> &nbsp;
                  <span className="para">15 iki 20</span>{" "}
                </p>
                <p>
                  <span className="fs-5">paskutinį kartą žiūrėtas:</span> &nbsp;
                  <span className="para">20 prieš minutes</span>{" "}
                </p>
                <p>
                  <span className="fs-5">kalbamasi:</span> &nbsp;
                  <span className="para">1</span>{" "}
                </p>
                <p>
                  <span className="fs-5">išsiųsta pakvietimų:</span> &nbsp;
                  <span className="para">0</span>{" "}
                </p>
                <p>
                  <span className="fs-5">nepriimti kvietimai:</span> &nbsp;
                  <span className="para">0</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* {loading ? (
        <div className="text-center fixed-top" style={{ marginTop: "50vh" }}>
          <Spin indicator={antIcon} />
        </div>
      ) : (
      )} */}
    </div>
  );
};
