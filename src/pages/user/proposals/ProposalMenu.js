import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';

import axios from 'src/config/axios.config';

import { AllProposals } from './AllProposals';
import { Error } from 'src/component/messages/messages';

const { TabPane } = Tabs;

export const ProposalMenu = (props) => {
  function callback(key) {
    console.log(key);
  }

  const [proposals, setProposals] = useState([]);
  const getProposalsById = async () => {
    await axios.get(`/api/jobs/proposals/get/${props.jobId}`).then((res) => {
      if (res.status === 200) {
        setProposals(res.data);
      } else {
        Error(res.data.successMessage);
      }
    });
  };

  useEffect(() => {
    getProposalsById();
    return () => {};
  }, []);

  return (
    <div className="all-proposals-menu border border-2 p-4">
      <Tabs defaultActiveKey="1" onChange={callback} tabPosition="top">
        <TabPane tab={`Visi pasiūlymai (${proposals.length})`} key="1">
          <AllProposals jobId={props.jobId} />
        </TabPane>
        <TabPane tab="Sutrumpinti (0)" key="2">
          <div className="text-center fw-bolder text-warning">
            No Shortlisted History!
          </div>
        </TabPane>
        <TabPane tab="Parašyta (1)" key="3">
          <div className="text-center fw-bolder text-warning">
            No Messages History!
          </div>
        </TabPane>
        <TabPane tab="Archyvuota (0)" key="4">
          <div className="text-center fw-bolder text-warning">
            No Archived History!
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
