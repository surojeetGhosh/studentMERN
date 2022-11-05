import React, { useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import Update from "./Update";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  const navigate = useNavigate();
  const [data, changeData] = React.useState(null);
  useEffect(() => {
    axios
      .request({
        method: "POST",
        url: "/auth/isAuth",
      })
      .then((res) => {
        if (!res.data.auth) {
          return navigate("/");
        } else {
          changeData(res.data.data);
        }
      });
  });
  
  return (
    <div className="w-50 m-auto bg-light rounded p-5 shadow mb-4">
      <h4 className="text-center mb-3">Details</h4>
      <div className="bg-warning rounded p-5 shadow-lg text-center">
        {data === null ? null : (
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Roll</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{data.roll}</th>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.contact}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {props.isHome ? <Home /> : <Update />}
    </div>
  );
}
