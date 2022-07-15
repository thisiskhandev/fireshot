import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';

import axios from 'src/config/axios.config';
import config from 'src/config';

import { isAuthenticated } from 'src/utils/auth';
import { Error, Success } from '../messages/messages';

export const ContactInfo = ({ user, clientId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchInfo = async () => {
    showModal();
    setLoading(true);
    console.log('client id', clientId);
    await axios
      .get(`/api/users/userContactInfo/${clientId}`)
      .then((res) => {
        setLoading(false);
        setContactInfo(res.data);
      })
      .catch((err) => {
        setLoading(false);
        Error(err.response.data.errorMessage);
      });
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />
  );
  return (
    <>
      <button className="btn contact-btn px-2 mr-2" onClick={() => fetchInfo()}>
        susisiekti su klientu
      </button>
      <Modal
        footer={false}
        title="susisiekti su klientu"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : (
          contactInfo && (
            <>
              <h4>kliento informacija</h4>
              <p>
                <span className="fs-5">Telefono numeris:</span> &nbsp;
                <span className="para"> {contactInfo.phone}</span>{' '}
              </p>
              <p>
                <span className="fs-5">El.paštas:</span> &nbsp;
                <span className="para"> {contactInfo.email}</span>{' '}
              </p>
            </>
          )
        )}
      </Modal>
    </>
  );
};
