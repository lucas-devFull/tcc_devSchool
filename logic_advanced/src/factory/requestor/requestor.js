import LocalStorage from '../../factory/storage/index';
export  class Requestor{

    constructor(){
        this.baseURL = `http://127.0.0.1:82`;
        this.dataUserLogged = LocalStorage.getStorage();
    }

    get(urlG){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${this.dataUserLogged.token}`);

        let options = {
            method: 'GET',
            headers: myHeaders,
        }
        return fetch(`${this.baseURL}/${urlG}`,options);           
    }

    post(urlP,formData){
        let typeRequest = formData.get('id') === null ? 'POST' : 'PUT';
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${this.dataUserLogged.token}`);
        
        let options = {
            method: typeRequest,
            headers: myHeaders,
            body:formData
        }       

        return fetch(`${this.baseURL}/${urlP}`, options)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}