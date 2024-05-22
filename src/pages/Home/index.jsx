import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listProjects, appendProject, deleteProject } from "../../lib/api";
import { Spinner } from "../../components/Spinner";

const Project = ({ project, onDelete }) => {
  const handleDeleteClick = async () => {
    await deleteProject(project.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-header">{project.title}</div>
        <div className="card-body">
          <p className="card-text">{project.description}</p>
        </div>
        <div className="card-footer d-flex justify-content-center gap-2">
          <Link className="btn btn-primary" to={`/project/${project.$$id}`}>
            Zobrazit
          </Link>
          <Link className="btn btn-secondary" to={`/project/${project.$$id}/edit`}>
            Upravit
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDeleteClick}
          >
            Smazat
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({ projects, onDelete }) => {
  return (
    <>
      <h2 className="mt-6">Seznam projektů</h2>
      <div className="container">
        <div className="row">
          {projects.map((project) => (
            <Project key={project.$$id} project={project} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

const NewProjectForm = ({ onAppend }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onAppend) {
      onAppend({ title, description });
    }
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3>Přidání projektu</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Název projektu
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
          Zadejte název projektu, který chcete vytvořit.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Popis
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Přidat
      </button>
    </form>
  );
};

export const HomePage = () => {
  const [projects, setProjects] = useState(null);

  const handleAppend = async (project) => {
    await appendProject(project);
    fetchProjects();
  };

  const handleDelete = () => {
    fetchProjects();
  };

  const fetchProjects = async () => {
    const data = await listProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {projects ? (
        <ProjectList projects={projects} onDelete={handleDelete} />
      ) : (
        <Spinner />
      )}
      <NewProjectForm onAppend={handleAppend} />
    </>
  );
};
