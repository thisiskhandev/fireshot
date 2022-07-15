import React, { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { Select } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';

import axios from '../../config/axios.config';

import { Error, Success } from '../messages/messages';

const { Option } = Select;

export const UpdateJobsCategories = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState('');

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
    setParentId(props.parentId);
    setName(props.name);
    await axios.get('/api/categories/jobs/main/get').then((res) => {
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
    console.log('object');
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append('name', name);
    if (parentId) {
      data.append('parentId', parentId);
    }
    axios
      .put(`/api/categories/jobs/update/${props.catId}`, data)
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
    <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />
  );

  return loading ? (
    <div className="text-center fixed-top" style={{ marginTop: '50vh' }}>
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div>
      <a onClick={showModal}>
        <EditOutlined />
      </a>
      <Modal
        title="Update Category"
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <form className="text-center create-posts">
          <div>
            {props.parentId && (
              <Select
                showSearch
                // style={{ width: 200 }}
                className="w-100 mb-3"
                placeholder="Select a Category"
                optionFilterProp="children"
                value={parentId}
                onChange={handleSelectChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={name}
              placeholder="Enter Sub Category Title"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={submitHandler}
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
