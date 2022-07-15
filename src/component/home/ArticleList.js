import React from "react";
import { Link } from "react-router-dom";

export const ArticleList = () => {
  return (
    <div className="container d-none">
      <div className="article-list-header">
        <div className="header-text">
          <div className="title">
            <h3>Išbandykite</h3>
          </div>
        </div>
      </div>

      <div className="article-list-content">
        <div className="row">
          <div className="col-content-outer col-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-content-inner mb-3 col-10 col-md-4 col-lg-4">
                <div className="article-card card-primary">
                  <div className="article-image">
                    <div className="image">
                      <a href="/">
                        <img
                          alt="pic"
                          src="assets/images/article-list-primary-image-1.jpg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="article-text">
                    <div className="time">
                      <span>1 min. skaitinys</span>
                    </div>
                    <div className="title">
                      <a href="/">
                        Sveikiname pasirinkus MasterFix. Tai pirmasis Jūsų
                        įrašas, galite jį redaguoti arba ištrinti, o tuomet
                        pradėkite kurti!
                      </a>
                    </div>
                  </div>
                  <div className="article-link">
                    <div className="link">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut elit tellus, luctus nec ullamc or per mattis, pulvinar
                      dapibus leo.dolor repellendus. Temporibus autem quibusdam
                      et aut officiis debitis aut rerum necessitatibus saepe
                      eveniet ut et voluptates repu dia ndae sint et molestiae
                      non recusanda itaque earum rerum hic tenetur a sapiente
                      delecus, ut aut reiciendis voluptatibus maiores alias
                      consequatur aut perferendis dolori us asperiores
                      repellat. {" "}
                    </div>
                  </div>
                  <div className="article-link mt-3">
                    <div className="link">
                      <Link className="link-article" to="/about-us">
                        Skaityti daugiau
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-content-inner mb-3 col-10 col-md-4 col-lg-4">
                <div className="article-card card-primary">
                  <div className="article-image">
                    <div className="image">
                      <a href="/">
                        <img
                          alt="pic"
                          src="assets/images/article-list-primary-image-1.jpg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="article-text">
                    <div className="time">
                      <span>1 min. skaitinys</span>
                    </div>
                    <div className="title">
                      <a href="/">Kuris specialistas labiausiai tinka...</a>
                    </div>
                  </div>
                  <div className="article-link">
                    <div className="link">
                      <a className="link-article" href="/">
                        Skaityti daugiau
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-content-inner mb-3 col-10 col-md-4 col-lg-4">
                <div className="article-card card-primary">
                  <div className="article-image">
                    <div className="image">
                      <a href="/">
                        <img
                          alt="pic"
                          src="assets/images/article-list-primary-image-1.jpg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="article-text">
                    <div className="time">
                      <span>1 min. skaitinys</span>
                    </div>
                    <div className="title">
                      <a href="/">Kuris specialistas labiausiai tinka...</a>
                    </div>
                  </div>
                  <div className="article-link">
                    <div className="link">
                      <Link className="link-article" to="/about-us">
                        Skaityti daugiau
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
