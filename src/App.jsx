import { Link, Outlet } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        Projekty
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Domů
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/new">
              Nový úkol
            </Link>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Text k vyhledání" aria-label="Vyhledat" />
          <button className="btn btn-outline-success" type="submit">
            Vyhledat
          </button>
        </form>
      </div>
    </div>
  </nav>
);

export const App = () => {
  return (
    <div className="container">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
