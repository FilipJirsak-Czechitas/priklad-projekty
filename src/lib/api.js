const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export const listProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  return await response.json();
};

export const appendProject = async (project) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
};

export const updateProject = async (id, project) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return await response.json();
};

export const getProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`);
  return await response.json();
};

export const appendTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

export const listAllTasks = async (projectId) => {
  const response = await fetch(`${API_URL}/tasks/${projectId}/`);
  return await response.json();
};

export const listDayTasks = async (projectId, date) => {
  const response = await fetch(`${API_URL}/tasks/${projectId}/${date}`);
  return await response.json();
};
