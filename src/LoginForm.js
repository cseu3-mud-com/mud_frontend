import React from "react";
import useForm from "./CustomHooks";

const LoginForm = () => {
  const login = () => {
    alert("Login Successful");
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(login);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password1"
          onChange={handleInputChange}
          value={inputs.password1}
        />
      </div>
      <div>
        <label>Re-enter Password</label>
        <input
          type="password"
          name="password2"
          onChange={handleInputChange}
          value={inputs.password2}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
