import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, message, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import axios from "../../config/axios.config";
import "./contact.css";

const { Option } = Select;

export const ContactUs = (props) => {
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bodyMessage: "",
  });

  const { email, name, bodyMessage } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const success = (msg) => {
    message.success({
      content: msg,
      className: "custom-class",
      style: {
        position: "absolute",
        top: "15vh",
        right: "0px",
      },
    });
  };
  const error = (msg) => {
    message.error({
      content: msg,
      className: "custom-class",
      style: {
        position: "absolute",
        top: "15vh",
        right: "0px",
      },
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    // window.scrollTo(0, 0);
    setLoading(true);
    let data = new FormData();
    data.append("name", name);
    data.append("identity", identity);
    data.append("email", email);
    data.append("message", bodyMessage);
    await axios.post("/api/contact/send-mail", data).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        success(res.data.successMessage);
      } else if (res.status === 201) {
        error(res.data.errorMessage);
      } else {
        error(res.data.errorMessage);
      }
    });
  };

  function handleOptionChange(value) {
    setIdentity(value);
  }

  return (
    <div className="mt-5">
      <div className="contact container">
        <p
          className="text-center"
          style={{ fontSize: "20px", fontWeight: "400" }}
        >
          Reikia pagalbos?
        </p>
        <p className="mb-5" style={{ fontSize: "36px", fontWeight: "700" }}>
          Susisiekite su mumis
        </p>
        <div
          className="pt-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p id="paragraph" style={{ textAlign: "center" }}>
            Mes pasistengsime kuo greičiau ir išsamiau atsakyti į jums rūpimus
            klausimus.
          </p>
        </div>

        <div className="contact-form-wrapper">
          <p
            className="love-to-hear"
            style={{ fontSize: "24px", fontWeight: "700" }}
          >
            Mes mielai su jumis susisieksime
          </p>
          <div className="contact-form ">
            <form onSubmit={onFinish} className="contact-inner">
              <div className="floating-label-group mb-4">
                <label
                  htmlFor="email"
                  className="ml-0 mb-2"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Elektroninio pašto adresas
                </label>{" "}
                <br />
                <Input
                  name="email"
                  onChange={handleChange}
                  size="small"
                  placeholder="Įrašykite elektroninio pašto adresą"
                />
              </div>
              <div className="floating-label-group mb-4">
                <label
                  htmlFor="name"
                  className="ml-0 mb-3"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Vardas
                </label>{" "}
                <br />
                <Input
                  name="name"
                  onChange={handleChange}
                  size="small"
                  placeholder="Įrašykite savo vardą"
                />
              </div>
              <div className="floating-label-group mb-4">
                <label
                  htmlFor="bodyMessage"
                  className="ml-0 mb-3"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Žinutė
                </label>
                <br />
                <TextArea
                  name="bodyMessage"
                  onChange={handleChange}
                  size="small"
                  placeholder="Jūsų tekstas"
                  style={{ height: "240px" }}
                />
              </div>
              <div className="contact-footer">
                <div>
                  <button
                    type="submit"
                    className="btn mb-3 mt-0"
                    style={{
                      padding: "13px",
                      background: "#EF771E",
                      color: "white",
                      borderRadius: "8px",
                      width: "188px",
                    }}
                  >
                    Siųsti
                  </button>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    marginLeft: "15px",
                  }}
                >
                  Patvirtinu, kad įdėmiai perskaičiau ir sutinku su{" "}
                  <Link style={{ color: "#EF771E" }} to="/">
                    pateiktomis sąlygomis{" "}
                  </Link>{" "}
                  ir
                  <Link style={{ color: "#EF771E" }} to="/">
                    {" "}
                    taisyklėmis
                  </Link>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
