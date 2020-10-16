import swal from 'sweetalert';

export default class Swal{
    
    static alertMessage(title,text,operation,callback){
        swal({
            title: title,
            text: text,
            icon: operation,
            onConfirm: () => callback
          });
    }
}