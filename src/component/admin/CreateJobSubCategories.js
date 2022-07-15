import React, { useEffect, useState } from "react";
import { Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import axios from "../../config/axios.config";

import { Error, Success } from "../messages/messages";
import { Select } from "antd";

const { Option } = Select;

export const CreateJobsSubCategories = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectChange = (value) => {
    setParentId(value);
  };

  const getAllJobsMainCategories = async () => {
    await axios.get("/api/categories/jobs/main/get").then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getAllJobsMainCategories();
    return () => {};
  }, []);

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", subCategory);
    data.append("parentId", parentId);
    axios
      .post(`/api/categories/jobs/sub/create`, data, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Success(res.data.successMessage);
          props.updateFunction();
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  /************************************************ Loading Icon **********************************************/
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );

  return loading ? (
    <div className="text-center fixed-top" style={{ marginTop: "50vh" }}>
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div>
      <Button
        className="px-4 rounded-pill"
        style={{ background: "#00334e", color: "white" }}
        onClick={showModal}
      >
        Create Sub Category
      </Button>
      <Modal
        title="New Sub Category"
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <form onSubmit={submitHandler} className="text-center create-posts">
          <div>
            <Select
              showSearch
              // style={{ width: 200 }}
              className="w-100 mb-3"
              placeholder="Select a Category"
              optionFilterProp="children"
              onChange={handleSelectChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.length > 0 &&
                categories.map((cat) => {
                  return (
                    <Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              placeholder="Enter Sub Category Title"
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <button
              type="submit"
              size="large"
              className="btn btn-outline-dark w-25"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
