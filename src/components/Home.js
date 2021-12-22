import { Link } from "react-router-dom"

function Home(){
    return(
        <div className="container">
            <h1>Hello! <small style={{fontSize:'75%',display: 'block'}}>Welcome to CV Maker</small></h1>

            <p>With our online CV maker, it is simple for anyone to quickly create a professional resume. Enter your personal details and begin filling out your resume content. Finally, choose one of our 36 available resume layouts, and download your resume.</p>

            <Link to="login" className="btn">Start Creating Your Resume</Link>
            
        </div>
    )
}

export default Home