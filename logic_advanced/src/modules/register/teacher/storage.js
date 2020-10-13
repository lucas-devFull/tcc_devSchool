export default class RegisterUserTeacher{

    static setUser({name, userName, email, password, token}) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);


        let formData = new FormData()
        formData.append("descricao_usuario", name)
        formData.append("email_usuario",email)
        formData.append("senha_usuario", password)
        formData.append("nick_usuario", userName)
        
        let options = {
            method: 'POST',
            headers: myHeaders,
            body:formData
        }

        fetch('http://127.0.0.1:82/professor', options)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    static getUser(token){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);

        let options = {
            method: 'GET',
            headers: myHeaders,
        }
        return fetch("http://127.0.0.1:82/professor",options);        
    }
}