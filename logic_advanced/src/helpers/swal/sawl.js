import swal from 'sweetalert';
import "./swal.css"

export default class Swal{
    
    static alertMessage(title = "",text = "",operation = "",className = "", buttons = {}, callback = function(){}, callback2 = function(){}, context = {}){
        swal({
            title: title,
            text: text,
            icon: operation,
            className: className,
            buttons: buttons,
            onConfirm: () => callback
        })
        .then((botoes) => {
            if (botoes == "Sim" || botoes == "Ok")  {
                callback2(context)
            }
        });
    }
}