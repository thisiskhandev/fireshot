import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Modal, TreeSelect, Select } from 'antd';
import moment from 'moment';

import axios from 'src/config/axios.config';

import { Error, Success } from '../../messages/messages';

import container from './CreateJobForm.container';

const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { Option } = Select;

const CreateJobForm = (props) => {
  const {
    auth: { isAuthenticated }
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [mainCatId, setMainCatId] = useState('');
  const [subCatId, setSubCatId] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState('');
  const [filesUrls, setFilesUrls] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [jobTags, setJobTags] = useState([]);
  const [jobData, setJobData] = useState({
    title: '',
    detail: '',
    budget: ''
  });

  const { title, detail, budget } = jobData;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChange(date, dateString) {
    setStartDate(dateString);
  }

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e) => {
    setFile([...file, e.target.files[0]]);
  };
  const handleRemoveUploadedImage = (name) => {
    setFile((file) => file.filter((item) => item.name !== name.name));
  };

  const handleMainCategoryChange = (value) => {
    setMainCatId(value);
  };
  const handleSubCategoryChange = (value) => {
    setSubCatId(value);
  };

  function handleTagsChange(value) {
    setJobTags(value);
  }

  const uploadFiles = () => {
    setFileLoading(true);
    const data = new FormData();
    for (let f of file) {
      data.append('files', f);
    }
    axios.post('/api/jobs/upload-files', data).then((res) => {
      if (res.status === 200) {
        Success(res.data.successMessage);
        setFilesUrls(res.data.allFiles);
        setFileLoading(false);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post('/api/jobs/post', {
        title,
        detail,
        budget,
        startDate,
        filesUrls,
        mainCatId,
        subCatId,
        jobTags,
        timeOfPost: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
      })
      .then((res) => {
        if (res.status === 200) {
          Success(res.data.successMessage);
          setIsModalVisible(false);
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  const getAllJobsCategories = async () => {
    await axios.get('/api/categories/jobs/get').then((res) => {
      if (res.status === 200) {
        console.log('categories', categories);
        setCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getAllJobsCategories();
    if (file.length > 0 && !fileLoading) {
      uploadFiles();
      console.log('upload files');
    }
  }, [file]);

  return (
    <>
      {props.footer ? (
        isAuthenticated ? (
          <Link
            className="btn btn-block btn-footbar primary"
            onClick={showModal}
          >
            {props.label}
          </Link>
        ) : (
          <Link to="/login" className="btn btn-block btn-footbar primary">
            {props.label}
          </Link>
        )
      ) : props.location === 'navbar' ? (
        isAuthenticated ? (
          <Link onClick={showModal}>{props.label}</Link>
        ) : (
          <Link to="/login">{props.label}</Link>
        )
      ) : isAuthenticated ? (
        <span onClick={showModal} className=" btn btn-block btn-banner primary">
          <Link className="btn btn-block btn-nav text-white">
            {props.label}
          </Link>
        </span>
      ) : (
        <span className=" btn btn-block btn-banner primary">
          <Link to="/login" className="btn btn-block btn-nav text-white">
            {props.label}
          </Link>
        </span>
      )}

      <Modal
        width={1200}
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div>
          <form onSubmit={submitHandler} className="job-form">
            <h2 className="text-center fw-bold">Paskelbti darbą</h2>
            <div className="mt-5 mt-md-0">
              <label>Darbo pavadinimas:</label>
              <input
                name="title"
                placeholder="Įveskite pavadinimą"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Darbo aprašymas:</label>
              <TextArea
                rows={8}
                name="detail"
                placeholder="Aš ieškau žmogaus, kuris galėtų..."
                onChange={handleChange}
              />
            </div>
            <div className="mt-3 upload">
              <label
                className="pl-3 pt-2"
                style={{
                  background: '#DFDFDF',
                  width: '255px',
                  height: '62px',
                  fontSize: '23px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                <i class="fas fa-paperclip"></i>
                <span className="pl-4">Priedai</span>
                <input
                  type="file"
                  name="files"
                  multiple
                  style={{ visibility: 'hidden', height: '10px' }}
                  onChange={handleFileChange}
                />
              </label>
              <ul className="list-unstyled mt-4">
                {file.length > 0
                  ? file.map((pic) => {
                      return (
                        <>
                          <li className="fs-2" key={pic.name}>
                            {pic.name}
                            <a onClick={() => handleRemoveUploadedImage(pic)}>
                              <DeleteOutlined
                                style={{ marginLeft: '10px', color: 'red' }}
                              />{' '}
                            </a>
                          </li>
                        </>
                      );
                    })
                  : null}
                {fileLoading && (
                  <li>
                    <Button className="btn" loading={fileLoading}>
                      Upload Files
                    </Button>
                  </li>
                )}
              </ul>
            </div>
            <hr />
            <div className="row categories">
              <div className="col-md-6">
                <label>Pasirinkti kategoriją</label>
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Prašome pasirinkti kategorija"
                  allowClear
                  onChange={handleMainCategoryChange}
                >
                  {categories.length > 0 &&
                    categories.map((cat) => {
                      return (
                        <>
                          <TreeNode value={cat._id} title={cat.name}></TreeNode>
                        </>
                      );
                    })}
                </TreeSelect>
              </div>
              <div className="col-md-6">
                <label>Pasirinkti rūšį</label>
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Prašome pasirinkti rūšį"
                  allowClear
                  onChange={handleSubCategoryChange}
                  treeDefaultExpandAll
                >
                  {categories.length > 0 &&
                    categories.map((cat) => {
                      return (
                        <>
                          <TreeNode value={cat._id} title={cat.name}>
                            {cat.children &&
                              cat.children.map((subCat) => {
                                return (
                                  <TreeNode
                                    value={subCat._id}
                                    title={subCat.name}
                                  />
                                );
                              })}
                          </TreeNode>
                        </>
                      );
                    })}
                </TreeSelect>
              </div>
              <div className="my-4">
                <label>Raktiniai žodžiai</label>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Parašykite kelis raktinius žodžius"
                  onChange={handleTagsChange}
                >
                  <Option value="React.js">React.js</Option>
                </Select>
              </div>
            </div>
            <hr />
            <div>
              <label>Pasirinkite datą, kada norite pradėti projektą</label>
              <div className="select">
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YY"
                  suffixIcon={<DownOutlined />}
                  onChange={onChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <label>Biudžetas</label> <br />
                <input
                  placeholder="€"
                  type="number"
                  name="budget"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <button
                  disabled={fileLoading}
                  type="submit"
                  className="btn float-right mt-5"
                >
                  Paskelbti darbą
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default container(CreateJobForm);
