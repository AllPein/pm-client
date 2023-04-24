import { handleActions } from "redux-actions";
import {
  setProject,
  setProjectTime,
  setActiveTab,
  setTasksFilter,
  setProjectTasks,
  setProjectRequirements,
  setSelectedTask,
} from "@/actions/projectView";

const initialState = {
  project: null,
  tasksFilter: {
    key: "participant",
    value: [],
  },
  projectTime: null,
  selectedTask: null,
  activeTab: "participants",
};

const setProjectHandler = (state, action) => {
  return {
    ...state,
    project: action.payload,
  };
};

const setProjectTimeHandler = (state, action) => {
  return {
    ...state,
    projectTime: action.payload,
  };
};

const setSelectedTaskHandler = (state, action) => {
  return {
    ...state,
    selectedTask: action.payload,
  };
};

const setTasksFilterHandler = (state, action) => {
  return {
    ...state,
    tasksFilter: action.payload,
  };
};

const setProjectTasksHandler = (state, action) => {
  return {
    ...state,
    project: {
      ...state.project,
      tasks: action.payload,
    },
  };
};

const setProjectRequirementsHandler = (state, action) => {
  return {
    ...state,
    project: {
      ...state.project,
      checklist: action.payload,
    },
  };
};

const setActiveTabHandler = (state, action) => {
  return {
    ...state,
    activeTab: action.payload,
  };
};

const projectViewReducer = handleActions(
  new Map([
    [setProject, setProjectHandler],
    [setProjectTime, setProjectTimeHandler],
    [setSelectedTask, setSelectedTaskHandler],
    [setActiveTab, setActiveTabHandler],
    [setTasksFilter, setTasksFilterHandler],
    [setProjectTasks, setProjectTasksHandler],
    [setProjectRequirements, setProjectRequirementsHandler],
  ]),
  initialState
);

export { projectViewReducer };
