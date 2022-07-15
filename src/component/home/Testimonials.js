import React from "react";
import Slider from "react-slick";

export const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
    initialSlide: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="testimonial-header">
        <div className="row">
          <div className="col-header-outer col-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-header-inner col-12 col-md-7 col-lg-6">
                <div className="header-text">
                  <div className="subtitle">
                    <h4>atsiliepimai</h4>
                  </div>
                  <div className="title">
                    <h3>Peržiūrėti atsiliepimus</h3>
                  </div>
                </div>
              </div>
              <div className="col-header-inner col-12 col-md-5 col-lg-6">
                <div className="header-text">
                  <div className="desc">
                    <p>
                      Geriausias būdas sužinoti apie teikiantįjį paslaugas
                      <br />
                      yra peržiūrėti jo klientų atsiliepimus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-content">
        <Slider {...settings} className="slick-responsive-auto double primary">
          <div className="testimony-card card-primary">
            <div className="row">
              <div className="col-card-outer col-sm-12 col-md-4 col-lg-4">
                <div className="testimony-image">
                  <div className="image">
                    <img
                      alt="pic"
                      src="assets/images/testimony-primary-image-1.png"
                    />
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="subtitle">
                    <h4>Klientas</h4>
                  </div>
                  <div className="title">
                    <h3>Vainius M</h3>
                  </div>
                </div>
              </div>
              <div className="col-card-outer col-sm-12 col-md-7 col-lg-7">
                <div className="testimony-rate">
                  <div className="rate">
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="desc">
                    <p>Puikus ir greitas darbas, rekomenduoju</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="testimony-wrapper">
              <div className="testimony-value">
                <span>
                  <i>100%</i>
                  teigiamas
                </span>
              </div>
            </div> */}
          </div>

          <div className="testimony-card card-primary">
            <div className="row">
              <div className="col-card-outer col-12 col-md-4 col-lg-4">
                <div className="testimony-image">
                  <div className="image">
                    <img
                      alt="pic"
                      src="assets/images/testimony-primary-image-1.png"
                    />
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="subtitle">
                    <h4>Klientas</h4>
                  </div>
                  <div className="title">
                    <h3> Mantas Ž</h3>
                  </div>
                </div>
              </div>
              <div className="col-card-outer col-12 col-md-8 col-lg-8">
                <div className="testimony-rate">
                  <div className="rate">
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="desc">
                    <p>
                      Meistras atvyko greitai, viską greitai ir švariai sutvarkė
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="testimony-wrapper">
              <div className="testimony-value">
                <span>
                  <i>100%</i>
                  teigiamas
                </span>
              </div>
            </div> */}
          </div>

          <div className="testimony-card card-primary">
            <div className="row">
              <div className="col-card-outer col-12 col-md-4 col-lg-4">
                <div className="testimony-image">
                  <div className="image">
                    <img
                      alt="pic"
                      src="assets/images/testimony-primary-image-1.png"
                    />
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="subtitle">
                    <h4>Klientas</h4>
                  </div>
                  <div className="title">
                    <h3>Deividas B</h3>
                  </div>
                </div>
              </div>
              <div className="col-card-outer col-12 col-md-8 col-lg-8">
                <div className="testimony-rate">
                  <div className="rate">
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="desc">
                    <p>
                      Patiko didelė darbų pasiūla, atsiliepimai apie meistrus
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="testimony-wrapper">
              <div className="testimony-value">
                <span>
                  <i>100%</i>
                  teigiamas
                </span>
              </div>
            </div> */}
          </div>

          <div className="testimony-card card-primary">
            <div className="row">
              <div className="col-card-outer col-12 col-md-4 col-lg-4">
                <div className="testimony-image">
                  <div className="image">
                    <img
                      alt="pic"
                      src="assets/images/testimony-primary-image-1.png"
                    />
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="subtitle">
                    <h4>MEISTRAS</h4>
                  </div>
                  <div className="title">
                    <h3>Linas R</h3>
                  </div>
                </div>
              </div>
              <div className="col-card-outer col-12 col-md-8 col-lg-8">
                <div className="testimony-rate">
                  <div className="rate">
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                    <span>
                      <img
                        alt="pic"
                        src="assets/images/testimony-primary-rate-star.png"
                      />
                    </span>
                  </div>
                </div>
                <div className="testimony-text">
                  <div className="desc">
                    <p>
                      Pirmą darbą gavau per kelias valandas, nekantrauju dirbti
                      su MasterFix toliau
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="testimony-wrapper">
              <div className="testimony-value">
                <span>
                  <i>100%</i>
                  teigiamas
                </span>
              </div>
            </div> */}
          </div>
        </Slider>
      </div>
    </div>
  );
};
