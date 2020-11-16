import { Requestor } from '../../factory/requestor/requestor';
export default class DashStorage{
 
    static getMaterias(){
        return new Promise((resolve, reject) =>
            new Requestor().get('materias')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error)));
    }
}