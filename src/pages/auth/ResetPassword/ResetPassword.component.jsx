import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Input, message, Row } from 'antd';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import axios from 'src/config/axios.config';

import '../Auth.css';

const ResetPassword = (props) => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: null,
    confirm: null
  });

  const { confirm, password } = passwordData;

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const success = (msg) => {
    message.success({
      content: msg,
      className: 'custom-class',
      style: {
        position: 'absolute',
        top: '15vh',
        right: '0px'
      }
    });
  };
  const error = (msg) => {
    message.error({
      content: msg,
      className: 'custom-class',
      style: {
        position: 'absolute',
        top: '15vh',
        right: '0px'
      }
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setLoading(true);

    await axios
      .put(`/api/auth/resetpassword/${token}`, {
        password: passwordData.password
      })
      .then((res) => {
        setLoading(false);
        success(res.data.successMessage);
        props.history.push('/login');
      })
      .catch((err) => {
        setLoading(false);
        error(err.message);
      });
  };

  return (
    <div style={{ background: 'rgba(0,0,0, 0.5)' }}>
      <Helmet>
        <title>Atstatyti slaptažodį </title>
      </Helmet>
      <div className="main-login" style={{ background: 'rgba(0,0,0, 0.2)' }}>
        <div className="login-inner">
          <Row wrap={false} className="login-wrapper container ">
            <Col className="login-left ">
              <img
                src="../assets/images/Login.png"
                alt="pic"
                className="w-100"
              />
            </Col>
            <Col className="login-right">
              <div>
                <div className="text-center">
                  <Link to="/">
                    <img
                      src="../assets/images/logo-navbar.png"
                      alt="logo"
                      style={{ fontSize: '400px', width: '200px' }}
                    />
                  </Link>
                  <p
                    className="my-5"
                    style={{
                      fontSize: '36px',
                      lineHeight: '2.4rem',
                      fontWeight: '700',
                      color: '#00334E, 100%',
                      fontStyle: 'Airbnb Cereal App'
                    }}
                  >
                    Sveiki sugrįžę
                  </p>
                </div>
                <form onSubmit={onFinish}>
                  <div className="floating-label-group mb-4">
                    <label
                      htmlFor="password"
                      className="ml-0 mb-2"
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                      Naujas slaptažodis
                    </label>
                    <Input.Password
                      name="password"
                      onChange={handleChange}
                      size="small"
                      type="password"
                      required={true}
                      placeholder="įveskite slaptažodį"
                    />
                  </div>
                  <div className="floating-label-group">
                    <label
                      htmlFor="confirm"
                      className="ml-0 mb-2"
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                      Patvirtinti slaptažodį
                    </label>
                    <Input.Password
                      name="confirm"
                      type="password"
                      required
                      onChange={handleChange}
                      size="small"
                      placeholder="įveskite slaptažodį"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn mt-5 w-100"
                    onClick={onFinish}
                    loading={loading}
                    style={{
                      background: '#00334E',
                      color: 'white',
                      borderRadius: '4px',
                      height: '40px'
                    }}
                  >
                    prisijungti
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
