import React, { useCallback } from "react";
import * as UI from "./TasksComponent.styles";
import { SearchOutlined } from "@ant-design/icons";
import { TaskCard } from "@/components/TaskCard";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "@/actions/projectView/projectView";
import { useMemo } from "react";
import { useState } from "react";

const TasksComponent = ({ project }) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTaskClick = useCallback(
    (task) => {
      dispatch(setSelectedTask(task));
    },
    [dispatch]
  );

  const filteredTasks = useMemo(() => {
    return project.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [project.tasks, searchValue]);

  return (
    <UI.Wrapper>
      <UI.StyledInput
        size="large"
        placeholder="Поиск по задачам"
        value={searchValue}
        onChange={handleChangeSearchValue}
        prefix={<SearchOutlined />}
      />
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          participants={project.participants}
          task={task}
          onTaskClick={handleTaskClick}
        />
      ))}
    </UI.Wrapper>
  );
};

export { TasksComponent };
