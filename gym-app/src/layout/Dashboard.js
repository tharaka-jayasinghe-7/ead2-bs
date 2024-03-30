import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpring, animated } from "react-spring";

const Array = [
  { name: "Tharaka1", age: 25, fee: 2000 },
  { name: "Tharaka2", age: 25, fee: 5000 },
  { name: "Tharaka3", age: 25, fee: 3500 },
];

function Number({ n }) {
  const props = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.div>{props.number.interpolate((n) => n.toFixed(0))}</animated.div>
  );
}

export default function Dashboard() {
  return (
    <div className="container  ">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-10">
          <div className="card border-0 shadow-lg p-3 rounded mt-5">
            <div className="card-header">Dashboard</div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="card text-white bg-dark mb-3 shadow">
                    <div className="card-header">Members</div>
                    <div className="card-body">
                      <h5 className="card-title">Active Members</h5>
                      <p className="card-text">
                        <h2>
                          <Number n={115} />
                        </h2>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card text-white bg-dark mb-3 shadow">
                    <div className="card-header">Trainers</div>
                    <div className="card-body">
                      <h5 className="card-title">Active Trainers</h5>
                      <p className="card-text">
                        <h2>
                          <Number n={8} />
                        </h2>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card text-white bg-dark mb-3 shadow">
                    <div className="card-header">New</div>
                    <div className="card-body">
                      <h5 className="card-title">New Members</h5>
                      <p className="card-text">
                        <h2>
                          <Number n={5} />
                        </h2>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-0 ">
        <div className="col-sm-6 col-md-8">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=3350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="card-img"
            alt="..."
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: -1,
            }}
          />{" "}
        </div>
        <div className="col-6 col-md-4">.col-6 .col-md-4</div>
      </div>
    </div>
  );
}
