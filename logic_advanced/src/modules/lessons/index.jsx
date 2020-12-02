import './index.css';
import React, { PureComponent } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseTeacher } from './helper/exerciseTeacher';
import Header from '../../helpers/templates/header/header';
import LocalStorage from '../../factory/storage/index';
class Lessons extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.typeUser = LocalStorage.getStorage().tipo;
    }



    _exerciseStudent() {
        return (
            <>
                <div className="d-flex flex-column m-3 p-2">
                    <button type="button" className="btn btn-success mb-3 w-50">Enviar resposta</button>
                    <textarea id="ex" rows="4" cols="50" className="textArea" >
                        Escreva sua resposta
                 </textarea>
                </div>
            </>
        )
    }
    _renderExercicies(){
        if (this.typeUser === '2'){
            return(
                <>
                    {this._exerciseStudent()}
                    <ExerciseTeacher disabled={true} />
                </>
            )
        }
        else
            return <ExerciseTeacher />
    }

    render() {
        return (
            <>
                <Header />
                <div className="container__body">
                    <div className="d-flex justify-content-center">
                        {this._renderExercicies()}
                    </div>
                </div>
            </>
        );
    }
}
export default Lessons;