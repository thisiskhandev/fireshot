import React from "react";
import { Link } from "react-router-dom";

export const Guarantee = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-section-outer col-12 col-md-12 col-lg-12">
          <div className="row">
            <div className="col-section-inner col-sm-12 col-md-6 col-lg-6">
              <div className="guarantee-image">
                <div className="image">
                  <img
                    alt="pic"
                    src="assets/images/guarantee-primary-image-1.png"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-section-inner col-sm-12 col-md-6 col-lg-6">
              <div className="guarantee-text">
                <div className="subtitle">
                  <h4>Sėkmės garantas</h4>
                </div>
                <div className="title">
                  <h3>
                    Pasirinkite patikimą meistrą
                    <br />
                    namams
                  </h3>
                </div>
                <div className="desc">
                  <p>
                    Geriausias būdas sužinoti apie statybininką
                    <br />
                    yra peržiūrėti klientų atsiliepimus
                  </p>
                </div>
              </div>
              <div className="guarantee-button">
                <div className="button">
                  <Link
                    className="btn btn-block btn-guarantee"
                    to="/find-builders"
                  >
                    surasti darbuotoją
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
