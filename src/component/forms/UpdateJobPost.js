import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker, Input, Modal, TreeSelect, Select } from 'antd';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

import axios from '../../config/axios.config';

import { Error, Success } from '../messages/messages';

const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { Option } = Select;

export const UpdateJobForm = (props) => {
  const jobId = props.jobId;
  const [job, setJob] = useState({});
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
    getJob();
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

  const uploadFiles = (e) => {
    setFileLoading(true);
    e.preventDefault();
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
      .post(`/api/jobs/update/${jobId}`, {
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
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  const getAllJobsCategories = async () => {
    await axios.get('/api/categories/jobs/get').then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  const getJob = async () => {
    await axios.get(`/api/jobs/get/${jobId}`).then((res) => {
      if (res.status === 200) {
        setJob(res.data);
        setJobData(res.data);
        setJobTags(res.data.tags);
        setMainCatId(res.data.mainCatId);
        setSubCatId(res.data.subCatId);
        setStartDate(res.data.startDate);
        setFilesUrls(res.data.files);
      } else {
        Error(res.data.errorMessage);
      }
    });
  };

  useEffect(() => {
    getAllJobsCategories();
    getJob();
    return () => {};
  }, []);

  console.log(startDate);
  return (
    <>
      <Link className="ml-2" onClick={showModal}>
        <EditOutlined />
        <span className="ml-1">Redaguoti įrašą</span>
      </Link>
      <Modal
        width={1200}
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div>
          <form onSubmit={submitHandler} className="job-form">
            <h2 className="text-center fw-bold">Update Job</h2>
            <div className="mt-5 mt-md-0">
              <label>Add Title For Project:</label>
              <input
                name="title"
                value={title}
                placeholder="Enter title here..."
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Describe your order in details:</label>
              <TextArea
                rows={8}
                name="detail"
                value={detail}
                placeholder="I am looking for..."
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
                <span className="pl-4">Attach Files</span>
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
                {file.length > 0 && (
                  <li>
                    <Button
                      className="btn"
                      loading={fileLoading}
                      onClick={uploadFiles}
                    >
                      Upload Files
                    </Button>
                  </li>
                )}
              </ul>
            </div>
            <hr />
            <div className="row categories">
              <div className="col-md-6">
                <label>Choose A Category</label>
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please Select Category"
                  allowClear
                  value={mainCatId}
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
                <label>Choose A Sub Category</label>
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please Select Sub Category"
                  allowClear
                  onChange={handleSubCategoryChange}
                  treeDefaultExpandAll
                  value={subCatId}
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
                <label>Job Tags</label>
                <Select
                  value={jobTags}
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Write your job tagss"
                  onChange={handleTagsChange}
                >
                  <Option value="React.js">React.js</Option>
                </Select>
              </div>
            </div>
            <hr />
            <div>
              <label>Select a start date to start the project:</label>
              <div className="select">
                <DatePicker
                  value={moment(startDate, 'DD/MM/YYYY')}
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
                <label>What is your budget?</label> <br />
                <input
                  placeholder="€"
                  type="number"
                  value={budget}
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
                  POST JOB
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
