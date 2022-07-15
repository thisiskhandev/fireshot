import React, { useState } from "react";
import { Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

import axios from "../../config/axios.config";

import { Error, Success } from "../../component/messages/messages";

import "./Job.css";

export const SubmitProposals = (props) => {
  const jobId = props.match.params.id;
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "/api/jobs/proposals/submit",
        {
          budget,
          description,
          jobId,
          timeOfPost: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
          user: localStorage.getItem("user"),
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          setLoading(false);
          Success(res.data.successMessage);
        } else {
          setLoading(false);
          Error(res.data.errorMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        Error(err.response.data.errorMessage);
      });
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );
  return (
    <div className="d-flex justify-content-center" style={{ height: "86vh" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <form className="submit-proposal-form" onSubmit={submitHandler}>
          <h4 className="text-center my-4">pateikti pasiūlymą</h4>
          <div className="mb-3">
            <label for="budget" className="form-label">
              biudžetas:
            </label>
            <Input
              prefix="€              "
              type="number"
              name="budget"
              required
              className="form-control"
              id="budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
              aprašymas:
            </label>
            <textarea
              rows="8"
              type="password"
              required
              className="form-control"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary submit-proposal w-100"
          >
            pateikti
          </button>
        </form>
      )}
    </div>
  );
};
