import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, message } from "antd";

import axios from "../config/axios.config";

const { Panel } = Collapse;

export const Support = () => {
  const [categories, setCategories] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);

  const getCategories = async () => {
    await axios.get(`/api/categories/questions/get`).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
        getQuestions(res.data && res.data[0]._id);
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
    await axios.get(`/api/questions/get/${id}`).then((res) => {
      if (res.status === 200) {
        setQuestionsArray(res.data);
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
  }, []);
  return (
    <div className="support" style={{ overflowX: "hidden" }}>
      <div
        className="mt-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <p
            className="text-center"
            style={{ fontSize: "20px", fontWeight: "400" }}
          >
            Reikia pagalbos ?
          </p>
          <p
            className="text-center mb-5 faq"
            style={{ fontSize: "36px", fontWeight: "700" }}
          >
            Dažnai užduodami klausimai{" "}
          </p>
        </div>
      </div>

      <div className="row ml-5 mt-5">
        <div className="col-md-4 pt-1 pl-5">
          <p
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#00334E",
              marginBottom: "40px",
            }}
          >
            Kategorijos
          </p>
          {categories &&
            categories.length > 0 &&
            categories.map((cat, index) => {
              return (
                <Fragment key={index}>
                  <div key={cat._id} style={{ marginBottom: "20px" }}>
                    <Link
                      id={index}
                      className={index === 0 ? "nav-link active" : "nav-link"}
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#00334E",
                      }}
                      onClick={() => getQuestions(cat._id)}
                    >
                      {cat.name}
                    </Link>
                  </div>
                </Fragment>
              );
            })}
        </div>
        <div className="col-md-7 pr-5">
          {questionsArray &&
            questionsArray.map((q, index) => {
              return (
                <Collapse defaultActiveKey={["0"]}>
                  <Panel header={q.question} key={index}>
                    <p>{q.answer}</p>
                  </Panel>
                </Collapse>
              );
            })}
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-2 pl-5"></div>
        <div
          className="col-md-3 pl-5"
          style={{
            fontSize: "16px",
            fontWeight: "400",
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderBottom: "4px solid #00334E",
                  width: "36px",
                  height: "2px",
                }}
              ></div>
              <div
                className="ml-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  marginTop: "-10px",
                  letterSpacing: "2.8px",
                }}
              >
                Susisiekite su mumis
              </div>
            </div>
            <p
              className="mt-3 mb-4"
              style={{ fontSize: "36px", fontWeight: "700" }}
            >
              <p
                className="mb-3"
                style={{ fontSize: "36px", fontWeight: "700" }}
              >
                Vis dar turite <br /> <br />
                neatsakytų klausimų?
              </p>
            </p>
            <p
              className="para"
              style={{ fontSize: "14px", fontWeight: "400", width: "443px" }}
            >
              Mūsų profesionalų komanda pasistengs kuo greičiau ir išsamiau jums
              išsiaiškinti rūpimus klausimus.
            </p>
            <Link
              to="/contact-us"
              className="btn mb-5 mt-0"
              style={{
                padding: "13px",
                background: "#EF771E",
                color: "white",
                borderRadius: "8px",
                width: "188px",
              }}
            >
              Susisiekti
            </Link>
          </div>
        </div>
        <div className="col-md-6 ml-5 pl-5 img">
          <img
            src="/assets/images/Pic.png"
            alt="pic"
            className="img-fluid"
            width="360"
          />
        </div>
      </div>
    </div>
  );
};
