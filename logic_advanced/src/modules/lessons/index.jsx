import './index.css';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../helpers/templates/header/header';

class Lessons extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // console.log('test')
    }

    render() {
        return (
            <>
                <Header />
                <div className="container__body d-flex flex-column justify-content-center">                
                    <div className="text_area">
                        <label for="exampleFormControlTextarea1">Entrada de Exercício</label>
                        <textarea className="form-control" id="inPut" rows="4" ></textarea>
                    </div>
                    <div className="text_area">
                        <label for="exampleFormControlTextarea1">Saída de Exercício</label>
                        <textarea className="form-control" id="outPut" rows="4" >recebe os dados dos exercicios</textarea>
                    </div>
                    <div className="text_area mt-3 d-flex justify-content-center" >
                        <button type="submit" class="btn btn-primary mb-2" style={{ width: '100%' }}>Enviar</button>
                    </div>
                

                    {/* <aside className="aside_upload_subject">
                       <div className="information_upload_content">
                           <button type="button" className="btn_upload_subject"> <FontAwesomeIcon icon="plus" />&nbsp;Adicionar conteúdo</button>
                           <div className="content_uploads_subject">
                               <div className="box_subject">
                                   <h3>Titulo do conteúdo</h3>
                                   <span>conteúdo</span>
                                   <FontAwesomeIcon icon="ellipsis-h" size="2x"/>                                   
                               </div>
   
                               <h4 className="nenhum_resultado_encontradp">Nenhum conteúdo foi encontrado</h4>
                           </div>
                       </div>
                    </aside>
                    <div className="content_chat_students">

                    </div> */}
                </div>
            </>
        );
    }
}
export default Lessons;