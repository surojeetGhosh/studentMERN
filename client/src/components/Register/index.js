import React from "react";
import axios from "axios";

export default function Register() {
  const [formData, changeData] = React.useState({
    roll: "",
    firstName: "",
    lastName: "",
    password: "",
    repassword: "",
    contact: "",
  });
  const [error, setError] = React.useState({
    error: true,
    msg: "",
  });

  function onChange(e) {
    changeData({ ...formData, [e.target.id]: e.target.value });
  }

  function isEmpty() {
    for (var i in formData) {
      if (formData[i] === "") return true;
    }
    return false;
  }
  function onSubmit(e) {
    e.preventDefault();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (isEmpty()) {
      setError({
        error: true,
        msg: "Empty fields !!!",
      });
    } else if (!Number(formData.roll)) {
      setError({
        error: true,
        msg: "Roll number should be number values",
      });
    } else if (!formData.password.match(regex)) {
      setError({
        error: true,
        msg: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    } else if (formData.password !== formData.repassword) {
      setError({
        error: true,
        msg: "Password is not confirmed correctly",
      });
    } else if (!Number(formData.contact) || formData.contact.length !== 10) {
      setError({
        error: true,
        msg: "Contact number should contain number only and contain 10 digits",
      });
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/register",
          data: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.keyValue) {
            setError({
              error: true,
              msg: "Roll number already exists",
            });
          } else {
            setError({
              error: true,
              msg: "Registered",
            });
            changeData({
              roll: "",
              firstName: "",
              lastName: "",
              password: "",
              repassword: "",
              contact: "",
            })
          }
        });
    }
  }
  return (
    <div className="w-50 m-auto bg-light rounded p-5 shadow mb-4">
      <form onSubmit={onSubmit}>
        <div class="row mb-4">
          <div class="form-outline mb-4">
            <input
              type="text"
              id="roll"
              name="roll"
              value={formData.roll}
              onChange={onChange}
              class="form-control"
            />
            <label class="form-label" for="roll">
              Roll
            </label>
          </div>
          <div class="form-outline">
            <input
              type="text"
              id="firstName"
              name="firstName"
              class="form-control"
              value={formData.firstName}
              onChange={onChange}
            />
            <label class="form-label" for="firstName">
              First name
            </label>
          </div>
          <div class="form-outline">
            <input
              type="text"
              id="lastName"
              name="lastName"
              class="form-control"
              value={formData.lastName}
              onChange={onChange}
            />
            <label class="form-label" for="lastName">
              Last name
            </label>
          </div>
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            value={formData.password}
            onChange={onChange}
          />
          <label class="form-label" for="password">
            Password
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            id="repassword"
            name="repassword"
            class="form-control"
            value={formData.repassword}
            onChange={onChange}
          />
          <label class="form-label" for="password">
            Confirm Password
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="text"
            id="contact"
            name="contact"
            class="form-control"
            value={formData.contact}
            onChange={onChange}
          />
          <label class="form-label" for="contact">
            Phone
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block w-100 mb-4">
          Register
        </button>
        <a href="/login" class="btn btn-primary w-100 mb-4">
          Login
        </a>
        {error.error ? <p className="text-center">{error.msg}</p> : null}
      </form>
    </div>
  );
}
