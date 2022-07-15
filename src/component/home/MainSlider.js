import React from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';

import { CreateJobForm } from '../forms/CreateJobForm';

export const MainSlider = (props) => {
  const {
    auth: { isAuthenticated }
  } = props;

  let padding;
  if (window.innerWidth > 1000) {
    padding = '94px';
  } else {
    padding = '10px';
  }

  const settings = {
    dots: false,
    classNameName: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: padding,
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          top: '62vh',
          right: '0px',
          borderRadius: '10px',
          padding: '10px',
          fontSize: '100px'
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    )
  };
  return (
    <div class="container-fluid">
      <Slider {...settings} className="slick-responsive-auto single primary">
        <div className="banner-card card-primary">
          <div className="banner-image">
            <div className="image">
              <img
                alt="pic"
                src="assets/images/banner-sider-primary-image-1.jpg"
              />
            </div>
          </div>
          <div className="banner-wrapper">
            <div className="banner-text">
              <div className="subtitle">
                <h4>Visoje Lietuvoje.</h4>
              </div>
              <div className="title">
                <h3>
                  Raskite patikimą Statybų Meistrą
                  <br />
                  savo namams
                </h3>
              </div>
              <div className="desc">
                <p>Lengvas būdas rasti meistrą ar siūlyti savo paslaugas.</p>
              </div>
            </div>
            <div className="banner-button">
              <div
                className="button plus-area"
                style={{ position: 'relative' }}
              >
                <CreateJobForm label="Paskelbti darbą" />
              </div>
              <div class="button">
                {isAuthenticated ? (
                  <Link
                    class="btn btn-block btn-banner register-now secondary"
                    to="/find-job"
                  >
                    rasti darbą
                  </Link>
                ) : (
                  <Link
                    class="btn btn-block btn-banner register-now secondary"
                    to="/signup"
                  >
                    Registruotis dabar
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="banner-card card-primary">
          <div class="banner-image">
            <div class="image">
              <img
                alt="pic"
                src="assets/images/senior-worker-choosing-tools-2022-02-08-22-39-27-utc-min.jpg"
              />
            </div>
          </div>
          <div class="banner-wrapper">
            <div class="banner-text">
              <div class="subtitle">
                <h4>Visoje Lietuvoje.</h4>
              </div>
              <div class="title">
                <h3>
                  Raskite patikimą Statybų Meistrą
                  <br />
                  savo namams
                </h3>
              </div>
              <div class="desc">
                <p>Lengvas būdas rasti meistrą ar siūlyti savo paslaugas.</p>
              </div>
            </div>
            <div className="banner-button">
              <div
                className="button plus-area"
                style={{ position: 'relative' }}
              >
                <a className="btn btn-block btn-banner primary" href="/">
                  <span
                    className="p-2 ml-2 button-icon"
                    style={{
                      color: 'white',
                      position: 'absolute',
                      left: '0%',
                      top: '5px',
                      borderRadius: '.75em',
                      width: '2.7em',
                      height: '2.7em'
                    }}
                  ></span>
                  <span className="" style={{ paddingLeft: '4px' }}>
                    Paskelbti darbą{' '}
                  </span>
                </a>
              </div>
              <div class="button">
                <Link
                  class="btn btn-block btn-banner register-now secondary"
                  to="/signup"
                >
                  Registruotis dabar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
