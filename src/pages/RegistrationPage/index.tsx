import styled from "styled-components";
import RegistrationForm from "./components/RegistrationForm";

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 50px;
`;

export default function RegistrationPage() {
  return (
    <Layout>
      <RegistrationForm />
    </Layout>
  );
}
