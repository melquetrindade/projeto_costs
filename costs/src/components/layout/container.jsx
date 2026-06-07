import { Outlet } from 'react-router-dom'
import styles from '../../styles/container.module.css'

function Container(props){
    return(
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children ? props.children : <Outlet />}
        </div>
    )
}

export default Container