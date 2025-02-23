import React from "react";
import styled from "styled-components";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  max-width: 1200px;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 1rem;
    margin: 1.5rem auto;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 1rem;

  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 1rem;

  h1 {
    background-color: #343a40;
    color: #ffffff;
    padding: 1rem;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
      font-size: 1.3rem;
      color: #007bff;
    }
  }

  @media (max-width: 767px) {
    p {
      font-size: 1rem;
    }
  }
`;

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <ContactContainer>
        <ImageContainer>
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
          />
        </ImageContainer>
        <InfoContainer>
          <h1>CONTACT US</h1>
          <p>
            any query and info about product feel free to call anytime, we are available 24X7
          </p>
          <p>
            <BiMailSend /> www.help@ecommerceapp.com
          </p>
          <p>
            <BiPhoneCall /> 012-3456789
          </p>
          <p>
            <BiSupport /> 1800-0000-0000 (toll free)
          </p>
        </InfoContainer>
      </ContactContainer>
    </Layout>
  );
};

export default Contact;
