import {Link} from "react-router-dom" 
const Test = () => {
  const stl={
      width: '370px',
      height: 'auto',
      marginLeft: '710px',
      marginTop: '-600px'
  }
    return ( 
        <div className="app">
        <header className="header">
            <img src="logo.png"></img>
          <h1>Test your Knowledge</h1>
         
        </header>
        <section className="main-content">
          <h2>About Us</h2>
          <p >
          Welcome to QCM,
           a cutting-edge platform designed 
           to revolutionize the way teachers create 
           and manage quizzes, and students engage with
            educational content. At QCM, 
            we believe in the power of technology to enhance 
            the learning experience, making education more interactive, efficient, and enjoyable.
          </p>
          <h2>Our Mission</h2>
          <p>
          Our mission is to simplify the process of conducting and participating in quizzes. We understand the challenges faced by both educators and students, and we aim to bridge the gap with a user-friendly and intuitive platform that promotes active learning.
          </p>
        </section>
        <section className="cta">
          <button className="subscribe-button">Sign Up know</button>
        
       
          <div className="student">
          <h2 className="tit" >Compte Etudiant</h2>
            <Link to={"/register"}>
                <img src="201602.png"></img>
                </Link>
            </div> 
            <div className="teacher" >
            <h2 className="tit2" >Compte Professeur</h2>
            <Link to={"/RegisterProf"}>
                <img src="images.png" style={stl}></img>
                </Link>
            </div>
        </section>
        
      </div>
     );
}
 
export default Test;