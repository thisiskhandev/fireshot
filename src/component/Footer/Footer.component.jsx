import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "src/config/axios.config";

import { CreateJobForm } from "../forms/CreateJobForm";
import { Error } from "../messages/messages";

import container from "./Footer.container";

const Footer = (props) => {
  const {
    auth: { isAuthenticated },
  } = props;

  const [subCategories, setSubCategories] = useState([]);
  const getSubCategories = async (id) => {
    await axios.get(`/api/categories/jobs/get/sub-categories`).then((res) => {
      if (res.status === 200) {
        setSubCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getSubCategories();
    return () => {};
  }, []);

  return (
    <div>
      <footer className="footbar footbar-primary">
        <div className="container">
          <div className="row">
            <div className="col-footbar-outer col-12 col-md-12 col-lg-8">
              <div className="row">
                <div className="col-footbar-inner col-12 col-md-4 col-lg-4">
                  <div className="footbar-logo">
                    <div className="logo">
                      <a href="/">
                        <img alt="pic" src="/assets/images/logo-footbar.png" />
                      </a>
                    </div>
                  </div>
                  <div className="footbar-icon">
                    <div className="icon">
                      <a href="/">
                        <i className="fab fa-google-plus-g"></i>
                        {/* <GoogleCircleFilled/> */}
                      </a>
                    </div>
                    <div className="icon">
                      <a href="/">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                    <div className="icon">
                      <a href="/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </div>
                    <div className="icon">
                      <a href="/">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                  <div className="footbar-link">
                    <div className="link">
                      <Link
                        className="foot-link secondary"
                        to="/privacy-policy"
                      >
                        Privatumo politika
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-footbar-inner col-6">
                  <div className="footbar-text">
                    <div className="title">
                      <h3>Namų savininkams</h3>
                    </div>
                  </div>
                  <div className="footbar-link">
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Paskelbti darbą
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Apie mus
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Kontaktai
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Pagalba
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Rasti statybininką ar remontininką
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-footbar-inner col-6 d-none">
                  <div className="footbar-text">
                    <div className="title">
                      <h3>Pagalbos centras</h3>
                    </div>
                  </div>
                  <div className="footbar-link">
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Projektų pagalba
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Kainynas
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Pagalba samdantiems
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Ask a tradesman
                      </a>
                    </div>
                    <div className="link">
                      <a className="foot-link primary" href="/">
                        Trade jargon
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-footbar-outer col-12 col-md-12 col-lg-4">
              <div className="footbar-special text-white">
                <div className="footbar-text">
                  <div className="caption">
                    <h6></h6>
                  </div>
                  <div className="subtitle">
                    <h4>Išbandykite</h4>
                  </div>
                </div>
                <div className="footbar-button">
                  <div className="button">
                    {/* <a className="btn btn-block btn-footbar primary" href="/">
                                        Post a Job
                                    </a> */}
                    <CreateJobForm footer="footer" label="Paskelbti darbą" />
                  </div>
                  <div className="button">
                    {isAuthenticated ? (
                      <Link
                        class="btn btn-block btn-footbar secondary"
                        to="/find-job"
                      >
                        rasti darbą
                      </Link>
                    ) : (
                      <Link
                        class="btn btn-block btn-footbar secondary"
                        to="/signup"
                      >
                        Registruotis dabar
                      </Link>
                    )}
                  </div>
                </div>
                {/* <div className="footbar-contact">
                  <div className="contact-icon">
                    <div className="icon">
                      <i className="fas fa-phone"></i>
                    </div>
                  </div>
                  <div className="contact-link">
                    <div className="caption">
                      <h6>Susisiekite su mumis</h6>
                    </div>
                    <div className="link">
                      <a className="foot-link tertiary" href="#">
                        +370 6...
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-footbar-outer pl-3
             col-12 col-md-12 col-lg-12"
            >
              <div className="footbar-text">
                <div className="title">
                  <h3>Apskritys</h3>
                </div>
              </div>
              <div className="footbar-link">
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Vilniaus
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Kauno
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Klaipėdos
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Šiaulių
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Utenos
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Alytaus
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Panevėžio
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Tauragės
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Telšių
                  </a>
                </div>
                <div className="link">
                  <a className="foot-link primary" href="/">
                    Mariampolės
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-footbar-outer col-12 col-md-12 col-lg-12">
              <div className="footbar-text">
                <div className="title">
                  <h3>Kategorijos</h3>
                </div>
              </div>
              <div className="footbar-link collapse" id="collapseExample">
                {subCategories.length > 0 &&
                  subCategories.map((subCat) => {
                    return (
                      <div className="link">
                        <a className="foot-link primary" href="#">
                          {subCat.name}
                        </a>
                      </div>
                    );
                  })}
              </div>
              <div className="footbar-button text-center">
                <div className="button">
                  <a
                    className="btn btn-block btn-footbar for-collapse collapsed"
                    data-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  ></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footbar-copyright">
            <div className="copyright">
              <span>© 2022 Masterfixer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default container(Footer);
