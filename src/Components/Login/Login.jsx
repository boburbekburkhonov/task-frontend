import React from 'react';
import './Login.css'

const Login = () => {

  const loginChecker = (e) => {
    e.preventDefault();
    const { name, password } = e.target;

    fetch("http://localhost:9090/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          window.localStorage.setItem("token", data.access_token);
          window.location.href = "/user/interface";
        } else if (data.status == 400) {
          alert(data.message);
        }
      });

    name.value = "";
    password.value = "";
  };

  return (
    <div>
      <div className="button-wrapper">
        <a href="/" className="button-login">
          Sign up
        </a>
      </div>
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <form
        className="card form-control d-flex justify-content-center align-items-center"
        onSubmit={loginChecker}
      >
        <div>
          <img
            className="user-img"
            src="https://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"
            alt="user"
            width="280"
            height="170"
          />
        </div>
        <label className="h3 m-0">Name:</label>
        <br />
        <input
          className="form-control m-0 w-100"
          placeholder="Name..."
          type="text"
          name="name"
          required
        />
        <br />
        <label className="h3 m-0">Password:</label>
        <br />
        <input
          className="form-control m-0"
          placeholder="Password..."
          type="password"
          name="password"
          required
        />
        <br />
        <p>
          <a href="#">forget password</a>
        </p>
        <button className="button m-0">Log in</button>
      </form>
    </div>
  );
};

export default Login;