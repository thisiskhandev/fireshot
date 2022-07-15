import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import axios from 'src/config/axios.config';

import { Error, Success } from '../messages/messages';

export const AddPortfolio = (props) => {
  const { user } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  /********************************************************** SUbmit Events *************************************************************/
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('portfolioTitle', title);
    data.append('file', image);
    await axios
      .post(`/api/users/portfolio/update/${user._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          props.update();
          Success(res.data.successMessage);
        } else {
          setLoading(false);
          Error(res.data.errorMessage);
        }
      });
  };

  return (
    <div>
      <PlusCircleOutlined className="fs-1" onClick={showModal} />
      <Modal
        title="Post Portfolio"
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <form className="portfolio-form">
          <div className="floating-label-group">
            <label htmlFor="Portfolio Image">Portfolio Image</label> <br />
            <input
              placeholder="portfolio-image"
              required
              name="file"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="floating-label-group">
            <label htmlFor="Portfolio">Portfolio Title</label>
            <Input
              required
              name="portfolioTitle"
              size="small"
              placeholder="Insert your Portfolio Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Button
            loading={loading}
            onClick={submitHandler}
            className="btn w-100 mt-2"
            style={{
              background: '#00334E',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};
