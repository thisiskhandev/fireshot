import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import "./Admin.css";
import {
  ClusterOutlined,
  QuestionOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Users } from "./Users";
import { Questions } from "./Questions";
import { PaymentDetails } from "./PaymentDetails";
import { Categories } from "./Categories";
import { Jobs } from "./jobs";
const { TabPane } = Tabs;

export const AdminSideBar = () => {
  return (
    <div>
      <div className="dashboard-nav">
        <div className="main-dash">
          <Tabs tabBarStyle={{ color: "black !important" }} tabPosition={"top"}>
            <TabPane
              tab={
                <span>
                  <UsergroupAddOutlined />
                  Users
                </span>
              }
              key="8"
            >
              <Users />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IdcardOutlined />
                  Jobs
                </span>
              }
              key="6"
            >
              <Jobs />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.7273 8.63636V2.09091C14.7273 1.19091 13.9909 0.454544 13.0909 0.454544H1.63636C0.736364 0.454544 0 1.19091 0 2.09091V8.63636C0 9.53636 0.736364 10.2727 1.63636 10.2727H13.0909C13.9909 10.2727 14.7273 9.53636 14.7273 8.63636ZM7.36364 7.81818C6.00545 7.81818 4.90909 6.72182 4.90909 5.36364C4.90909 4.00545 6.00545 2.90909 7.36364 2.90909C8.72182 2.90909 9.81818 4.00545 9.81818 5.36364C9.81818 6.72182 8.72182 7.81818 7.36364 7.81818ZM18 2.90909V11.9091C18 12.8091 17.2636 13.5455 16.3636 13.5455H2.45455V11.9091H16.3636V2.90909H18Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.7273 8.63636V2.09091C14.7273 1.19091 13.9909 0.454544 13.0909 0.454544H1.63636C0.736364 0.454544 0 1.19091 0 2.09091V8.63636C0 9.53636 0.736364 10.2727 1.63636 10.2727H13.0909C13.9909 10.2727 14.7273 9.53636 14.7273 8.63636ZM7.36364 7.81818C6.00545 7.81818 4.90909 6.72182 4.90909 5.36364C4.90909 4.00545 6.00545 2.90909 7.36364 2.90909C8.72182 2.90909 9.81818 4.00545 9.81818 5.36364C9.81818 6.72182 8.72182 7.81818 7.36364 7.81818ZM18 2.90909V11.9091C18 12.8091 17.2636 13.5455 16.3636 13.5455H2.45455V11.9091H16.3636V2.90909H18Z"
                      fill="currentColor"
                      fill-opacity="0.5"
                    />
                  </svg>
                  Payment Details
                </span>
              }
              key="3"
            >
              <PaymentDetails />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ClusterOutlined />
                  Categories
                </span>
              }
            >
              <Categories />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <QuestionOutlined />
                  Questions
                </span>
              }
              key="9"
            >
              <Questions />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
