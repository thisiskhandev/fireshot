import { Button, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import axios from '../../config/axios.config';

import { Error, Success } from '../messages/messages';

export const CreateJobsCategories = (props) => {
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
      .post(`/api/categories/jobs/main/create`, data
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
          Success(res.data.successMessage);
          props.updateFunction();
        } else {
          Error(res.data.errorMessage)
        }
      });
  };


  /************************************************ Loading Icon **********************************************/
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
        <Button className = 'px-4 rounded-pill' style = {{background: '#00334e', color: 'white'}} onClick = {showModal}>Create Category</Button>
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