import axios from "../../config/axios.config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

export const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("payme", payments);
  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    setLoading(true);
    await await axios
      .get("/api/payments/allPayments", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPayments(res.data);
          setLoading(false);
        } else {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: "20vh",
            },
          });
        }
      });
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "##ff3e6c" }} spin />
  );

  return (
    <div
      className="payment-details bg-light p-4 px-5"
      style={{ height: "100vh" }}
    >
      <div className="mt-4 bg-white border border-2 rounded p-3 pr-0">
        <h4 className="ml-1 heading">Payment Details</h4>
        <table className="table table-borderless">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Date</th>
              <th scope="col">Transaction ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Amount</th>
              <th scope="col" className="text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div
                className="text-center fixed-top"
                style={{ marginTop: "50vh" }}
              >
                <Spin indicator={antIcon} />
              </div>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{moment(payment.createdAt).format("MM/DD/YYYY")}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.name}</td>
                  <td>{payment.email}</td>
                  <td>€{payment.amount}</td>
                  <td className="">
                    {payment.status === "succeeded" ? (
                      <Link className="btn btn-success rounded-pill w-100 bg-success">
                        Completed
                      </Link>
                    ) : (
                      <Link
                        className="btn rounded-pill w-100 text-white"
                        style={{ background: "#FB6D3A" }}
                      >
                        Failed
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* <div className="text-center">
          <button className="btn rounded px-5 text-white">View More</button>
        </div> */}
      </div>
    </div>
  );
};
