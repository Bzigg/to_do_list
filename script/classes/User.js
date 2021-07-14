class User {
    constructor() {
        this.name = '';
        this.idNote;
        this.listNotes = new List();
        this.flagEventSave = 0;
        this.bindFunction;
        this.bindFunctions = {};
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
        this.subscribeInput('note__title');
        this.subscribeInput('note__discription');
        this.mountInput('note__title')
        this.mountInput('note__discription')
        this.getData();
        if (this.flagEventSave == 0) {
            this.subscribe(this.getSelector(`.note__save`), 'click', this.setNote, ['note__title', 'note__discription'], 'saveNote');
        }
    }
    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @returns готовый промис
     */
    getPromise(key, value, type = 'x-www-form-urlencoded') {

        let body = `${key}=${value}`

        if (type == 'json') {
            let newNote = {};
            newNote[key] = value;
            body = JSON.stringify(newNote);
            // body = JSON.stringify({ `${key}`: value })
        }

        let myPromise = new Promise(function (resolve) {
            fetch(`${window.location.href}backend/app.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': `application/${type}`,
                },
                body: body
                // body: `${key}=${value}`
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
            let notes = document.querySelectorAll('.main__card-delete');
            notes.forEach(item => {
                this.subscribe(item, 'click', this.onDeleteNotes, [], 'deleteNote');
            });
            // this.subscribeOnDelete();
        }
    }

    /**
     * отправляем запрос на удаление заметки
     * @param {Object} event 
     */

    //как передать event при подписке
    onDeleteNotes(/*argArr, event*/) {
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
        this.unsubscribe(deleteBtn, 'click', this.bindFunctions['deleteNote']);
        // this.unsubscribeOnDelete(deleteBtn);

        while (note.lastChild) {
            note.removeChild(note.lastChild);
        }
        note.remove();
    }
    subscribeInput(classInput) {
        let input = this.getSelector(`.${classInput}`);
        input.addEventListener('input', this.getInputValue.bind(this, { classInput }));
    }

    getInputValue({ classInput }) {
        let value = this.getSelector(`.${classInput}`).value;
        this.setLocalStorage(classInput, value);
    }
    setLocalStorage(classInput, value) {
        localStorage.setItem(classInput, value);
    }
    getLocalStorage(classInput) {
        let value = localStorage.getItem(classInput);
        return { classInput, value };
    }
    cleanLocalStorage(classInput) {
        localStorage.removeItem(`${classInput}`);
    }
    cleanInput(classInput) {
        this.getSelector(`.${classInput}`).value = '';
    }
    mountInput(classInput) {
        let value = this.getLocalStorage(classInput);
        this.getSelector(`.${classInput}`).value = value['value'];
    }

    subscribe(elem, event, func, argArr = [], key) {
        this.bindFunctions[key] = func.bind(this, argArr)
        elem.addEventListener(event, this.bindFunctions[key]);
    }
    unsubscribe(elem, event, func) {
        elem.removeEventListener(event, func);
    }
    setNote(argArr, e) {
        e.preventDefault();
        let noteValue = {};

        for (let classInput of argArr) {
            this.cleanInput(classInput);
            noteValue[classInput] = this.getLocalStorage(classInput)['value'];
            // noteValue[`${classInput}`] = this.getLocalStorage(classInput)['value'];
            this.cleanLocalStorage(classInput);
        }



        if (noteValue['note__title'] != null) {
            this.setServer(noteValue, e);
        }
        else {
            alert('Заполните заголовок');
        }
    }
    setServer(noteValue/*, e*/) {
        let strNoteValue = noteValue;
        // let strNoteValue = JSON.stringify(noteValue);
        let notePromise = this.getPromise('note', strNoteValue, 'json');

        notePromise.then(value => {
            // debug(value);
            // debug(value);
            // debug(JSON.parse(value));
            if (JSON.parse(value) == true) {
                let cards = document.querySelector('.main__cards');
                cards.innerHTML = '';
                // this.unsubscribe(e.target, 'click', this.setNote);
                this.unsubscribe(this.getSelector(`.note__save`), 'click', this.bindFunctions['saveNote']);
                // this.flagEventSave = 1;
                this.getName();
                return;
            };
            alert('запись не добавленна');
        });
    }


}