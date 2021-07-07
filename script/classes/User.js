class User {
    constructor() {
        this.name = '';
        this.listNotes = new List();
    }
    /**
     * запрос имени пользователя с бэка по id из cookes
     */

    getName() {
        let name = 'ddd';
        // запросить name
        this.name = name;
    }
    /**
     * запрос последних 10 заявок из бэкенда и направление в list
     */
    getData() {
        this.listNotes.dataStr = strNotes;
        // debug(this.listNotes);
        this.mount();
    }
    /**
     * выводим на страницу
     */
    mount() {
        this.listNotes.parseData();
        this.listNotes.render();
        let layout = this.listNotes.layout;
        if (layout) {
            let cards = document.querySelector('.main__cards');
            cards.innerHTML = '';
            cards.innerHTML = layout;
        }
    }
}