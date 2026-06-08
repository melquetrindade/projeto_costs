import styles from '../../styles/newProject.module.css'
import ProjectForm from '../project/projectForm'

function NewProject(){
    return(
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject