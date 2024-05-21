import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { getProject, updateProject } from "../../lib/api";

export const ProjectEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const loadProject = async () => {
    const project = await getProject(projectId);
    setProject(project);
    setTitle(project.title);
    setDescription(project.description);
  };

  useEffect(() => {
    loadProject();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProject(projectId, { title, description });
    navigate("/");
  };

  if (!project) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3>Změna projektu</h3>
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
        Změnit
      </button>
    </form>
  );
};
