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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
