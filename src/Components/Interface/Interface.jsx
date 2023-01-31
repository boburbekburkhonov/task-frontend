import React, { useEffect, useState } from "react";
import "./Interface.css";
import { Link } from "react-router-dom";

const Interface = () => {
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);

  const token = window.localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    fetch("http://localhost:9090/user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, [count]);

  const updateUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, password } = e.target;

    fetch("http://localhost:9090/user/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        access_token: token,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCount(count + 1);
        }
      });

    firstName.value = "";
    lastName.value = "";
    password.value = "";
  };

  return (
    <div>
      <aside
        className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left"
        id="show-side-navigation1"
      >
        <i
          className="uil-bars close-aside d-md-none d-lg-none"
          data-close="show-side-navigation1"
        ></i>
        <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
          <img
            className="rounded-pill img-fluid"
            width="65"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
          />
          <div className="ms-2">
            <h5 className="fs-6 mb-0">
              <a className="text-decoration-none text-dark fw-bold h4" href="#">
                {user ? user.first_name : ""}
              </a>
            </h5>
          </div>
        </div>
      </aside>

      <section id="wrapper">
        <nav className="navbar navbar-expand-md mb-4">
          <div className="container-fluid mx-2">
            <div className="navbar-header py-4">
              <img
                className="user-img"
                src="https://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"
                alt="user"
                width="180"
                height="130"
              />

              <h3 className="h2 fw-bold">Shaxsiy kabinet</h3>

              <div className="logout-wrapper" id="logout">
                <img
                  className="logout-img"
                  src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png"
                  alt="logout"
                  width="30"
                  height="30"
                />
                <button
                  onClick={logout}
                  className="logout m-0 text-dark h4 fw-bold ms-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Password</th>
              <th scope="col">O'zgartirish</th>
            </tr>
          </thead>
          <tbody>
            {user ? (
              <tr>
                <th scope="row">1</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn-updated"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/5309/5309792.png"
                      alt="updated"
                      width="50"
                      height="30"
                    />
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  O'zgartirish
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="form-control" onSubmit={updateUser}>
                  <div className="text-center">
                    <img
                      className="user-img"
                      src="https://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"
                      alt="user"
                      width="250"
                      height="150"
                    />
                  </div>
                  <label className="h3 mb-2">First name:</label>
                  <br />
                  <input
                    className="form-control m-0"
                    placeholder="First name..."
                    type="text"
                    name="firstName"
                  />
                  <br />
                  <label className="h3 m-2">Last name:</label>
                  <br />
                  <input
                    className="form-control m-0"
                    placeholder="Last name..."
                    type="text"
                    name="lastName"
                  />
                  <br />
                  <label className="h3 m-2">Password:</label>
                  <br />
                  <input
                    className="form-control m-0"
                    placeholder="Password..."
                    type="password"
                    name="password"
                  />

                  <button className="btn btn-primary mt-4 d-block ms-auto">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interface;
