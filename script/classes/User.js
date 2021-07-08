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
        this.getData();
    }
    /**
     * запрос последних 10 заявок из бэкенда и направление в list
     */
    getData() {

        let notesPromise = new Promise(function (resolve) {
            fetch('http://localhost/projects/to_do_list/backend/app.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `getDataNotes=last10`
            })
                .then(function (data) {
                    resolve(data.text());
                })
        });

        notesPromise.then(value => {

            let strNotes = value;
            this.listNotes.dataStr = strNotes;
            this.mount();

        });

        // debug(this.listNotes);

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