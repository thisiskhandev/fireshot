import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClockCircleFilled, FileWordFilled } from "@ant-design/icons";
import moment from "moment";
import fileDownload from "js-file-download";

import axios from "src/config/axios.config";

import { Stripe } from "src/component/payments/Stripe";

import { isAuthenticated } from "src/utils/auth";
import { ContactInfo } from "src/component/contactInfo/ContactInfo";

import container from "./JobDetails.container";

import "../Job.css";

const JobDetails = (props) => {
  const {
    auth: { currentUser },
    match,
  } = props;

  const jobId = match.params.id;
  const [job, setJob] = useState({});
  const [user, setUser] = useState(null);

  const getUserById = async () => {
    await axios.get(`/api/users/get/${currentUser._id}`).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  const getJobById = async () => {
    await axios.get(`/api/jobs/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setJob(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };
  console.log(job);

  useEffect(() => {
    getJobById();
    getUserById();
    return () => {};
  }, []);

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

  return (
    <div>
      <div className="job-details container p-5">
        <h4 className="mb-5">{job.title}</h4>
        <div className="row border border-2 rounded">
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
                    <img
                      key={file}
                      src={file.url}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="d-block text-decoration-underline my-2"
                      onClick={() => {
                        handleDownload(file.url, file.name);
                      }}
                    />
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
          <div
            className="col-md-5 p-4 right-links rounded"
            style={{ background: "#F7F7F7" }}
          >
            {user && user.subscription ? (
              <>
                <ContactInfo user={currentUser} clientId={job.postedBy} />
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
      </div>
    </div>
  );
};

export default container(JobDetails);
