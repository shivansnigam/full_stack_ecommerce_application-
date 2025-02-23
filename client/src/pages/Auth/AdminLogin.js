import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled components for form styling
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1f4037, #99f2c8);
`;

const LoginForm = styled(motion.form)`
  background: rgba(0, 0, 0, 0.85);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 350px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h4`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffffff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  margin-bottom: 15px;

  &:focus {
    border-color: #007bff;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ForgotPasswordBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginBtn = styled(motion.button)`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://full-stack-ecommerce-application-eight.vercel.app/api/v1/auth/admin-login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/dashboard/admin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <FormContainer>
      <LoginForm
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>ADMIN LOGIN</Title>
        <FormGroup>
          <InputField
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
          />
        </FormGroup>
        <FormGroup>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            required
          />
        </FormGroup>
        <FormGroup>
          <ForgotPasswordBtn onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </ForgotPasswordBtn>
        </FormGroup>
        <LoginBtn
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LOGIN
        </LoginBtn>
      </LoginForm>
    </FormContainer>
  );
};

export default AdminLogin;