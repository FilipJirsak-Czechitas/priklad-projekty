import { useState, useEffect } from "react";
import { Spinner } from "../../components/Spinner";
import { listProjects, appendTask } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export const NewTask = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await listProjects();
    setProjects(data);
    setProject(data[0].$$id)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = {
      project,
      title,
      date,
      time: time ? time.replace(":", "") : null,
    };

    await appendTask(task);
    navigate(`/project/${project}`);
  };

  if (!projects) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Nový úkol</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="project" className="form-label">
            Projekt
          </label>
          <select
            id="project"
            className="form-select"
            aria-label="Výběr projektu"
            value={project}
            onChange={(event) => setProject(event.target.value)}
            required
          >
            {projects.map((project) => (
              <option key={project.$$id} value={project.$$id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Název úkolu
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titleHelp"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <div id="titleHelp" className="form-text">
            Co mám udělat.
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">
              Datum
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="time" className="form-label">
              Čas <small>(nepovinný)</small>
            </label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Přidat
        </button>
      </form>
    </>
  );
};
