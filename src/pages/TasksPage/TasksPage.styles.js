import styled from "styled-components";
import { BackLink } from "@/components/BackLink";

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 7.3rem);
`;

const Sidebar = styled.div`
  max-width: 40rem;
  height: 100%;
  padding-top: 2rem;
`;

export { Wrapper, Sidebar };
