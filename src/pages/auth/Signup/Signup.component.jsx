import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Col, message, Select, Spin } from 'antd';
import { Option } from 'antd/lib/mentions';
import { LoadingOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import container from './Signup.container';

import '../Auth.css';

const Signup = (props) => {
  const {
    auth: { loading },
    onSignupStart
  } = props;

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    role: 'Client'
  });

  const { fullName, email, password, phone, role } = userData;

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  function handleChange(value) {
    setUserData({
      ...userData,
      role: value
    });
  }

  const onFinish = async (e) => {
    let agreement;
    if (document.getElementById('checkbox').checked) {
      agreement = true;
    } else {
      agreement = false;
    }
    window.scrollTo(0, 0);
    onSignupStart(
      {
        fullName,
        email,
        password,
        phone,
        agreement,
        role
      },
      () => {
        setTimeout(() => {
          props.history.push('/login');
        }, 2000);
      }
    );
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />
  );

  return loading ? (
    <div className="text-center fixed-top" style={{ marginTop: '50vh' }}>
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Signup</title>
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
              <div>
                <Row wrap={false} className="login-wrapper container">
                  <Col className="login-left">
                    <img
                      src="assets/images/Signup.png"
                      alt="pic"
                      className="w-100 img"
                      height="843"
                    />
                  </Col>
                  <Col
                    className="login-right"
                    style={{
                      padding: '23px',
                      paddingTop: '80px',
                      paddingBottom: '80px'
                    }}
                  >
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
                          className="my-5 welcome"
                          style={{
                            fontSize: '36px',
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
                            Elektroninis paštas
                          </label>
                          <Input
                            required={true}
                            name="email"
                            onChange={handleInputChange}
                            size="small"
                            placeholder="Įrašykite elektroninio pašto adresą"
                          />
                        </div>
                        <div className="floating-label-group mb-4">
                          <label
                            htmlFor="name"
                            className="ml-0 mb-2"
                            style={{ fontSize: '16px', fontWeight: '500' }}
                          >
                            Slaptažodis
                          </label>
                          <Input.Password
                            required={true}
                            name="password"
                            type="password"
                            onChange={handleInputChange}
                            size="small"
                            placeholder="Įrašykite slaptažodį"
                          />
                        </div>
                        <div className="floating-label-group mb-4">
                          <label
                            htmlFor="fullName"
                            className="ml-0 mb-2"
                            style={{ fontSize: '16px', fontWeight: '500' }}
                          >
                            Vardas / įmonės pavadinimas
                          </label>
                          <Input
                            required={true}
                            name="fullName"
                            type="text"
                            onChange={handleInputChange}
                            size="small"
                            placeholder="Vardas / įmonės pavadinimas"
                          />
                        </div>
                        <div className="floating-label-group mb-1">
                          <label
                            htmlFor="name"
                            className="ml-0 mb-2"
                            style={{ fontSize: '16px', fontWeight: '500' }}
                          >
                            Telefono numeris
                          </label>
                          <Input
                            required={true}
                            name="phone"
                            type="Number"
                            onChange={handleInputChange}
                            size="small"
                            placeholder="Įrašykite kontaktinį telefono numerį"
                          />
                        </div>
                        <div className="floating-label-group mt-3 mb-1">
                          <Select
                            placeholder="Please Select"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            defaultValue="Client"
                            name="role"
                          >
                            <Option value="Client">klientas</Option>
                            <Option value="Builder">statytojas</Option>
                          </Select>
                        </div>
                        <span>
                          <label
                            className="form-check-label float-left mt-3 ml-4"
                            style={{ color: '#00334E', fontWeight: '600' }}
                          >
                            <input
                              className="form-check-input mr-2"
                              id="checkbox"
                              type="checkbox"
                            />
                            <span>Sutinku su taisyklėmis</span>
                          </label>
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
                          Registruotis
                        </button>
                      </form>
                      <div className="mt-2 text-center">
                        <p>
                          <Link
                            to="/login"
                            style={{ color: '#00334E', fontWeight: '631' }}
                          >
                            Jau turite paskyrą ?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default container(Signup);
