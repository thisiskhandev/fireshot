import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, Avatar } from "antd";
import {
  ClockCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeFilled,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";

import axios from "src/config/axios.config";

import { Error, Success } from "src/component/messages/messages";
import { AddPortfolio } from "src/component/forms/AddPortfolio";

import container from "./Profile.container";

import "../Profile.css";

const Profile = (props) => {
  const {
    auth: { currentUser, isAuthenticated },
    onLoadUserStart,
  } = props;

  const [location, setLocation] = useState("");

  const [editPortfolio, setEditPortfolio] = useState(false);

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/country_name/")
      .then((response) => {
        setLocation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePortfolio = async (id) => {
    await axios.delete(`/api/users/portfolio/delete/${id}`).then((res) => {
      if (res.status === 200) {
        onLoadUserStart();
        Success(res.data.successMessage);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    // getIpAddress();
    getGeoInfo();
    return () => {};
  }, []);

  const update = () => {
    onLoadUserStart();
  };

  return (
    <div className="profile p-5 container">
      <div className="border border-2 rounded">
        <div className="row p-5 pb-1">
          <div className="col-md-6">
            <Comment
              author={
                <h5 className="text-dark fw-light">{currentUser.name}</h5>
              }
              avatar={
                <Avatar
                  src={
                    currentUser.userPicture
                      ? currentUser.userPicture
                      : "/assets/images/default.svg"
                  }
                  alt={currentUser.name}
                  // size='large'
                />
              }
              content={
                <p className="mt-5 mt-md-0 text-muted">
                  <EnvironmentOutlined /> {location} –{" "}
                  {moment().format("HH:mm:ss")} local time
                </p>
              }
            />
          </div>
          <div className="col-md-3">
            <button className="btn rounded-pill border border-2 w-100 text-muted mb-4 mb-md-0">
              peržiūrėti viešą profilį
            </button>
          </div>
          <div className="col-md-3">
            <Link
              to={"/profile/edit/" + currentUser._id}
              className="btn rounded-pill w-100 text-white"
              style={{ background: "#EF771E" }}
            >
              redaguoti profilį
            </Link>
          </div>
        </div>
        <hr />
        <div className="row profile-info p-3 p-md-0">
          <div className="col-md-4 border-right">
            <div className="profiles-links">
              <p className="p-3">
                <span className="fs-5">peržiūrėti profil</span>{" "}
                <Link to={"/profile/edit/" + currentUser._id}>
                  <span className="border rounded-circle p-1 ml-3">
                    <EditOutlined />
                  </span>
                </Link>
              </p>
              <p>
                <Link>{currentUser.title}</Link>
              </p>
              {/* <p><Link>Tile Fitting</Link></p> */}
              <p>
                <Link>visi darbai</Link>
              </p>
            </div>
            <hr />
            <div className="pl-3">
              <div className="visiblity mt-4 mb-4">
                <div className="d-flex gap-4">
                  <h5 className="fw-bolder">matomumas</h5>
                  <div>
                    <Link to={"/profile/edit/" + currentUser._id}>
                      <EditOutlined className="border rounded-circle p-1" />
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <EyeFilled />
                  </div>
                  <p className="para">{currentUser.visiblity}</p>
                </div>
              </div>
              <div className="availability">
                <div className="d-flex gap-4">
                  <h5 className="fw-bolder">prieinamumas</h5>
                  <div>
                    <Link to={"/profile/edit/" + currentUser._id}>
                      <EditOutlined className="border rounded-circle p-1" />
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <p>
                      <ClockCircleFilled />
                    </p>
                  </div>
                  <p className="para">{currentUser.availability}</p>
                </div>
              </div>
              <div className="language mt-4">
                <div className="d-flex gap-4">
                  <h5 className="fw-bolder">kalba</h5>
                  <div>
                    <Link to={"/profile/edit/" + currentUser._id}>
                      <PlusOutlined className="border rounded-circle p-1 mr-2" />
                    </Link>{" "}
                    <Link to={"/profile/edit/" + currentUser._id}>
                      <EditOutlined className="border rounded-circle p-1" />
                    </Link>
                  </div>
                </div>
                <div className="">
                  <p>
                    {currentUser.language &&
                      currentUser.language.map((lang) => {
                        return (
                          <>
                            <span>{lang}</span> <br />
                          </>
                        );
                      })}
                    {/* <span>German: <span className='para'>Native</span></span> */}
                  </p>
                </div>
              </div>
              <div className="education mt-4">
                <div className="d-flex gap-4">
                  <h5 className="fw-bolder">išsilavinimas:</h5>
                  <div>
                    <Link>
                      <PlusOutlined className="border rounded-circle p-1" />
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-2 ed-info">
                  <div>
                    <p>{currentUser.institute}</p>
                    <p className="para">{currentUser.degree}</p>
                    <p className="grad-link">{currentUser.status}</p>
                  </div>
                  <div>
                    <Link to={"/profile/edit/" + currentUser._id}>
                      <EditOutlined className="border rounded-circle p-1 ml-4 mr-2" />
                    </Link>{" "}
                    <Link>
                      <DeleteOutlined className="border rounded-circle p-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 about-user">
            <div className="px-2 p-4">
              <div className="d-flex justify-content-between">
                <p>
                  <span className="fs-4">{currentUser.title} </span>{" "}
                  <Link to={"/profile/edit/" + currentUser._id}>
                    {" "}
                    <EditOutlined className="border rounded-circle p-1 ml-4" />
                  </Link>
                </p>
                <p className="price">
                  <span className="fs-5" style={{ color: "#ef771e" }}>
                    €{currentUser.rate}/val{" "}
                  </span>{" "}
                  <Link to={"/profile/edit/" + currentUser._id}>
                    {" "}
                    <EditOutlined className="border rounded-circle p-1 ml-2" />
                  </Link>
                </p>
              </div>
              <div>
                <p className="fs-4 mb-1">apie</p>
                <p className="text-justify mt-0 mb-0 para">
                  "{currentUser.about}"
                </p>
              </div>
            </div>
            <hr className="mt-0 mb-5" />
            <div>
              <p className="fs-4">darbo istorija</p>
              <p>nėra įrašų</p>
            </div>
            <hr className="mt-3 mb-5" />
            <div className="portfolio">
              <div className="d-flex gap-2">
                <p>
                  <span className="fs-4">
                    portfolio &nbsp; (
                    {currentUser.portfolio && currentUser.portfolio.length}){" "}
                  </span>
                </p>
                <p>
                  <Link onClick={() => setEditPortfolio(!editPortfolio)}>
                    <EditOutlined className="border rounded-circle p-2 ml-4" />
                  </Link>
                </p>
              </div>
              <div className="row pics">
                {currentUser.portfolio &&
                  currentUser.portfolio.map((portfolio) => {
                    return (
                      <>
                        <div className="col-md-4 mb-4">
                          {editPortfolio && (
                            <div className="d-flex justify-content-end fs-4">
                              <DeleteOutlined
                                onClick={() => deletePortfolio(portfolio._id)}
                                className="text-center text-danger"
                              />
                            </div>
                          )}
                          <div>
                            <img
                              src={portfolio.url}
                              className="w-100 rounded"
                              style={{ height: "260px" }}
                            />
                          </div>
                          <div>
                            <p
                              className="mt-1 fs-5"
                              style={{ color: "#ef771e" }}
                            >
                              {portfolio.portfolioTitle}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {editPortfolio && (
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <AddPortfolio user={currentUser} update={update} />
                  </div>
                )}
              </div>
            </div>
            <hr className="mt-3 mb-4" />
            <div className="skills">
              <div className="d-flex gap-2">
                <p className="fs-4">įgūdžiai</p>
                <p>
                  <Link to={"/profile/edit/" + currentUser._id}>
                    <EditOutlined className="border rounded-circle p-2 ml-3" />
                  </Link>
                </p>
              </div>
              <div className="skill-btns d-flex flex-wrap">
                {currentUser.skills &&
                  currentUser.skills.map((skill) => {
                    return (
                      <button className="btn rounded-pill px-5">{skill}</button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-info">
        {/* Testimonials */}
        <div className="testimonials border border-2 rounded mt-4">
          <div className="d-flex justify-content-between p-3 pb-0">
            <div>
              <h4 className="mb-1">Atsiliepimai</h4>
              <p className="mt-1">klientų atsiliepimai</p>
            </div>
            <div>
              <PlusOutlined className="border rounded-circle p-2 mr-5" />
            </div>
          </div>
          <hr className="mt-0" />
          <div className="testimonial-link p-3 pt-2 fs-5">
            <Link>
              {" "}
              <PlusOutlined style={{ color: "#ef771e" }} /> paprašyti
              atsiliepimo{" "}
            </Link>
          </div>
        </div>

        {/* Certifications */}
        <div className="certifications border border-2 rounded mt-4">
          <div className="d-flex justify-content-between p-3 pb-0">
            <div>
              <h4 className="mb-3">sertifkatai</h4>
            </div>
            <div>
              <PlusOutlined className="border rounded-circle p-2 mr-5" />
            </div>
          </div>
          <hr className="mt-0" />
          <div className="certification-data p-3 pt-2 fs-5">
            <div className="d-flex gap-4 p-3 pb-0">
              <div>
                <img
                  src="/assets/images/Pic.png"
                  alt="certificate"
                  className="rounded-circle mt-4"
                  width="43"
                />
              </div>
              <div className="flex-grow-1">
                <p className="fs-5 mb-0">Carpenter</p>
                <p>
                  Custom certification <br />
                  Lorem Company <br />
                  Issued November 2018
                </p>
              </div>
              <div className="">
                <DeleteOutlined className="border rounded-circle p-2 mr-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Employment history */}
        <div className="employment border border-2 rounded mt-4">
          <div className="d-flex justify-content-between p-3 pb-0">
            <div>
              <h4 className="mb-3">įdarbinimo istorija</h4>
            </div>
            <div>
              <PlusOutlined className="border rounded-circle p-2 mr-5" />
            </div>
          </div>
          <hr className="mt-0" />
          <div className="employment-link p-3 pt-2 fs-5 text-center">
            <Link>
              {" "}
              <PlusOutlined style={{ color: "#ef771e" }} /> pridėti įdarbinimo
              įstoriją{" "}
            </Link>
          </div>
        </div>

        {/* Other Experiences */}
        <div className="other-experiences border border-2 rounded mt-4">
          <div className="d-flex justify-content-between p-3 pb-0">
            <div>
              <h4 className="mb-3">kita patirtis</h4>
            </div>
            <div>
              <PlusOutlined className="border rounded-circle p-2 mr-5" />
            </div>
          </div>
          <hr className="mt-0" />
          <div className="other-experiences-link p-3 pt-2 fs-5 text-center">
            <h4>pridėkite kitas patirtis, kurios Jums padėtų išsiskirti</h4>
            <Link>pridėti kitas patirtis </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default container(Profile);
