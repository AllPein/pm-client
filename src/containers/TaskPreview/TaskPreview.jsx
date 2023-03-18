import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as UI from "./TaskPreview.styles";

import { ParticipantAutocomplete } from "./ParticipantAutocomplete/ParticipantAutocomplete";
import { setSelectedTask, updateTask } from "@/actions/projectView/projectView";
import { useDispatch } from "react-redux";
import { Avatar, Button, Input, InputNumber, Select } from "antd";
import { getAvatarCharacters } from "@/utils/user";
import { formatDateWithTime } from "@/utils/date";
import { CheckCircleTwoTone, CloseCircleTwoTone, CloseOutlined } from "@ant-design/icons";
import { TaskStatus, TaskStatusToTitle } from "@/enums/Task";
import { useSelector } from "react-redux";
import { userInfoSelector } from "@/selectors/user";
import { UserRoles } from "@/enums/Role";
import { ProjectRoles } from "../../enums/Role";

const { TextArea } = Input;

const TaskPreview = ({ selectedTask, project }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector(userInfoSelector);
  const [selectedAsigneeId, setSelectedAsigneeId] = useState(
    selectedTask?.asignee
  );
  const [taskTitle, setTaskTitle] = useState(selectedTask?.title);
  const [taskEstimate, setTaskEstimate] = useState(selectedTask?.estimatedTime);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingEstimate, setIsEditingEstimate] = useState(false);
  const [taskDescription, setTaskDescription] = useState(
    selectedTask?.description
  );
  const [taskStatus, setTaskStatus] = useState(selectedTask?.status);

  const handleCloseTaskPreview = () => {
    dispatch(setSelectedTask(null));
  };

  const mappedUserInfo = useMemo(() => {
    const projectRole = project.participants.find((p) => p.user.id === userInfo.id)?.role;

    return {
      ...userInfo,
      projectRole
    }
  }, [project, userInfo]);

  const isUserAdmin = useMemo(
    () => mappedUserInfo.role === UserRoles.ADMIN,
    [mappedUserInfo]
  );

  const disabledChange = useMemo(() => {
    return isUserAdmin || selectedTask.approved
  }, [isUserAdmin, selectedTask]);

  useEffect(() => {
    if (selectedTask.status !== taskStatus ||
      selectedTask.title !== taskTitle ||
      selectedTask.estimatedTime !== taskEstimate ||
      selectedTask.description !== taskDescription ||
      selectedTask.asignee !== selectedAsigneeId
    ) {
      setTaskStatus(selectedTask.status);
      setTaskTitle(selectedTask.title);
      setTaskDescription(selectedTask.description);
      setTaskEstimate(selectedTask.estimatedTime);
      setSelectedAsigneeId(selectedTask.asignee);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTask]);

  const taskCreator = useMemo(
    () =>
      project.participants.find(
        (participant) => participant.id === selectedTask.creatorId
      ),
    [project, selectedTask]
  );

  const handleChangeTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleChangeTaskEstimate = (value) => {
    setTaskEstimate(value);
  };

  const handleUpdateDescription = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          description: taskDescription,
        },
        project.id
      )
    );
  };

  const handleUpdateTitle = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          title: taskTitle,
        },
        project.id
      )
    );
    setIsEditingTitle(false);
  };

  const handleUpdateEstiamte = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          estimatedTime: taskEstimate,
        },
        project.id
      )
    );
    setIsEditingEstimate(false);
  };

  const handleChangeDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSelectAsignee = (data) => {
    setSelectedAsigneeId(data);
    dispatch(
      updateTask(
        {
          ...selectedTask,
          asignee: data,
        },
        project.id
      )
    );
  };

  const handleChangeStatus = (data) => {
    setTaskStatus(data);
    dispatch(
      updateTask(
        {
          ...selectedTask,
          status: data,
        },
        project.id
      )
    );
  };

  const taskStatusOptions = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => ({
        value: status,
        label: TaskStatusToTitle[status],
        disabled: status === taskStatus,
      })),
    [taskStatus]
  );

  const handleApprove = useCallback(() => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          approved: true,
        },
        project.id
      )
    );
  }, [dispatch, project.id, selectedTask]);

  const renderApprovalStatus = useMemo(() => {
    if (selectedTask.approved) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleTwoTone twoToneColor="#95de64" />
          <p style={{ marginLeft: 10 }}>Подтверждена</p>
        </div>
      )
    } else {
      if (mappedUserInfo.projectRole && mappedUserInfo.projectRole !== ProjectRoles.PARTICIPANT) {
        return (
          <Button onClick={handleApprove}>Подвердить выполнение</Button>
        )
      } else {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleTwoTone twoToneColor="#ff7875" />
            <p style={{ marginLeft: 10 }}>Не подтверждена</p>
          </div>
        ) 
      }
    }
  }, [handleApprove, mappedUserInfo.projectRole, selectedTask.approved])    

  return (
    <UI.Wrapper>
      <UI.StyledButton
        type="text"
        onClick={handleCloseTaskPreview}
        icon={<CloseOutlined />}
      />
      {!isEditingTitle ? (
        <UI.TaskTitle onClick={() => !disabledChange && setIsEditingTitle(true)}>
          {taskTitle}
        </UI.TaskTitle>
      ) : (
        <Input
          value={taskTitle}
          onChange={handleChangeTaskTitle}
          onBlur={handleUpdateTitle}
        />
      )}
      <UI.InputWrapper>
        <UI.FieldLabel>Описание</UI.FieldLabel>
        <TextArea
          disabled={disabledChange}
          onBlur={handleUpdateDescription}
          onChange={handleChangeDescription}
          value={taskDescription}
        />
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Статус</UI.FieldLabel>
        <Select
          value={taskStatus}
          disabled={disabledChange}
          onChange={handleChangeStatus}
          options={taskStatusOptions}
        />
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Время (в часах)</UI.FieldLabel>
        {!isEditingEstimate ? (
          <UI.TaskEstimate
            onClick={() => !disabledChange && setIsEditingEstimate(true)}
          >
            {taskEstimate}h
          </UI.TaskEstimate>
        ) : (
          <InputNumber
            value={taskEstimate}
            style={{ width: '100%' }}
            onChange={handleChangeTaskEstimate}
            onBlur={handleUpdateEstiamte}
          />
        )}
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Исполнитель</UI.FieldLabel>
        <ParticipantAutocomplete
          disabled={disabledChange}
          participants={project.participants}
          asigneeId={selectedAsigneeId}
          onSelect={handleSelectAsignee}
        />
      </UI.InputWrapper>
      {taskCreator && (
        <UI.InputWrapper>
          <UI.FieldLabel>Автор</UI.FieldLabel>
          <UI.ParticipantWrapper>
            <Avatar
              style={{
                backgroundColor: taskCreator.user.avatarColor,
              }}
            >
              {getAvatarCharacters(taskCreator.user)}
            </Avatar>
            <p style={{ marginLeft: "2rem" }}>
              {taskCreator.user.firstName} {taskCreator.user.lastName}
            </p>
          </UI.ParticipantWrapper>
        </UI.InputWrapper>
      )}
      <UI.InputWrapper>
        <UI.FieldLabel>Создано</UI.FieldLabel>
        {formatDateWithTime(selectedTask.createdAt)}
      </UI.InputWrapper>

      <UI.InputWrapper>
        <UI.FieldLabel>Обновлено</UI.FieldLabel>
        {formatDateWithTime(selectedTask.updatedAt)}
      </UI.InputWrapper>

      <UI.InputWrapper>
        {renderApprovalStatus}
      </UI.InputWrapper>
    </UI.Wrapper>
  );
};

export { TaskPreview };
