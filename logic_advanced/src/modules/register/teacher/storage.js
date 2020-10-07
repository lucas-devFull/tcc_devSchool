export default class RegisterUserTeacher{

    static setUser({name, userName, email, password}) {
        var formData = new FormData()
        formData.append("email_usuario",email)
        formData.append("senha:", password)
        formData.append("descricao_usuario", name)
        
        var options = {
            method: 'POST',
            body:formData
        }

        // console.log(formData);

        // fetch('http://127.0.0.1:82/usuario', options)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
    }
}