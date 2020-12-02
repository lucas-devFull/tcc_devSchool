import React from 'react';

export const ExerciseTeacher = ({disabled}) =>
    <>
        <div className="d-flex flex-column m-3 p-2">
            <button type="button" className="btn btn-success mb-3 w-50" hidden={disabled ?? false} >Salvar</button>
            <textarea id="ex" rows="4" cols="50" className="textArea" readOnly={disabled ?? false}>
                Adiciome contéudo do exercício
                </textarea>
            <div className="">
                <input type="text" placeholder="Exemplos de entradas" className="p-4  input__text__area" readOnly={disabled ?? false} />
                <input type="text" placeholder="Exemplos de saídas" className="p-4  input__text__area" readOnly={disabled ?? false} />
            </div>
        </div>
    </>