import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "../../config/axios.config";

import { CreateJobsCategories } from "../../component/admin/CreateJobCategories";
import { CreateJobsSubCategories } from "../../component/admin/CreateJobSubCategories";
import { UpdateJobsCategories } from "../../component/admin/UpdateJobsCategories";
import { Error, Success } from "../../component/messages/messages";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllJobsCategories = async () => {
    await axios.get("/api/categories/jobs/get").then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getAllJobsCategories();
    return () => {};
  }, []);

  const updateFunction = () => {
    getAllJobsCategories();
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`/api/categories/jobs/delete/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Success(res.data.successMessage);
          getAllJobsCategories();
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  return (
    <div className="container categories">
      {/* Create categories */}
      <div className="d-flex justify-content-end gap-4">
        <div>
          <CreateJobsCategories updateFunction={updateFunction} />
        </div>
        <div>
          <CreateJobsSubCategories updateFunction={updateFunction} />
        </div>
      </div>

      {/* Show categories */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Main Categories</th>
            <th scope="col">Actions</th>
            <th scope="col">Sub-Categories</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((cat, index) => {
              return (
                <>
                  <tr key={cat._id} style={{ borderBottom: "1px solid black" }}>
                    <th>{index + 1}</th>
                    <th scope="col">{cat.name}</th>
                    <th>
                      <Link className="btn" style={{ textDecoration: "none" }}>
                        <UpdateJobsCategories
                          updateFunction={updateFunction}
                          name={cat.name}
                          catId={cat._id}
                        />
                      </Link>
                      {cat.children.length === 0 ? (
                        <button
                          className="btn"
                          onClick={() => deleteHandler(cat._id)}
                        >
                          <DeleteOutlined />
                        </button>
                      ) : null}
                    </th>
                    <table className="table subCat-table">
                      <tbody>
                        {cat.children.length > 0
                          ? cat.children.map((subCat, index) => {
                              return (
                                <tr key={subCat._id}>
                                  <th>{index + 1}</th>
                                  <th>{subCat.name}</th>
                                  <th>
                                    <Link
                                      className="btn"
                                      style={{ textDecoration: "none" }}
                                    >
                                      <UpdateJobsCategories
                                        updateFunction={updateFunction}
                                        name={subCat.name}
                                        parentId={subCat.parentId}
                                        catId={subCat._id}
                                      />
                                    </Link>
                                    {subCat.children.length === 0 ? (
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          deleteHandler(subCat._id)
                                        }
                                      >
                                        <DeleteOutlined />
                                      </button>
                                    ) : null}
                                  </th>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
