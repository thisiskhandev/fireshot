import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Input, message, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import container from './Login.container';

import '../Auth.css';

const Login = (props) => {
  const {
    auth: { loading },
    onSigninStart
  } = props;

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const onFinish = async () => {
    window.scrollTo(0, 0);

    onSigninStart(
      {
        email,
        password
      },
      () => {
        props.history.push('/');
      }
    );
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />
  );

  return (
    <div style={{ background: 'rgba(0,0,0, 0.5)' }}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="main-login" style={{ background: 'rgba(0,0,0, 0.2)' }}>
        <div className="login-inner">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '200px'
              }}
            >
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <>
              <Row wrap={false} className="login-wrapper container ">
                <Col className="login-left ">
                  <img
                    src="assets/images/Login.png"
                    alt="pic"
                    className="w-100"
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
                        Sveiki sugrįžę
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
                          placeholder="įveskite el. paštą"
                        />
                      </div>
                      <div className="floating-label-group">
                        <label
                          htmlFor="name"
                          className="ml-0 mb-2"
                          style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                          slaptažodis
                        </label>
                        <Input.Password
                          name="password"
                          type="password"
                          onChange={handleChange}
                          size="small"
                          placeholder="įveskite slaptažodį"
                        />
                      </div>
                      <span>
                        <label
                          className="form-check-label float-left mt-3 ml-4"
                          style={{ color: '#00334E', fontWeight: '600' }}
                        >
                          <input
                            className="form-check-input mr-2"
                            type="checkbox"
                          />{' '}
                          <span>Prisiminti įrenginį</span>
                        </label>
                      </span>
                      <span className="float-right mt-3">
                        <Link
                          to="/forgot-password"
                          className="pass"
                          style={{ color: '#00334E', fontWeight: '600' }}
                        >
                          Pamiršote slaptažodį?
                        </Link>
                      </span>

                      <button
                        type="submit"
                        className="btn mt-5 w-100"
                        style={{
                          padding: '13px',
                          background: '#00334E',
                          color: 'white',
                          borderRadius: '4px'
                        }}
                      >
                        prisijungti
                      </button>
                    </form>
                    <div className="mt-2 text-center">
                      <p>
                        neturiu paskyros?{' '}
                        <Link
                          to="/signup"
                          style={{ color: '#00334E', fontWeight: '631' }}
                        >
                          registracija
                        </Link>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default container(Login);
