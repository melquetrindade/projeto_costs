import Message from "../layout/message"
import { useLocation } from "react-router-dom"
import styles from '../../styles/projects.module.css'
import Container from "../layout/container"
import LinkButton from "../layout/linkButton"

function Projects(){
    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto"/>
            </div>
            {message && <Message msg={message} type="sucess"/>}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projects