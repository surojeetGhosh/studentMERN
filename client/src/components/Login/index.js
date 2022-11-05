import React from "react";

export default function Login() {
  

  return (
    <div className="w-50 m-auto bg-light rounded p-5 shadow mb-4">
      <form>
        <div class="row mb-4">
            <div class="form-outline mb-4">
              <input type="text" id="roll" name="roll" class="form-control" />
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
          />
          <label class="form-label" for="password">
            Password
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block mb-4">
          Login in
        </button>
      </form>
    </div>
  );
}
