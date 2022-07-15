import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import {
  ClockCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
} from "@ant-design/icons";
import moment from "moment";

import axios from "../../config/axios.config";

import { Stripe } from "../../component/payments/Stripe";

export const PostedJobs = (props) => {
  const jobId = props.match.params.id;
  const [jobs, setJobs] = useState([]);
  const getJobs = async () => {
    await axios
      .get("/api/jobs/get/jobs-by-user", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setJobs(res.data);
        } else {
          Error(res.data.successMessage);
        }
      });
  };

  useEffect(() => {
    getJobs();
    return () => {};
  }, []);

  return (
    <div>
      <div className="posted-jobs container  p-5">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h4>Jūsų paskelbti darbai</h4>
            </div>
          </div>
          <div className="job">
            {jobs.length > 0 ? (
              jobs.map((job) => {
                return (
                  <>
                    <hr
                      className="mt-4 mb-4 fw-bolder"
                      style={{ height: "2px" }}
                    />
                    <Link to={"/user/job/" + job._id}>
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
                    <div className="job-footer d-flex justify-content-between">
                      <div>
                        <h5>
                          <span>fiksuota kaina: </span>
                          <strong>€{job.budget}</strong>
                        </h5>
                      </div>
                      <div>
                        <button
                          className="btn submit-proposal w-100"
                          onClick={() =>
                            props.history.push(`/user/job/${job._id}`)
                          }
                        >
                          peržiūrėti pasiūlymą
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div style={{ height: "73vh" }}>
                <h1 className="text-warning text-center my-4">Nėra skelbimų</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
