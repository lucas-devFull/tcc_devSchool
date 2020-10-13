import swal from 'sweetalert';

export class Swal{
    
    static alertMessage(title,text,operation){
        swal({
            title: title,
            text: text,
            icon: operation,
          });
    }
}