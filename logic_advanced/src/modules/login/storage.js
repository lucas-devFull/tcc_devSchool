export default class RequestLogin{

    static getAcess(login, pw){
        return fetch(`http://127.0.0.1:82/usuario?login=${login}&senha=${pw}`);
    }
}