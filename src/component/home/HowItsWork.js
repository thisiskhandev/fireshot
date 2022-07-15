import React from "react";
import { Link } from "react-router-dom";

export const HowItsWork = () => {
  return (
    <div className="container">
      <div className="how-header">
        <div className="header-text">
          <div className="subtitle">
            <h4>Raskite tinkamą meistrą</h4>
          </div>
          <div className="title">
            <h3>Mūsų darbo specifika</h3>
          </div>
        </div>
      </div>

      <div className="how-content">
        <div className="how-grid">
          <div className="col-content-outer mb-5 col-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="content-object">
                <div className="object primary">
                  <img alt="pic" src="assets/images/how-primary-arrow-1.png" />
                </div>
                <div className="object secondary">
                  <img alt="pic" src="assets/images/how-primary-arrow-2.png" />
                </div>
              </div>
              <div className="col-content-inner   mb-5  col-10 col-md-4 col-lg-3">
                <div className="how-card card-primary">
                  <div className="how-image">
                    <div className="image">
                      <img
                        alt="pic"
                        src="assets/images/how-primary-image-1.jpg"
                      />
                    </div>
                  </div>
                  <div className="how-text">
                    <div className="title">
                      <h3>Darbo skelbimas</h3>
                    </div>
                    <div className="desc">
                      <p>
                        Paskelbkite apie norimą atlikti darbą ir mes pasiūlysime
                        lūkesčius atitinkantį sprendimą arčiausiai namų.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-content-inner  mb-5  col-10 col-md-4 col-lg-3">
                <div className="how-card card-primary">
                  <div className="how-image">
                    <div className="image">
                      <img
                        alt="pic"
                        src="assets/images/how-primary-image-2.jpg"
                      />
                    </div>
                  </div>
                  <div className="how-text">
                    <div className="title">
                      <h3>Paslaugos pasiūlymas</h3>
                    </div>
                    <div className="desc">
                      <p>
                        Kai tik paskelbsite apie darbą, jį galės matyti
                        potencialūs statybų paslaugų teikėjai. Statybininkai ir
                        remontininkai, matydami jūsų siūlomą darbą, galės siųsti
                        jums savo pasiūlymus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-content-inner col-10 col-md-4 col-lg-3">
                <div className="how-card card-primary">
                  <div className="how-image">
                    <div className="image">
                      <img
                        alt="pic"
                        src="assets/images/how-primary-image-3.jpg"
                      />
                    </div>
                  </div>
                  <div className="how-text">
                    <div className="title">
                      <h3>Peržiūra ir pasirinkimas</h3>
                    </div>
                    <div className="desc">
                      <p>
                        Gavę pasiūlymų galėsite peržiūrėti kiekvieno
                        atsiliepusiojo profilį, atsiliepimus ir išsirinkti jums
                        labiausiai patinkantį darbininką savo namams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-footer">
        <div className="footer-button">
          <div className="button">
            <Link className="btn btn-block btn-footer" to="/about-us">
              Sužinoti daugiau
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
