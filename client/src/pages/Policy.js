import React from "react";
import styled from "styled-components";
import Layout from "./../components/Layout/Layout";

const PolicyContainer = styled.div`
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
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    text-align: justify;
    margin-bottom: 1rem;

    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }
`;

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <PolicyContainer>
        <ImageContainer>
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
          />
        </ImageContainer>
        <TextContainer>
          <p>We value your privacy and are committed to protecting your personal information.</p>
          <p>This Privacy Policy outlines how we collect, use, and protect your data.</p>
          <p>We may collect information such as your name, email address, and browsing activity.</p>
          <p>Your data helps us improve our services and personalize your experience.</p>
          <p>We do not share your information with third parties without your consent.</p>
          <p>By using our website, you agree to our Privacy Policy.</p>
          <p>If you have any questions, please contact us at [Contact Information].</p>
        </TextContainer>
      </PolicyContainer>
    </Layout>
  );
};

export default Policy;
