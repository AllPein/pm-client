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
  margin-left: 2.4rem;
  margin-bottom: 0.5rem;
`;

const FieldName = styled.h2`
  margin: 1.2rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`;

const EstimatedTimeError = styled.p`
  margin: 1.2rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.error};
`;

export {
  StyledInput,
  EstimatedTimeError,
  FieldName,
  Wrapper,
  StyledButton,
  BoardHeader,
};
