import { createAction } from "redux-actions";
import { createRequestAction } from "@/actions/requests";
import { projectsApi } from "@/api/projectsApi";

const FEATURE_NAME = "PROJECT_VIEW";

export const setProject = createAction(`${FEATURE_NAME}/SET_PROJECT`);

export const setTasksFilter = createAction(`${FEATURE_NAME}/SET_TASKS_FILTER`);

export const setSelectedTask = createAction(
  `${FEATURE_NAME}/SET_SELECTED_TASK`
);

export const setProjectTasks = createAction(
  `${FEATURE_NAME}/SET_PROJECT_TASKS`
);

export const setActiveTab = createAction(`${FEATURE_NAME}/SET_ACTIVE_TAB`);

export const setProjectTime = createAction(`${FEATURE_NAME}/SET_PROJECT_TIME`);

export const changeActiveTab = (tab) => (dispatch) => {
  dispatch(setActiveTab(tab));
};

export const fetchProject = createRequestAction(
  "fetchProject",
  (code) => async (dispatch) => {
    const project = await projectsApi.fetchProject(code);
    dispatch(setProject(project));
    return project;
  }
);

export const fetchProjectTime = createRequestAction(
  "fetchProjectTime",
  (code) => async (dispatch) => {
    const projectTime = await projectsApi.fetchProjectTime(code);
    dispatch(setProjectTime(projectTime));
    return projectTime;
  }
);

export const updateProject = createRequestAction(
  "updateProject",
  (data) => async (dispatch) => {
    const project = await projectsApi.updateProject(data);
    dispatch(setProject(project));
    return project;
  }
);

export const addParticipant = createRequestAction(
  "addParticipant",
  (data) => async (dispatch) => {
    const project = await projectsApi.addParticipant(data);
    dispatch(setProject(project));
    return project;
  }
);

export const updateParticipant = createRequestAction(
  "updateParticipant",
  (data) => async (dispatch) => {
    const project = await projectsApi.updateParticipant(data);
    dispatch(setProject(project));
    return project;
  }
);

export const updateTasksFilter = createRequestAction(
  "updateTasksFilter",
  ({ key, participant }) =>
    (dispatch, getState) => {
      const state = getState();
      const prevFiltersStateValue = state.projectView.tasksFilter.value;
      const newTasksFilter = {
        key: key,
        value: prevFiltersStateValue.includes(participant.id)
          ? prevFiltersStateValue.filter(
              (participantId) => participantId !== participant.id
            )
          : [...prevFiltersStateValue, participant.id],
      };
      dispatch(setTasksFilter(newTasksFilter));
    }
);

export const updateTask = createRequestAction(
  "updateTask",
  (task, projectId) => async (dispatch, getState) => {
    const state = getState();
    const prevProjectTasks = state.projectView.project.tasks;
    const updatedTask = await projectsApi.updateTask(task, projectId);

    dispatch(
      setProjectTasks(
        prevProjectTasks.map((projectTask) =>
          projectTask.id === updatedTask.id ? updatedTask : projectTask
        )
      )
    );

    dispatch(setSelectedTask(updatedTask));
  }
);

export const createTask = createRequestAction(
  "createTask",
  (task, projectId) => async (dispatch, getState) => {
    const state = getState();
    const prevProjectTasks = state.projectView.project.tasks;
    const newTask = await projectsApi.createTask(task, projectId);

    dispatch(setProjectTasks(prevProjectTasks.push(newTask)));
  }
);
