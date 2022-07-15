import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import axios from "src/config/axios.config";

import { Error } from "src/component/messages/messages";

export const AllProposals = (props) => {
  const jobId = props.jobId;
  const [proposals, setProposals] = useState([]);
  const getProposalsById = async () => {
    await axios.get(`/api/jobs/proposals/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setProposals(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };
  console.log(proposals);

  useEffect(() => {
    getProposalsById();
    return () => {};
  }, []);

  return (
    <div className="all-proposals mt-4">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <Search placeholder="Search for Clients here" />
        </div>
        <div className="col-md-2 mb-4 mb-md-0">
          <button className="btn border border-2">Filtrai</button>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <div className="mr-2">Skirstyti:</div>
            <select className="form-select" aria-label="Default select example">
              <option selected>Geriausias pasiūlymas</option>
              <option value="1">vienas</option>
              <option value="2">du</option>
              <option value="3">trys</option>
            </select>
          </div>
        </div>
        <div className="proposals-list">
          <div className="row mt-5">
            {proposals.length > 0 &&
              proposals.map((proposal) => {
                return (
                  <>
                    <div className="row mt-5">
                      <div className="col-md-1">
                        <img
                          src={proposal?.postedBy?.userPicture?.url}
                          className="rounded-circle"
                          width="82"
                          height="82"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-11">
                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <div className="">
                              <p className="fw-bolder">
                                {proposal?.postedBy && proposal?.postedBy?.name}
                              </p>
                              <p>
                                {proposal?.postedBy &&
                                  proposal?.postedBy?.title}
                              </p>
                              <div className="d-flex flex-nowrap gap-4 mt-5">
                                <div className="rate">
                                  <span className="fw-bold">
                                    €{proposal?.postedBy?.rate}
                                  </span>{" "}
                                  <span className="text-muted"> / val </span>
                                </div>
                                <div className="rate">
                                  <span className="fw-bold">€0 </span>{" "}
                                  <span className="text-muted"> uždirbat </span>
                                </div>
                                <div className="rate">0% sėkmingai atlikta</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 row">
                            <div className="col-md-6 my-4 my-md-0">
                              <button
                                className="btn rounded-pill w-100 border border-3 fw-bolder"
                                style={{ color: "#EF771E" }}
                              >
                                pranešimas
                              </button>
                            </div>
                            <div className="col-md-6">
                              <Link
                                className="btn rounded-pill text-white w-100"
                                style={{ background: "#EF771E" }}
                              >
                                Samdyti
                              </Link>
                            </div>
                          </div>
                          <hr className="mt-3" />
                          <div>
                            <p className="fw-bold">pasiūlymą: </p>
                            <p className="para">{proposal?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
