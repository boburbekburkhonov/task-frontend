import React from 'react';
import './Signup.css'

const Signup = () => {

  const signUp = (e) => {
    e.preventDefault();
    const { firstName, lastName, password } = e.target;

    fetch("http://localhost:9090/users/sign", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
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

    firstName.value = "";
    lastName.value = "";
    password.value = "";
  };

  return (
    <div>
      <div className="button-wrapper">
        <a href="/login" className="button-login">
          Log in
        </a>
      </div>
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <form
        className="card form-control d-flex justify-content-center align-items-center"
        onSubmit={signUp}
      >
        <div>
          <img
            className="user-img"
            src="https://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"
            alt="user"
            width="250"
            height="150"
          />
        </div>
        <label className="h3 m-0">First name:</label>
        <br />
        <input
          className="form-control m-0"
          placeholder="First name..."
          type="text"
          name="firstName"
          required
        />
        <br />
        <label className="h3 m-0">Last name:</label>
        <br />
        <input
          className="form-control m-0"
          placeholder="Last name..."
          type="text"
          name="lastName"
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
        <button className="button m-0">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;