import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "../../config/axios.config";

import { CreateQuestions } from "../../component/admin/CreateQuestions";
import { CreateQuestionsCategories } from "../../component/admin/CreateQuestionsCategories";

export const Questions = () => {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [parentId, setParentId] = useState("");

  const getCategories = async () => {
    await axios.get(`/api/categories/questions/get`).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
        console.log(res.data);
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

  const getQuestions = async (id) => {
    setParentId(id);
    await axios.get(`/api/questions/get/${id}`).then((res) => {
      if (res.status === 200) {
        setQuestionsArray(res.data);
        console.log(res.data);
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

  useEffect(() => {
    getCategories();
    return () => {};
  }, [success]);

  const deleteHandler = async (id) => {
    await axios
      .delete(`/api/questions/delete/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getQuestions(parentId);
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

  const deleteCatHandler = async (id) => {
    await axios
      .delete(`/api/categories/questions/delete/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getCategories();
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

  return (
    <div className="container">
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ paddingRight: "15px" }}>
          <CreateQuestionsCategories />
        </span>
        <span style={{ paddingRight: "15px" }}>
          <CreateQuestions />
        </span>
      </div>
      <div>
        <div className="row mt-5 px-5">
          <div className="col-md-4">
            {categories.map((cat, index) => {
              return (
                <Fragment>
                  <div key={cat._id}>
                    <span className="pr-3">{index + 1}</span>

                    <Link onClick={() => getQuestions(cat._id)}>
                      {cat.name}
                    </Link>
                    <button
                      className="btn"
                      onClick={() => deleteCatHandler(cat._id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div className="col-md-8 mb-5">
            {questionsArray.length > 0 &&
              questionsArray.map((child, index) => {
                return (
                  <div key={child._id} className="border p-4 mb-3">
                    <p className="float-right">
                      <button
                        className="btn"
                        onClick={() => deleteHandler(child._id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </p>
                    <p style={{ fontSize: "24px", fontWeight: "700" }}>
                      Q. {child.question}
                    </p>
                    <p>A. {child.answer}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
