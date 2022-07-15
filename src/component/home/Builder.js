import React, { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";

import axios from "../../config/axios.config";

import { Error } from "../messages/messages";

export const Builder = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [title, setTitle] = useState("");

  const getAllJobsMainCategories = async () => {
    await axios.get("/api/categories/jobs/main/get").then((res) => {
      if (res.status === 200) {
        setMainCategories(res.data);
        getSubCategories(res.data[0] && res.data[0]);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  const getSubCategories = async (cat) => {
    setTitle(cat.name);
    await axios
      .get(`/api/categories/jobs/get/sub-categories/${cat._id}`)
      .then((res) => {
        if (res.status === 200) {
          setSubCategories(res.data);
          // setTitle(cat.name);
          console.log(res.data);
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  useEffect(() => {
    getAllJobsMainCategories();
    return () => {};
  }, []);

  return (
    <div className="container">
      <div className="builder-header">
        <div className="header-text">
          <div className="title">
            <h3>Plataus profilio statybininkai</h3>
          </div>
        </div>
      </div>

      <div className="builder-content">
        <div className="row">
          <div className="col-content-outer col-12 col-md-12 col-lg-11">
            <div className="content-tab">
              {mainCategories.length > 0 && (
                <Pagination
                  mainCategories={mainCategories}
                  getSubCategories={getSubCategories}
                />
              )}
              <div
                className="tab-content d-flex justify-content-center mt-4 "
                id="pills-tabContent-primary"
              >
                <div
                  className="tab-pane fade show active"
                  id="pills-primary-one"
                  role="tabpanel"
                  aria-labelledby="pills-primary-one-tab"
                >
                  <div className="content-text">
                    <div className="title">
                      <h3>{title}</h3>
                    </div>
                  </div>
                  <div className="content-link">
                    {subCategories.length > 0 &&
                      subCategories.map((subCat) => {
                        return (
                          <div className="link">
                            <a className="link-content" href="#">
                              {subCat.name}
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-primary-two"
                  role="tabpanel"
                  aria-labelledby="pills-primary-two-tab"
                >
                  <div className="content-text">
                    <div className="title">
                      <h3>Stogdengys</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-primary-three"
                  role="tabpanel"
                  aria-labelledby="pills-primary-three-tab"
                >
                  <div className="content-text">
                    <div className="title">
                      <h3>Grindų montuotojas</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-primary-four"
                  role="tabpanel"
                  aria-labelledby="pills-primary-four-tab"
                >
                  <div className="content-text">
                    <div className="title">
                      <h3>Plytelių klojėjas</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-primary-five"
                  role="tabpanel"
                  aria-labelledby="pills-primary-five-tab"
                >
                  <div className="content-text">
                    <div className="title">
                      <h3>Betonuotojas</h3>
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
