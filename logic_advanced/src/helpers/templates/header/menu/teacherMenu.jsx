import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminMenu = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/manage/teacher">
                    <FontAwesomeIcon icon="user-edit" />&nbsp;Gerenciar Professores
                </Link>
            </li>
        </>
    )
}

export const TeacherMenu = (props) => {
    return (
        <>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon="user-graduate" />&nbsp;Alunos
                </a>
            </li>
            {
                props.props.tipo === '0' ? <AdminMenu/> : ''
            }
        </>
    )
}
