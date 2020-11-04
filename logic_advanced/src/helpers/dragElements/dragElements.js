export default class DragElements{

    static getSelecionados(){
        let ids = [];
        let input = document.querySelectorAll("ul.dir li label input")
        for (let i=0;  i < input.length; i++) {
            ids.push(input[i].getAttribute("data-id"));
        }
        return ids;
    }

    static destroiElemento(e) {
        console.log(document.querySelectorAll("#sortable1").length);
      }
}