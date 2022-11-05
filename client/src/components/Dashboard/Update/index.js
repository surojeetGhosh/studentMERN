import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [formData, changeData] = React.useState({
    contact: ""
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
    if (isEmpty()) {
      setError({
        error: true,
        msg: "Empty fields !!!",
      });
    } else if (!Number(formData.contact) || formData.contact.length !== 10) {
      setError({
        error: true,
        msg: "Contact number should contain number only and contain 10 digits",
      });
    } else {
      axios.request({
        method: "post",
        url: "/api/update",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(() => {
        return navigate("/dashboard");
      })
    }
  }
  return (
    <div className="w-100 p-4 mt-3 m-auto bg-light rounded shadow mb-4">
      <form onSubmit={onSubmit}>
        <div class="row mb-4">
          <div class="form-outline mb-4">
            <input
              type="text"
              id="contact"
              name="contact"
              class="form-control"
              value={formData.contact}
              onChange={onChange}
            />
            <label class="form-label" for="roll">
              Contact
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-4">
            Update
        </button>
        <a href="/dashboard" class="btn btn-primary w-100 mb-4">
          Go back
        </a>
        {error.error ? <p className="text-center">{error.msg}</p> : null}
      </form>
    </div>
  );
}
