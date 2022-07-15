import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Input, message, Row, Button } from 'antd';
import { Helmet } from 'react-helmet';

import axios from 'src/config/axios.config';

import '../Auth.css';

const ForgotPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();

  const handleChange = (e) => {
    setEmail(e.target.value);
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
      .post('/api/users/forgotpassword', { email })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          success(res.data.successMessage);
        } else {
          setLoading(false);
          error(res.data.errorMessage);
        }
      })
      .catch((err) => {
        error(err.errorMessage);
      });
  };

  return (
    <div style={{ background: 'rgba(0,0,0, 0.5)' }}>
      <Helmet>
        <title>Pamiršote slaptažodį</title>
      </Helmet>
      <div className="main-login" style={{ background: 'rgba(0,0,0, 0.2)' }}>
        <div className="login-inner">
          <Row wrap={false} className="login-wrapper container ">
            <Col className="login-left ">
              <img
                src="assets/images/Login.png"
                alt="pic"
                className="w-100"
                style={{ height: '489px' }}
              />
            </Col>
            <Col className="login-right">
              <div>
                <div className="text-center">
                  <Link to="/">
                    <img
                      src="assets/images/logo-navbar.png"
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
                    Atstatyti slaptažodį{' '}
                  </p>
                </div>
                <form onSubmit={onFinish}>
                  <div className="floating-label-group mb-4">
                    <label
                      htmlFor="name"
                      className="ml-0 mb-2"
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                      el. paštas
                    </label>
                    <Input
                      name="email"
                      onChange={handleChange}
                      size="small"
                      required
                      placeholder="įveskite el. paštą"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn  w-100"
                    onClick={onFinish}
                    loading={loading}
                    style={{
                      background: '#00334E',
                      height: '40px',
                      color: 'white',
                      borderRadius: '4px'
                    }}
                  >
                    pateikti
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

export default ForgotPassword;
