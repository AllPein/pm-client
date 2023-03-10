import React, { useState } from "react";
import * as UI from "./CreateTaskModal.styles";
import { Input, InputNumber } from "antd";
import { ParticipantAutocomplete } from "@/containers/TaskPreview/ParticipantAutocomplete/ParticipantAutocomplete";

const CreateTaskModal = ({ participants }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [taskAsigneeId, setTaskAsigneeId] = useState("");

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleChangeTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSelectAsignee = (id) => {
    setTaskAsigneeId(id);
  };

  const handleTimeChange = (e) => {
    setEstimatedTime(e.target.value);
  };

  return (
    <>
      <UI.FieldName>Название</UI.FieldName>
      <Input
        value={taskName}
        onChange={handleChangeTaskName}
        placeholder="Заполните поле"
      />
      <UI.FieldName>Описание</UI.FieldName>
      <Input.TextArea
        value={taskDescription}
        onChange={handleChangeTaskDescription}
        placeholder="Заполните поле"
      />
      <UI.FieldName>Время (в часах)</UI.FieldName>
      <InputNumber
        value={estimatedTime}
        onChange={handleTimeChange}
        placeholder="Заполните поле"
      />
      <UI.FieldName>Исполнитель</UI.FieldName>
      <ParticipantAutocomplete
        participants={participants}
        asigneeId={taskAsigneeId}
        onSelect={handleSelectAsignee}
      />
    </>
  );
};

export { CreateTaskModal };
