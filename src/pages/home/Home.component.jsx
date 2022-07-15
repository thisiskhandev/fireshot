import React from 'react';

import { CreateJobForm } from 'src/component/forms/CreateJobForm';
import { MainSlider } from 'src/component/home/MainSlider';
import { HowItsWork } from 'src/component/home/HowItsWork';
import { Testimonials } from 'src/component/home/Testimonials';
import { Guarantee } from 'src/component/home/Guarantee';
import { Builder } from 'src/component/home/Builder';
import { ArticleList } from 'src/component/home/ArticleList';
import { ConversationTertiary } from 'src/component/home/ConversationTertiary';

import container from './Home.container';

// import "./Home.css";

const Home = (props) => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <div className="page">
        <div className="home">
          <section className="section banner-slider primary">
            <MainSlider {...props} />
          </section>

          <section className="section how primary">
            <HowItsWork />
          </section>

          <section className="section testimonial primary">
            <Testimonials />
          </section>

          <section className="section conversion primary mt-md-5 pt-md-5">
            <div className="container">
              <div className="conversion-text">
                <div className="title">
                  <h3>
                    Pradėkite <span>savo namų</span> remontus
                    <br />
                    jau dabar
                  </h3>
                </div>
              </div>
              <div className="conversion-button">
                <div className="button mb-2">
                  <a className="btn btn-block btn-conversion">
                    <CreateJobForm label="Paskelbti darbą" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="section guarantee primary">
            <Guarantee />
          </section>

          <section className="section builder primary">
            <Builder />
          </section>

          <section className="section conversion secondary">
            <div className="container">
              <div className="section-wrapper">
                <div className="conversion-text">
                  <div className="title">
                    <h3>
                      Pradėkite savo namų remontus
                      <br />
                      jau dabar
                    </h3>
                  </div>
                </div>
                <div className="conversion-button">
                  <div className="button">
                    <a className="btn btn-block btn-conversion">
                      <CreateJobForm label="paskelbti darbą" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section article-list primary">
            <ArticleList />
          </section>

          <section className="section conversion tertiary">
            <ConversationTertiary />
          </section>
        </div>
      </div>
    </div>
  );
};

export default container(Home);
