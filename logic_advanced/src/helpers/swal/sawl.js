import swal from 'sweetalert';

export default class Swal{
    
    static alertMessage(title,text,operation){
        swal({
            title: title,
            text: text,
            icon: operation,
          });
    }
}