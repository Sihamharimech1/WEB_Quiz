import {Link} from "react-router-dom"
const BigLogin = () => {
  const stl={
      width: '370px',
      height: 'auto',
      marginLeft: '710px',
      marginTop: '-600px'
                }
    return ( 
        <>
        <section className="cta">
        <button className="subscribe-button">Log in now</button>
      
     
        <div className="student">
        <h2 className="tit" >Compte Etudiant</h2>
          <Link to={"/login"}>
              <img src="201602.png"></img>
              </Link>
          </div> 
          <div className="teacher" >
          <h2 className="tit2" >Compte Professeur</h2>
          <Link to={"/loginProf"}>
              <img src="images.png" style={stl}></img>
              </Link>
          </div>
      </section>
      </>
     );
}
 
export default BigLogin;