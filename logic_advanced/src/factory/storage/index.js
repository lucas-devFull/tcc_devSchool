export default class LocalStorage{

    static setStorage(data){
        localStorage.setItem(btoa('statusUser'), btoa(data.status));
        localStorage.setItem(btoa('dataUser'), btoa(JSON.stringify((data.dados))));
    }

    static getStorage(key){
        let aux = atob(localStorage.getItem(btoa(key)));     
        return JSON.parse(aux);
    }
    
    static clearStorage(){
        localStorage.clear();
    }    
}
