import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminMenu = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/teacher">
                    <FontAwesomeIcon icon="user-edit" />&nbsp;Gerenciar Professores
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="modulos">
                    <FontAwesomeIcon icon="user-edit" />&nbsp;Gerenciar Modulos
                </Link>
            </li>
        </>
    )
}

export const TeacherMenu = (props) => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="alunos">
                    <FontAwesomeIcon icon="user-graduate" />&nbsp;Alunos
                </Link>
            </li>
            {
                props.tipo === '0' ? <AdminMenu/> : ''
            }

            <li className="nav-item">
                <Link className="nav-link" to="classe">
                    <FontAwesomeIcon icon="user-edit" />&nbsp;Gerenciar Classe
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="grafico">
                    <FontAwesomeIcon icon="chart-bar" />&nbsp; Gráficos
                </Link>
            </li>
        </>
    )
}
