import styled from "styled-components";
import LegacyRegistrationForm from "./components/RegistrationForm/legacy";

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 50px;
`;

export default function RegistrationPage() {
  return (
    <Layout>
      {/* <RegistrationForm /> */}
      <LegacyRegistrationForm />
    </Layout>
  );
}
