import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Spinner } from "../../components/Spinner";
import { getProject, listAllTasks, listDayTasks } from "../../lib/api";

const formatTime = (time) =>
  time ? time.substring(0, 2) + ":" + time.substring(2) : "";

const Task = ({ task }) => (
  <div className="row mt-2">
    <div className="col-2">
      {task.time && (
        <span className="badge text-bg-secondary">{formatTime(task.time)}</span>
      )}
    </div>
    <div className="col-10">{task.title}</div>
  </div>
);

const TaskList = ({ tasks }) => (
  <div className="container">
    {tasks.map((task) => (
      <Task key={task.$$id} task={task} />
    ))}
  </div>
);

const AllTasks = ({ projectId }) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setTasks(
      Object.groupBy(await listAllTasks(projectId), (task) => task.date)
    );
  };

  if (!tasks) {
    return <Spinner />;
  }
  return Object.entries(tasks).map(([date, tasks]) => (
    <>
      <div className="row my-2"><h4>{dayjs(date).format("D. M. YYYY")}</h4></div>
      <TaskList tasks={tasks} />
    </>
  ));
};

const Tasks = ({ projectId, date }) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setTasks(await listDayTasks(projectId, date));
  };

  if (!tasks) {
    return <Spinner />;
  }
  return <TaskList tasks={tasks} />;
};

const Tab = ({ label, name, currentTab, onSelect }) => (
  <li className="nav-item" role="presentation">
    <button
      className={"nav-link" + (name === currentTab ? " active" : "")}
      type="button"
      role="tab"
      onClick={() => onSelect(name)}
    >
      {label}
    </button>
  </li>
);

export const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [tab, setTab] = useState("all");
  const { projectId } = useParams();

  const fetchProject = async () => {
    const project = await getProject(projectId);
    setProject(project);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return <Spinner />;
  }

  return (
    <>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <h2>Úkoly</h2>
      <ul className="nav nav-tabs" role="tablist">
        <Tab label="Všechny" name="all" currentTab={tab} onSelect={setTab} />
        <Tab label="Dnešní" name="today" currentTab={tab} onSelect={setTab} />
        <Tab
          label="Zítřejší"
          name="tomorrow"
          currentTab={tab}
          onSelect={setTab}
        />
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" role="tabpanel">
          {tab === "all" && <AllTasks projectId={projectId} />}
          {tab === "today" && (
            <Tasks projectId={projectId} date={dayjs().format("YYYY-MM-DD")} />
          )}
          {tab === "tomorrow" && (
            <Tasks
              projectId={projectId}
              date={dayjs().add(1, "day").format("YYYY-MM-DD")}
            />
          )}
        </div>
      </div>
    </>
  );
};
