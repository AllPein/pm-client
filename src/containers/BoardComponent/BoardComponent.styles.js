import { Button, Input } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
`;

const BoardHeader = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

const StyledInput = styled(Input)`
  max-width: 30rem;
  margin-right: 2rem;
`;

const StyledButton = styled(Button)`
  margin-left: 12rem;
  margin-bottom: 0.5rem;
`;

export { StyledInput, Wrapper, StyledButton, BoardHeader };
