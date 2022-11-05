import React from "react";
import axios from "axios";

export default function Login() {
  const [formData, changeData] = React.useState({
    roll: "",
    password: "",
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
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/login",
          data: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.data.roll) {
            setError({
              error: true,
              msg: "Login Success",
            });
          } else {
            setError({
              error: true,
              msg: "Incorrect password or username",
            });
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
              class="form-control"
              value={formData.roll}
              onChange={onChange}
            />
            <label class="form-label" for="roll">
              Roll
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
        <button type="submit" class="btn btn-primary w-100 mb-4">
          Login
        </button>
        <a href="/register" class="btn btn-primary w-100 mb-4">
          Register
        </a>
        {error.error ? <p className="text-center">{error.msg}</p> : null}
      </form>
    </div>
  );
}
