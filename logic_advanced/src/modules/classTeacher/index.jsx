import './index.css';
import React, { PureComponent } from 'react';
import Header from '../../helpers/templates/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesome from 'react-fontawesome';

class ClassTeacher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('test')
    }

    render() {
        return (
            <>
            <Header />
                <div className="container__body">
                    <aside className="aside_upload_subject">
                       <div className="information_upload_content">
                           <button type="button" className="btn_upload_subject"><FontAwesomeIcon icon="plus" />&nbsp;Adicionar conteúdo</button>
                           <div className="content_uploads_subject">
                               <div className="box_subject">
                                   <h3>Titulo do conteúdo</h3>
                                   <span>conteúdo</span>
                                   <FontAwesome icon="ellipsis-h" />
                               </div>
   
                               <h4 className="nenhum_resultado_encontradp">Nenhum conteúdo foi encontrado</h4>
                           </div>
                       </div>
                    </aside>
                    <div className="content_chat_students">

                    </div>
                </div>
            </>
        );
    }
}

export default ClassTeacher;