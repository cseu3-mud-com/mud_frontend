import { useState } from "react";

const useForm = callback => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    password1: "",
    password2: "",
    email: "",
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = event => {
    const { name, value } = event.target; 
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useForm;
