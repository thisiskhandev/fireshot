import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import axios from "../../config/axios.config";

import { UserJobDetails } from "./UserJobDetails";
import { ProposalMenu } from "./proposals/ProposalMenu";

import "./User.css";

const { TabPane } = Tabs;

export const NavMenu = (props) => {
  const jobId = props.match.params.id;
  const [job, setJob] = useState({});
  const [proposals, setProposals] = useState([]);
  const getJobById = async () => {
    await axios.get(`/api/jobs/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setJob(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };

  const getProposalsById = async () => {
    await axios.get(`/api/jobs/proposals/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setProposals(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };

  useEffect(() => {
    getJobById();
    getProposalsById();
    return () => {};
  }, []);

  return (
    <div className="user-menu container">
      <h4 className="my-5">{job.title}</h4>
      <Tabs tabPosition="top">
        <TabPane
          tab={
            <div className="card border-0">
              <div className="card-img">
                <svg
                  width="285"
                  height="59"
                  viewBox="0 0 285 59"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M271.785 58.5H0.793483L14.5643 29.7158L14.6676 29.5L14.5643 29.2842L0.793483 0.5H271.785L284.454 29.5L271.785 58.5Z"
                    fill="currentColor"
                    stroke="#D8D8D8"
                  />
                </svg>
              </div>
              <div class="card-img-overlay text-center">
                <p className="svg-text">Peržiūrėti darbo detales</p>
              </div>
            </div>
          }
          key="1"
        >
          <UserJobDetails jobId={jobId} />
        </TabPane>
        <TabPane
          tab={
            <div className="card border-0">
              <div className="card-img">
                <svg
                  width="285"
                  height="59"
                  viewBox="0 0 285 59"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M271.785 58.5H0.793483L14.5643 29.7158L14.6676 29.5L14.5643 29.2842L0.793483 0.5H271.785L284.454 29.5L271.785 58.5Z"
                    fill="currentColor"
                    stroke="#D8D8D8"
                  />
                </svg>
              </div>
              <div class="card-img-overlay text-center">
                <p className="svg-text">
                  Įvertinti pasiūlymus ({proposals.length})
                </p>
              </div>
            </div>
          }
          key="2"
        >
          <ProposalMenu jobId={jobId} />
        </TabPane>
        <TabPane
          tab={
            <div className="card border-0">
              <div className="card-img">
                <svg
                  width="285"
                  height="59"
                  viewBox="0 0 285 59"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M271.785 58.5H0.793483L14.5643 29.7158L14.6676 29.5L14.5643 29.2842L0.793483 0.5H271.785L284.454 29.5L271.785 58.5Z"
                    fill="currentColor"
                    stroke="#D8D8D8"
                  />
                </svg>
              </div>
              <div class="card-img-overlay text-center">
                <p className="svg-text">Samdyti (0)</p>
              </div>
            </div>
          }
          key="3"
        >
          <div className="text-center">
            <p className="text-warning fw-bolder">Nėra pasiūlymų</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
