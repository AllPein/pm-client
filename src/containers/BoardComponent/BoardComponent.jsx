import React, { useMemo, useCallback, useState } from "react";
import * as UI from "./BoardComponent.styles";
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { useSelector } from "react-redux";
import {
  projectParticipantsSelector,
  tasksFilterSelector,
  projectTasksSelector,
} from "@/selectors/projectView";
import { SearchOutlined } from "@ant-design/icons";
import { AvatarGroup } from "@/components/AvatarGroup";
import { useDispatch } from "react-redux";
import {
  updateTasksFilter,
  createTask,
  setSelectedTask,
} from "@/actions/projectView/projectView";
import { BoardCard } from "@/components/BoardCard";
import { v4 as uuid } from "uuid";
import { TaskSequence, TaskStatus, TaskStatusToTitle } from "@/enums/Task";
import { updateTask } from "@/actions/projectView/projectView";

import { Input, InputNumber, Modal } from "antd";
import { ParticipantAutocomplete } from "../TaskPreview/ParticipantAutocomplete/ParticipantAutocomplete";
import { userInfoSelector } from "@/selectors/user";
import { UserRoles } from "@/enums/Role";
import { useEffect } from "react";

const generateBoardColumn = (title, status, cards) => ({
  id: uuid(),
  key: uuid(),
  title,
  status,
  cards,
});

const BoardComponent = ({ projectId, taskSelected }) => {
  const dispatch = useDispatch();

  const participants = useSelector(projectParticipantsSelector);
  const projectTasks = useSelector(projectTasksSelector);
  const tasksFilter = useSelector(tasksFilterSelector);
  const userInfo = useSelector(userInfoSelector);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState(projectTasks);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [taskAsigneeId, setTaskAsigneeId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleChangeTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSelectAsignee = (id) => {
    setTaskAsigneeId(id);
  };

  const handleTimeChange = (value) => {
    setEstimatedTime(value);
  };

  const filteredParticipantsByActive = useMemo(() => {
    return participants?.map((participant) => ({
      ...participant,
      active: tasksFilter.value.includes(participant.id),
    }));
  }, [participants, tasksFilter]);

  const handleSelectParticipant = useCallback(
    (participant) => {
      dispatch(updateTasksFilter({ key: "participant", participant }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (projectTasks.some((t, i) => JSON.stringify(t) !== JSON.stringify(tasks[i]))) {
      setTasks(projectTasks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectTasks])

  const mappedProjectTasks = useMemo(
    () =>
      tasks
        .filter(
          (task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.description.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((task) => ({
          ...task,
          key: task.id,
          asignee:
            participants.find(
              (participant) => participant.id === task.asignee
            ) ?? null,
        })),
    [participants, tasks, searchValue]
  );

  const board = useMemo(() => {
    return {
      columns: TaskSequence.map((taskStatus) => {
        const filteredColumnCards = mappedProjectTasks.filter(
          (task) =>
            task.status === taskStatus &&
            (!tasksFilter.value.length ||
              tasksFilter.value.includes(task.asignee?.id))
        );
        return generateBoardColumn(
          TaskStatusToTitle[taskStatus],
          taskStatus,
          filteredColumnCards
        );
      }),
    };
  }, [mappedProjectTasks, tasksFilter.value]);

  const handleDragCard = (card, _, destination) => {
    
      const newCardStatus =
      board.columns.find((column) => column.id === destination.toColumnId)
        ?.status || TaskStatus.BACKLOG;
    if (!card.approved || card.status !== TaskStatus.DONE) {
      const updatedTask = {
        ...card,
        estimatedTime: Number(card.estimatedTime),
        asignee: card.asignee?.id,
        status: newCardStatus,
      }

      setTasks(prev => {
        return prev.map((t) => {
          if (t.id === updatedTask.id) {
            return updatedTask;
          }
    
          return t;
        });
      });

      dispatch(
        updateTask(
          updatedTask,
          projectId,
          taskSelected
        )
      );
    }
  };

  const renderModalContent = useMemo(() => {
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
          min={0.1}
          style={{ width: '100%' }}
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
  }, [estimatedTime, participants, taskAsigneeId, taskDescription, taskName]);

  const handleTaskClick = useCallback(
    (task) => {
      dispatch(setSelectedTask(task));
    },
    [dispatch]
  );

  const handleCreateTask = () => {
    dispatch(
      createTask(
        {
          title: taskName,
          description: taskDescription,
          estimatedTime: estimatedTime,
          asignee: taskAsigneeId,
        },
        projectId
      )
    );
    setTaskAsigneeId('');
    setTaskName('');
    setTaskDescription('');
    setEstimatedTime('');
    setIsModalVisible(false);
  };

  const createButtonDisabled = useMemo(() => {
    return !taskName || !taskDescription || !estimatedTime || !taskAsigneeId
  }, [estimatedTime, taskAsigneeId, taskDescription, taskName])

  return (
    <UI.Wrapper>
      <UI.BoardHeader>
        <UI.StyledInput
          size="large"
          value={searchValue}
          onChange={handleChangeSearchValue}
          placeholder="Поиск по доске"
          prefix={<SearchOutlined />}
        />
        <AvatarGroup
          maxCount={3}
          participants={filteredParticipantsByActive}
          onSelect={handleSelectParticipant}
        />
        {userInfo.role !== UserRoles.ADMIN && (
          <UI.StyledButton
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Создать задачу
          </UI.StyledButton>
        )}
      </UI.BoardHeader>
      <Board
        renderCard={(card, cardBag) => (
          <BoardCard card={card} cardBag={cardBag} onTaskClick={handleTaskClick} />
        )}
        onCardDragEnd={handleDragCard}
        disableColumnDrag
        disableCardDrag={userInfo.role === UserRoles.ADMIN}
      >
        {board}
      </Board>
      <Modal
        open={isModalVisible}
        title="Создание задачи"
        onOk={handleCreateTask}
        okButtonProps={{
          disabled: createButtonDisabled
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        {renderModalContent}
      </Modal>
    </UI.Wrapper>
  );
};

export { BoardComponent };
