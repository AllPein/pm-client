import { Button } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 30rem;
  padding: 3rem;
  height: calc(100vh - 7.3rem);
  border-left: 1px solid #f0f0f0;
`;

const TaskTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

const TaskEstimate = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  margin-top: 2rem;
`;

const ParticipantWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FieldLabel = styled.p`
  color: #707070;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  float: right;
`;

const EstimatedTimeError = styled.p`
  margin: 1.2rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.error};
`;

export {
  StyledButton,
  Wrapper,
  TaskEstimate,
  FieldLabel,
  EstimatedTimeError,
  ParticipantWrapper,
  InputWrapper,
  TaskTitle,
};
