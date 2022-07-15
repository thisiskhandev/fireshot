import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ClockCircleFilled,
  DeleteOutlined,
  EyeFilled,
} from "@ant-design/icons";
import moment from "moment";

import axios from "../../config/axios.config";

import { UpdateJobForm } from "../../component/forms/UpdateJobPost";
import { Success } from "../../component/messages/messages";

export const UserJobDetails = (props) => {
  const history = useHistory();
  const jobId = props.jobId;
  const [job, setJob] = useState({});
  const getJobById = async () => {
    await axios.get(`/api/jobs/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setJob(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`/api/jobs/delete/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Success(res.data.successMessage);
          history.push("/user/jobs");
        } else {
          Error(res.data.successMessage);
        }
      });
  };

  useEffect(() => {
    getJobById();
    return () => {};
  }, []);

  return (
    <div>
      <div className="job-details container ">
        <div className="row border border-2 rounded">
          <div className="col-md-7 p-4">
            <h4 className="mb-3">darbo aprašymas</h4>
            <h6>{job.title}</h6>
            <p className="para mt-1">
              Posted{" "}
              {moment(
                job.timeOfPost,
                "dddd, MMMM Do YYYY, h:mm:ss a"
              ).fromNow()}{" "}
            </p>
            <hr />
            <h4>Detalės</h4>
            <p className="para">{job.detail}</p>
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
                <span className="fs-5">Projekto tipas:</span> &nbsp;
                <span className="para">Vienkartinis projektas</span>
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
              <h4 className="mb-2">Darbo aktyvumas</h4>
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
          <div
            className="col-md-5 p-4 right-links rounded"
            style={{ background: "#F7F7F7" }}
          >
            <>
              <div className="d-flex gap-2">
                <div>
                  <p>
                    <EyeFilled />
                  </p>
                </div>
                <Link to="/find-job">Peržiūrėti skelbimą</Link>
              </div>
              <div className="d-flex gap-2">
                <UpdateJobForm jobId={job._id} />
              </div>
              <div className="d-flex gap-2">
                <div>
                  <p>
                    <DeleteOutlined />
                  </p>
                </div>
                <Link onClick={() => deleteHandler(job._id)}>
                  Ištrinti skelbimą
                </Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
