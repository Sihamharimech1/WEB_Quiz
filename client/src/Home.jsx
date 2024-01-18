import { Outlet, Link } from 'react-router-dom';
import NavBar from "./nav";

const Home = () => {
  return (
    <div className="corps">
      <NavBar />
      <div>
        <Link to="/tm" className="container" style={{ marginLeft: '40px' }}>
          <h1>TM</h1>
        </Link>
        <Link to="/mt" className="container">
          <h1>MT</h1>
        </Link>
        <Link to="/gi" className="container">
          <h1>GI</h1>
        </Link>
        <Link to="/idsd" className="container">
          <h1>IDSD</h1>
        </Link>
        <Link to="/ge" className="container" style={{ marginLeft: '40px' }}>
          <h1>GE</h1>
        </Link>
        <Link to="/err" className="container">
          <h1>ERR</h1>
        </Link>
      </div>
      <div className="lp">
        <Link to="/isil" className="cont" style={{ marginLeft: '40px' }}>
          <h1>ISIL</h1>
        </Link>
        <Link to="/mge" className="cont">
          <h1>MGE</h1>
        </Link>
        <Link to="/erdd" className="cont">
          <h1>ERDD</h1>
        </Link>
        <Link to="/mbf" className="cont">
          <h1>MBF</h1>
        </Link>
        <Link to="/mt-lp" className="cont" style={{ marginLeft: '40px' }}>
          <h1>MT -LP </h1>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
