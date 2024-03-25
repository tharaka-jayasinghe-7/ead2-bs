export default function AddTrainer() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow mt-5">
          <h2 className="text-center m-4">Register Trainer</h2>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="first_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="last_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <div className="row">
              <div className="col-auto">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    value="male"
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              name="address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="last_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile"
              name="mobile"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              name="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="joined_date" className="form-label">
              Joined Date
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Joined Date"
              name="joined_date"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
