import styles from '../../styles/project.module.css'
import { data, useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/loading'
import Container from '../layout/container'
import ProjectForm from '../project/projectForm'
import Message from '../layout/message'
import ServiceForm from '../service/serviceForm'
import {parse, v4 as uuidv4} from 'uuid'
import ServiceCard from '../service/serviceCard'

function Project(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setservices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json()).then((data) => {
                setProject(data)
                setservices(data.services)
            }).catch(err => console.log(err))
        }, 2000)
    }, [id])

    function createService(project){
        //setMessage('')
        //pegar último serviço adicionado
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType('error')
            setTimeout(() => {
                setMessage('')
            }, 3000)
            project.services.pop()
            return false
        }

        project.costs = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json()).then((data) => {
            setShowServiceForm(false)
        }).catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project){
        setMessage('')

        if(project.budget < project.costs){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then((data) => {
            setProject(data)
            setShowProjectForm(false)
            //mensagem
            setMessage('Projeto atualizado!')
            setType('sucess')
        }).catch((err) => console.log(err))
    }

    function removeService(){}

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                            {
                                !showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de orçamento:</span> R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${project.costs}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.project_info}>
                                        <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição" 
                                        projectData={project}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button 
                            className={styles.btn} 
                            onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {
                                    showServiceForm && 
                                    <ServiceForm
                                      handleSubmit={createService}
                                      btnText="Adicionar Serviço"
                                      projectData={project}
                                    />
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))}
                            {services.length === 0 && 
                                <p>Não há serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project