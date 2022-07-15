import React, { useState } from "react";
import "./pagination.css";

const Pagination = ({ mainCategories, getSubCategories }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mainCategories.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (number) => setCurrentPage(number);

  for (let i = 1; i <= Math.ceil(mainCategories.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="tab-nav">
        <ul className="nav nav-pills" id="pills-tab-primary" role="tablist">
          {currentPosts.map((cat, index) => (
            <li className="nav-item" role="presentation">
              <a
                onClick={() => getSubCategories(cat)}
                className={index === 0 ? "nav-link active" : "nav-link"}
                id="pills-primary-one-tab"
                data-toggle="pill"
                href="#pills-primary-one"
                role="tab"
                aria-controls="pills-primary-one"
                aria-selected="true"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul className="pagination">
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Pagination;
