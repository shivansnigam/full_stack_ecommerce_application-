import React from "react";
import styled from "styled-components";
import Layout from "./../components/Layout/Layout";

const AboutContainer = styled.div`
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

const TextContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    text-align: justify;

    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }
`;

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <AboutContainer>
        <ImageContainer>
          <img
            src="/images/about.jpeg"
            alt="about us"
          />
        </ImageContainer>
        <TextContainer>
          <p className="text-justify mt-2">
            Welcome to [ECOMMERCE APP], where shopping meets convenience and
            quality. Explore our wide range of [Products/Services] crafted to
            elevate your [Customer Benefit]. We are committed to delivering a
            seamless shopping experience with personalized service. Join us and
            indulge in excellence right at your fingertips.
          </p>
        </TextContainer>
      </AboutContainer>
    </Layout>
  );
};

export default About;
