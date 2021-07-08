class User {
    constructor() {
        this.name = '';
        this.idNote;
        this.listNotes = new List();
    }
    /**
     * 
     * @param {Object} item 
     * @returns id узла
     */
    getNoteId(item) {
        return item.id;
    }
    /**
     * 
     * @param {String} selector 
     * @returns вернет элемент
     */
    getSelector(selector) {
        return document.querySelector(selector);
    }
    /**
     * запрос имени пользователя с бэка по id из cookes (не реализованно)
     * инициализация рендера
     */
    getName() {
        let name = 'ddd';
        // запросить name
        this.name = name;
        this.getData();
    }
    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @returns готовый промис
     */
    getPromise(key, value) {

        let myPromise = new Promise(function (resolve) {
            fetch('http://localhost/projects/to_do_list/backend/app.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `${key}=${value}`
            })
                .then(function (data) {
                    resolve(data.text());
                })
        });
        return myPromise;

    }
    /**
     * запрос данных ис сервера
     */
    getData() {

        let notesPromise = this.getPromise('getDataNotes', 'last10')

        notesPromise.then(value => {

            let strNotes = value;
            this.listNotes.dataStr = strNotes;
            this.mount();

        });

        // debug(this.listNotes);

    }
    /**
     * выводим на страницу отрендеренные заетки
     */
    mount() {
        this.listNotes.parseData();
        this.listNotes.render();
        let layout = this.listNotes.layout;
        if (layout) {
            let cards = document.querySelector('.main__cards');
            cards.innerHTML = '';
            cards.innerHTML = layout;
            this.subscribeOnDelete();
        }
    }
    /**
     * подписываемся на удаление заметки
     */
    subscribeOnDelete() {
        let notes = document.querySelectorAll('.main__card-delete');
        notes.forEach(item => {
            item.addEventListener('click', this.onDeleteNotes.bind(this));
        });
    }
    /**
     * отписка от кнопки удаления
     * @param {Object} deleteBtn узел кнопки удаление
     */
    unsubscribeOnDelete(deleteBtn) {
        deleteBtn.removeEventListener('click', this.onDeleteNotes);
    }
    /**
     * отправляем запрос на удаление заметки
     * @param {Object} event 
     */
    onDeleteNotes(event) {
        this.idNote = this.getNoteId(event.target.parentNode);

        let deleteNote = this.getPromise('deleteNote', this.idNote);

        deleteNote.then((value) => {
            this.checkDeleteNote(value);
        });

    }
    /**
     * если с сервера пришел ответ (true) вызываем удаление заметки
     * @param {JSON} value 
     */
    checkDeleteNote(value) {
        let answer = JSON.parse(value);
        if (answer === true) {
            this.unmount(this.idNote);
        }
        else {
            alert('Ошибка при удалении данных');
        }
    }
    /**
     * инициализируем удаление заметки
     * @param {String} id номер заметки
     */

    unmount(id) {
        let note = document.getElementById(`${id}`);
        let deleteBtn = note.querySelector('.main__card-delete');
        this.unsubscribeOnDelete(deleteBtn);

        while (note.lastChild) {
            note.removeChild(note.lastChild);
        }
        note.remove();
    }



}