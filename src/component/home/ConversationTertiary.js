import React from "react";
import { Link } from "react-router-dom";

export const ConversationTertiary = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-section-outer col-12 col-md-12 col-lg-12">
          <div className="row man-winn">
            <div
              className="col-section-inner col-12 col-sm-12 col-md-5 col-lg-4 mb-5 pb-2 mt-5"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <div className="conversion-text">
                  <div className="subtitle">
                    <h4>Prisijunk prie masterfix.lt ir</h4>
                  </div>
                  <div className="title">
                    <h3>
                      Sulauk daugiau
                      <br />
                      darbo pasiūlymų
                    </h3>
                  </div>
                </div>
                <div className="conversion-button">
                  <div className="button">
                    <Link className="btn btn-block btn-conversion" to="/signup">
                      Prisijungti dabar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-section-inner col-sm-12 col-12 col-md-6 col-lg-5">
              <div className="conversion-image">
                <div className="image">
                  <img
                    alt="pic"
                    src="assets/images/conversion-tertiary-image-1.png"
                    style={{ width: "100%", height: "80%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
