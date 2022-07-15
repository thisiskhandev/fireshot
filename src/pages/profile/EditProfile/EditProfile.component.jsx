import React, { useEffect, useState } from "react";
import { Button, Input, Select, Spin } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import axios from "src/config/axios.config";

import { Error, Success } from "src/component/messages/messages";

import container from "./EditProfile.container";

import "../Profile.css";

const { Option } = Select;
const { TextArea } = Input;

const EditProfile = (props) => {
  const {
    auth: { currentUser, isAuthenticated },
    onLoadUserStart,
  } = props;

  const history = useHistory();
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [availability, setAvailability] = useState("");
  const [visibility, setVisibility] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPicture, setUserPicture] = useState("");
  const [image, setImage] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    about: "",
    rate: "",
    institute: "",
    degree: "",
    status: "",
    portfolioTitle: "",
  });

  console.log(profileData);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillsChange = (value) => {
    setSkills(value);
  };

  const handleLangChange = (value) => {
    setLanguages(value);
  };

  const handleAvaialablityChange = (value) => {
    setAvailability(value);
  };

  const handleVisibilityChange = (value) => {
    setVisibility(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // upload file
  const uploadFile = () => {
    setFileLoading(true);
    console.log("image", image);
    const data = new FormData();

    data.append("file", image);

    axios
      .post(`/api/users/upload-file/${currentUser._id}`, data, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res.data);
          Success(res.data.successMessage);
          setUserPicture(res.data.newPaths.url);
          setImage(null);
          setFileLoading(false);
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  /********************************************************** Submit Events *************************************************************/
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", profileData.name);
    data.append("email", profileData.email);
    data.append("title", profileData.title);
    data.append("phone", profileData.phone);
    data.append("about", profileData.about);
    data.append("rate", profileData.rate);
    data.append("institute", profileData.institute);
    data.append("degree", profileData.degree);
    data.append("status", profileData.status);
    data.append("portfolioTitle", profileData.portfolioTitle);

    data.append("availability", availability);
    data.append("visibility", visibility);
    for (let lang of languages) {
      data.append("language", lang);
    }
    for (let skill of skills) {
      data.append("skill", skill);
    }
    await axios
      .post(`/api/users/update/${currentUser._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          onLoadUserStart();
          Success(res.data.successMessage);
        } else {
          setLoading(false);
          Error(res.data.errorMessage);
        }
      });
  };

  useEffect(() => {
    if (currentUser) {
      setProfileData(currentUser);
      setAvailability(currentUser.availability);
      setVisibility(currentUser.visiblity);
      setLanguages(currentUser.language);
      setSkills(currentUser.skills);
      setUserPicture(currentUser.userPicture);
    }
  }, [currentUser]);

  const removeImage = () => {
    setUserPicture("");
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );

  return (
    <div className="edit-profile d-flex justify-content-center pb-4">
      <div className="container">
        {loading ? (
          <div
            className="text-center d-flex justify-content-center align-items-center"
            style={{ height: "73vh" }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            <form id="dataForm" className="mt-5" onSubmit={submitHandler}>
              <div className="floating-label-group edit-profile-img ">
                <div className="img-wrapper">
                  <img
                    src={
                      userPicture
                        ? userPicture
                        : image
                        ? URL.createObjectURL(image)
                        : "/assets/images/default.svg"
                    }
                    alt={profileData.name}
                    className="w-100 rounded"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center  ">
                  {image && (
                    <Button
                      className="btn mt-3 mb-5"
                      onClick={uploadFile}
                      loading={fileLoading}
                    >
                      Update Picture
                    </Button>
                  )}
                  <br />
                </div>

                <label
                  className="pl-2 pt-2"
                  style={{
                    background: "#DFDFDF",
                    width: "255px",
                    height: "62px",
                    fontSize: "23px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  <i class="fas fa-paperclip"></i>
                  <span className="pl-4">Profilio nuotrauka</span>
                  <input
                    type="file"
                    name="file"
                    multiple
                    style={{ visibility: "hidden", height: "10px" }}
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="edit-profile-form">
                <div className="floating-label-group">
                  <label htmlFor="Name">Vardas</label>
                  <Input
                    required={true}
                    value={profileData.name}
                    name="name"
                    size="small"
                    placeholder="Įvesk savo vardą"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="Email">El.paštas, </label>
                  <Input
                    required={true}
                    value={profileData.email}
                    name="email"
                    size="small"
                    placeholder="Įveskite savo el"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="title">Pareigos</label>
                  <Input
                    required={true}
                    value={profileData.title}
                    name="title"
                    size="small"
                    placeholder="Įveskite savo pavadinimą"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="phone">Telefono numeris</label>
                  <Input
                    required={true}
                    name="phone"
                    value={profileData.phone}
                    type="number"
                    size="small"
                    placeholder="Įdėkite savo telefoną"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="about">Apie</label>
                  <TextArea
                    rows={4}
                    name="about"
                    value={profileData.about}
                    size="small"
                    placeholder="Įveskite savo duomenis"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="rate">Valandinis įkainis</label>
                  <Input
                    prefix={"€"}
                    suffix={"/ val"}
                    required={true}
                    name="rate"
                    value={profileData.rate}
                    type="text"
                    size="small"
                    placeholder="Įveskite savo valandinį įkainį"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="Visiblity">Matomumas</label>
                  <Select
                    placeholder="Pasirinkite matomumą..."
                    onChange={handleVisibilityChange}
                    value={visibility}
                    style={{ width: "100%" }}
                  >
                    <Option value="Private">Privatus</Option>
                    <Option value="Public">Viešas</Option>
                  </Select>
                </div>
                <div className="floating-label-group">
                  <label htmlFor="indentity">Kada galite pradėti dirbti?</label>
                  <Select
                    placeholder="Pasirinkite prieinamumą..."
                    onChange={handleAvaialablityChange}
                    value={availability}
                    style={{ width: "100%" }}
                  >
                    <Option value="Daugiau negu 30 valandų per savaitę">
                      Daugiau negu 30 valandų per savaitę
                    </Option>
                    <Option value="Mažiau negu 30 valandų per savaitę">
                      Mažiau negu 30 valandų per savaitę
                    </Option>
                  </Select>
                </div>
                <div className="floating-label-group">
                  <label htmlFor="Language">Kalba</label>
                  <Select
                    mode="tags"
                    placeholder="Kalbos lygis, pvz., anglų: gimtoji"
                    value={languages}
                    onChange={handleLangChange}
                    style={{ width: "100%" }}
                  ></Select>
                </div>
                <div className="floating-label-group">
                  <label htmlFor="education">Išsilavinimas</label>
                  <Input
                    required
                    name="institute"
                    value={profileData.institute}
                    size="small"
                    placeholder="Įveskite savo instituto pavadinimą"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="education">Laipsnis</label>
                  <Input
                    required
                    name="degree"
                    size="small"
                    value={profileData.degree}
                    placeholder="Įveskite savo laipsnio pavadinimą"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="education">Statusas</label>
                  <Input
                    required
                    name="status"
                    size="small"
                    value={profileData.status}
                    placeholder="Įveskite savo laipsnio statusą, pvz., Baigtas"
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-label-group">
                  <label htmlFor="Skills">Įgūdžiai</label>
                  <Select
                    mode="tags"
                    placeholder="Įveskite Įgūdžiai"
                    value={skills}
                    style={{ width: "100%" }}
                    onChange={handleSkillsChange}
                  ></Select>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    padding: "13px",
                    background: "#00334E",
                    color: "white",
                    borderRadius: "4px",
                  }}
                >
                  Išsauoti
                </button>
                <button
                  onClick={() => history.goBack()}
                  className="btn w-100 mt-4"
                  style={{
                    padding: "13px",
                    background: "red",
                    color: "white",
                    borderRadius: "4px",
                  }}
                >
                  Atšaukti
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default container(EditProfile);
