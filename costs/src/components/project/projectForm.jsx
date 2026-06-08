import { useEffect, useState } from 'react'
import styles from '../../styles/projectForm.module.css'
import Input from '../form/input'
import Select from '../form/select'
import SubmitButton from '../form/submitButton'

function ProjectForm({handleSubmit, btnText, projectData}){
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            setCategories(data)
        }).catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input value={project.name ? project.name : ''} handleOnChange={handleChange} type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input value={project.budget ? project.budget : ''} handleOnChange={handleChange} type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total"/>
            <Select value={project.category ? project.category.id : ''} handleOnChange={handleCategory} name="category_id" text="Selecione a categoria" options={categories}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm