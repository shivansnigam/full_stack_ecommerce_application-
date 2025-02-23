import React from "react";
import styled, { keyframes } from "styled-components";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  margin: 3rem auto;
  padding: 3rem;
  max-width: 1200px;
  background-color: #f0f2f5;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const Col = styled.div`
  flex: ${(props) => (props.size ? props.size : 1)};
  padding: 1rem;
  
`;

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }

  .admin-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;

    .label {
      font-weight: bold;
      margin-right: 0.5rem;
    }

    .value {
      color: #555;
    }
  }
`;

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
    <Container>
      <Row>
        <Col size={1}>
          <AdminMenu />
        </Col>
        <Col size={3}>
          <Card>
            <h3>Admin Profile</h3>
            <div className="admin-info">
              <span className="label">Admin Name:</span>
              <span className="value">{auth?.user?.name}</span>
            </div>
            <div className="admin-info">
              <span className="label">Admin Email:</span>
              <span className="value">{auth?.user?.email}</span>
            </div>
            <div className="admin-info">
              <span className="label">Admin Contact:</span>
              <span className="value">{auth?.user?.phone}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default AdminDashboard;
