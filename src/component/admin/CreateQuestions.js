import React, { useEffect, useState } from 'react';
import { Button, message, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Option } from 'antd/lib/mentions';

import axios from '../../config/axios.config';

export const CreateQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [catId, setCatId] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getCategories = async () => {
    await axios.get(`/api/categories/questions/get`).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
        console.log(res.data);
      } else {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: '20vh'
          }
        });
      }
    });
  };

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const onEditCatChange = (value) => {
    setCatId(value);
  };

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append('question', question);
    data.append('answer', answer);
    data.append('parentId', catId);
    axios.post(`/api/questions/create`, data).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '20vh'
          }
        });
      } else {
        message.success({
          content: res.data.errorMessage,
          style: {
            marginTop: '20vh'
          }
        });
      }
    });
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
      <Button onClick={showModal}>Create Questions</Button>
      <Modal
        title="New Subject"
        footer={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <form onSubmit={submitHandler} className="text-center create-posts">
          <Select
            placeholder="Please Select"
            style={{ width: 460 }}
            onChange={onEditCatChange}
          >
            {categories.map((cat) => {
              return <Option value={cat._id}>{cat.name}</Option>;
            })}
          </Select>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              id="question"
              name="question"
              placeholder="Enter Question Title"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              placeholder="Enter Answer"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <button
              type="submit"
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
