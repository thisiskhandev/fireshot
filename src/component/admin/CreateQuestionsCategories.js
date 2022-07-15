import { Button, message, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import axios from '../../config/axios.config';

export const CreateQuestionsCategories = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState('');


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", category);
    axios
      .post(`/api/categories/questions/create`, data
      , {
        headers: {
          authorization: "Bearer " + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: '20vh',
            },
          });
        } else {
          message.success({
            content: res.data.errorMessage,
            style: {
              marginTop: '20vh',
            },
          });
        }
      });
  };


  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );

  return( 
      loading ? 
    <div className="text-center fixed-top" style={{ marginTop: "50vh" }}>
      <Spin indicator={antIcon} />
    </div>
       :
    <div>
        <Button onClick = {showModal}>Create Category</Button>
        <Modal title="New Category" footer = {false} visible={isModalVisible} onCancel={handleCancel}>
      <form onSubmit={submitHandler} className="text-center create-posts">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            placeholder="Enter Category Title"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
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