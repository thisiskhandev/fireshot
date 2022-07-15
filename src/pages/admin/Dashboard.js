import React from "react";

export const Dashboard = () => {
  return (
    <div className="dashboard bg-light p-4 px-5" style={{ height: "100%" }}>
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
          <h6>€2550</h6>
          <img src="/assets/images/Dashboard/Card.png" />
        </div>
      </div>
      {/* <div className = 'boxes' style = {{display: 'flex'}}>
                 <div className = 'left-blue'>
                    <p>Monthly Account View</p>
                    <h6>25500</h6>
                    <img src = '/assets/images/Dashboard/Eye.png'/>
                    <img className = 'circle' src = '/assets/images/Dashboard/Circle.png'/>
                 </div>
                 <div className = 'middle-purple'>
                    <p>Monthly Order</p>
                    <h6>25</h6>
                    <img src = '/assets/images/Dashboard/Pen.png'/>
                 </div>
                 <div className = 'right-yellow'>
                    <p>Monthly Revenue</p>
                    <h6>€2550</h6>
                    <img src = '/assets/images/Dashboard/Card.png'/>
                 </div>
                 
             </div> */}

      <div className="mt-4" style={{ display: "flex" }}>
        <div className="left-box">
          <div>
            <div>
              <p
                className="mt-3 ml-4 pl-2 mb-0"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                Recent Activities
              </p>
              <p
                className="ml-4 pl-2"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                A list of a recent activities of your account
              </p>
            </div>
            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>12 Nov 2023</p>
              </div>
              <div className="svgs-area">
                <img src="/assets/images/Dashboard/Green.png" />
              </div>
              <div className="notifications">
                <h6>New orders are made</h6>
                <p>Customer made an order</p>
              </div>
            </div>
            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>01 Nov 2023</p>
              </div>
              <div
                className="svgs-area"
                style={{ background: "rgba(242, 182, 13, 1)" }}
              >
                <img src="/assets/images/Dashboard/Yellow.png" />
              </div>
              <div className="notifications">
                <h6>Payment are cleared</h6>
                <p>Your order payment is cleared</p>
              </div>
            </div>

            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>25 Oct 2023</p>
              </div>
              <div className="svgs-area ml-0">
                <img src="/assets/images/Dashboard/Green.png" />
              </div>
              <div className="notifications">
                <h6>New orders are made</h6>
                <p>Customer made an order</p>
              </div>
            </div>
            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>07 Oct 2023</p>
              </div>
              <div className="svgs-area">
                <img src="/assets/images/Dashboard/Green.png" />
              </div>
              <div className="notifications">
                <h6>Payment are cleared</h6>
                <p>Customer made an order</p>
              </div>
            </div>
            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>01 Oct 2023</p>
              </div>
              <div className="svgs-area">
                <img src="/assets/images/Dashboard/Green.png" />
              </div>
              <div className="notifications">
                <h6>Payment are cleared</h6>
                <p>Customer made an order</p>
              </div>
            </div>
            <div className="flex" style={{ display: "flex" }}>
              <div className="time">
                <p>12 Nov 2023</p>
              </div>
              <div
                className="svgs-area"
                style={{ background: "rgba(242, 182, 13, 1)" }}
              >
                <img src="/assets/images/Dashboard/Yellow.png" />
              </div>
              <div className="notifications">
                <h6>Payment are cleared</h6>
                <p>Your order payment is cleared</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-box p-4 ml-4">
          <div>
            <p className="mb-0" style={{ fontSize: "15px", fontWeight: "500" }}>
              Order Status
            </p>
            <p style={{ fontSize: "14px", fontWeight: "400" }}>
              A list of that display the status of the past and current orders
            </p>
            <input
              className="pl-3 mb-4"
              placeholder="Search"
              style={{
                background: "#F5F6F8",
                borderRadius: "8px",
                width: "221px",
                height: "30px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            />
          </div>

          <table class="table table-borderless">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Invoices</th>
                <th scope="col">Customer</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td style={{ color: "rgba(60, 193, 59, 1)" }}>Done</td>
              </tr>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td style={{ color: "rgba(239, 119, 30, 1)" }}>On Progess</td>
              </tr>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td>Done</td>
              </tr>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td style={{ color: "rgba(240, 55, 56, 1)" }}>Cancelled</td>
              </tr>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td>Done</td>
              </tr>
              <tr>
                <td>#878789</td>
                <td>Daniel</td>
                <td>New York</td>
                <td>20€</td>
                <td>Done</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
