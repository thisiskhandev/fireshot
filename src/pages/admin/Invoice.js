import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Search from "antd/lib/transfer/search";
import React from "react";
import { Link } from "react-router-dom";

export const Invoice = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div className="invoices bg-light p-4 px-5" style={{ height: "100vh" }}>
      <div className="row boxes">
        <div className="left-blue col-md-3 col-sm-6 mb-4">
          <p>Monthly Account View</p>
          <h6>25500</h6>
          <img src="/assets/images/Dashboard/Eye.png" />
          <img className="circle" src="/assets/images/Dashboard/Circle.png" />
        </div>
        <div className="middle-purple col-md-3 col-sm-6 mb-4">
          <p>Monthly Order</p>
          <h6>25</h6>
          <img src="/assets/images/Dashboard/Pen.png" />
        </div>
        <div className="right-yellow col-md-3 col-sm-6">
          <p>Monthly Revenue</p>
          <h6>€ 2550</h6>
          <img src="/assets/images/Dashboard/Card.png" />
        </div>
      </div>
      <div className="mt-5 bottom-section">
        <h5>Invoice</h5>
        <p className="fs-5">A list of all the invoices</p>
        <Search
          placeholder="Search here..."
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <table class="table table-borderless mt-4">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Invoices</th>
              <th scope="col">Customer</th>
              <th scope="col">Location</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td style={{ color: "rgba(60, 193, 59, 1)" }}>Done</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td style={{ color: "rgba(239, 119, 30, 1)" }}>On Progess</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td>Done</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td style={{ color: "rgba(240, 55, 56, 1)" }}>Cancelled</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td>Done</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
            <tr>
              <td>#878789</td>
              <td>Daniel</td>
              <td>New York</td>
              <td>20€</td>
              <td>Done</td>
              <td>
                <Link>Download</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
