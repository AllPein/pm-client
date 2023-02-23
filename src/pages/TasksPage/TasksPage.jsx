import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { BoardComponent } from "@/containers/BoardComponent";
import * as UI from "./TasksPage.styles";
import { CheckSquareOutlined, FundOutlined } from "@ant-design/icons";
import { TasksComponent } from "@/containers/TasksComponent";
import { fetchProject } from "@/actions/projectView";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector } from "@/selectors/projectView";
import { TaskPreview } from "@/containers/TaskPreview";
import { selectedTaskSelector } from "../../selectors/projectView";

const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});

const menuItems = [
  getItem("Доска", "board", <FundOutlined />),
  getItem("Все задачи", "tasks", <CheckSquareOutlined />),
];

const TasksPage = () => {
  const [currentMode, setCurrentMode] = useState("board");
  const { projectCode } = useParams();
  const project = useSelector(projectSelector);
  const selectedTask = useSelector(selectedTaskSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!project && projectCode) {
      dispatch(fetchProject(projectCode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectCode]);

  const handleSelectMenuItem = (item) => {
    setCurrentMode(item.key);
  };

  return (
    project && (
      <UI.Wrapper>
        <UI.Sidebar>
          <Menu
            style={{ height: "100%", paddingTop: "3rem" }}
            defaultSelectedKeys={[currentMode]}
            mode="inline"
            onSelect={handleSelectMenuItem}
            items={menuItems}
          />
        </UI.Sidebar>

        {currentMode === "board" ? (
          <BoardComponent projectId={projectCode} />
        ) : (
          <TasksComponent />
        )}
        {selectedTask && (
          <TaskPreview selectedTask={selectedTask} project={project} />
        )}
      </UI.Wrapper>
    )
  );
};

export { TasksPage };
