import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

    function onClickDelete() {
      axios
      .request({
        method: "POST",
        url: "/api/delete",
      })
      .then((res) => {
          return navigate("/");
      });
    }

    function logout() {
      axios
      .request({
        method: "POST",
        url: "/auth/logout",
      })
      .then((res) => {
          return navigate("/");
      });
    }
  return (
    <>
      <a className="d-block btn btn-danger my-2" href="/update">
        Update
      </a>
      <button className="d-block w-100 btn btn-danger my-2" onClick={logout}>
        Logout
      </button>
      <button className="d-block w-100 btn btn-danger my-2" onClick={onClickDelete}>
        Delete
      </button>
    </>
  );
}
