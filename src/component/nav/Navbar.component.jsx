import React from 'react';
import { useHistory } from 'react-router';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { CreateJobForm } from '../forms/CreateJobForm';

import container from './Navbar.container';

const Navbar = (props) => {
  const history = useHistory();

  const {
    auth: { isAuthenticated, currentUser },
    logout
  } = props;

  const homeWorkMenu = (
    <Menu style={{ padding: '10px' }}>
      <Menu.Item key="0">
        <Link to="/about-us">Apie mus</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/contact-us">Kontaktai</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/support">Pagalba</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/find-job">Rasti paslaugų teikėją</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/find-builders">Rasti statybininką ar remontininką</Link>
      </Menu.Item>
    </Menu>
  );

  const tradeMembersMenu = (
    <Menu style={{ padding: '10px' }}>
      <Menu.Item key="0">
        <Link to="/signup">Užregistruoti savo paslaugas</Link>
      </Menu.Item>
    </Menu>
  );

  const signMenu = (
    <Menu style={{ padding: '10px' }}>
      <Menu.Item key="0">
        <Link to="/find-job">Rasti darbą</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={'/profile/' + currentUser._id}>profilis</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user/jobs">paskelbti darbai</Link>
      </Menu.Item>
      {currentUser.role === 'Admin' && (
        <Menu.Item key="3">
          <Link to="/admin">prietaisų skydelis</Link>
        </Menu.Item>
      )}
      <Menu.Item key="1">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logout(() => {
              history.push('/');
            });
          }}
        >
          atsijungti
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <nav className="navbar navbar-primary navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand ml-md-5 pl-md-5" to="/">
            <img alt="logo" src="/assets/images/logo-navbar.png" />
          </Link>
          <button
            className="navbar-toggler btn"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-primary mr-md-5 pr-md-5">
              <li className="nav-item dropdown">
                <Dropdown overlay={homeWorkMenu}>
                  <a
                    className="nav-link for-dropdown"
                    id="navbarHomeownerDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Namų
                    <br />
                    savininkams
                  </a>
                </Dropdown>
              </li>
              <li className="nav-item dropdown">
                {!isAuthenticated && (
                  <Dropdown overlay={tradeMembersMenu}>
                    <a
                      className="nav-link for-dropdown"
                      id="navbarTradememberDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Statybininkams ir <br />
                      remontininkams
                    </a>
                  </Dropdown>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <Dropdown overlay={signMenu}>
                    <a
                      className="nav-link for-dropdown"
                      id="navbarTradememberDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {currentUser.name}
                    </a>
                  </Dropdown>
                ) : (
                  <Link to="/login" className="nav-link">
                    Prisijungti
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <CreateJobForm label="Paskelbti darbą" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default container(Navbar);
