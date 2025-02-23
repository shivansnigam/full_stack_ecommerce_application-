import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Layout from "../../components/Layout/Layout";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
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
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 767px) {
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  flex: ${(props) => (props.size ? props.size : 1)};
  padding: 1rem;

  @media (max-width: 767px) {
    padding: 0;
  }
`;

const Card = styled.div`
  width: 100%;
  padding: 3rem;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 auto;
    padding: 1.5rem;
  }

  h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;

      @media (max-width: 767px) {
        padding: 0.5rem;
      }
    }
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0.2rem 0;

    &.btn-primary {
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }

    &.btn-danger {
      background-color: #dc3545;
      color: #fff;

      &:hover {
        background-color: #c82333;
      }
    }

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;

 

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://full-stack-ecommerce-application-eight.vercel.app/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName(''); // Clear the input field
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://full-stack-ecommerce-application-eight.vercel.app/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://full-stack-ecommerce-application-eight.vercel.app/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://full-stack-ecommerce-application-eight.vercel.app/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
    <Container>
      <Row>
        <Col size={1}>
          <AdminMenu />
        </Col>
        <Col size={3}>
          <Card>
            <h1>Manage Category</h1>
            <div className="p-3 w-100">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-100">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default CreateCategory;
