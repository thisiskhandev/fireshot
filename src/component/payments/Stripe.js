import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import StripeCheckout from "react-stripe-checkout";

import axios from "src/config/axios.config";
import config from "src/config";

import { Error, Success } from "../messages/messages";

export const Stripe = (props) => {
  const { user } = props;

  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const chargePayment = async (token) => {
    setLoading(true);
    await axios.post("/api/payments/pay", { token }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        Success(res.data.successMessage);
        setIsModalVisible(false);
        history.push(`/apply/${props.jobId}`);
      } else {
        setLoading(false);
        Error(res.data.errorMessage);
      }
    });
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );
  return (
    <div>
      <button className="btn contact-btn px-2 mr-2" onClick={() => showModal()}>
        susisiekti su klientu
      </button>
      <button className="btn submit-proposal px-4" onClick={() => showModal()}>
        pateikti pasiūlymą
      </button>
      <Modal
        footer={false}
        title="Mokėjimas"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            <h4>
              Sumokėkite * eur, kad galėtumėte pateikti pasiūlymą ir susisiekti
              su klientu
            </h4>
            <div className="text-center my-4">
              <StripeCheckout
                name="MasterUFix Subscription"
                token={chargePayment}
                currency="EUR"
                locale="lt"
                amount={10 * 100}
                stripeKey={config.stripe.publicKey}
              >
                <button className="btn bg-primary w-50 text-white fw-bolder">
                  Sumokėti * eur dabar
                </button>
              </StripeCheckout>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
