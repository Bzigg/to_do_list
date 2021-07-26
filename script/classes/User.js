"use strict";
/**
 * класс пользовотеля. инициализирует отрисовку страницы
 * включает 2 приватных свойства:
 * #flagEventSave - флаг подписки на кнопку "сохранить"
 * #flagMoreNotes - флаг подписки на кнопку "показыть еще"
 * свойство this.listNotes - обьект "список заметок"
 */
class User extends Component {
    #flagEventSave;
    #flagMoreNotes;
    constructor() {
        super();
        this.listNotes = factory.create(List);
        this.#flagEventSave = 0;
        this.#flagMoreNotes = 0;
    }
    /**
     * инициализация отрисовки заметок
     */
    init() {
        this._beforeMount();
        if (this.#flagEventSave === 0) {
            this.setBindFunctions('subscribeOnSave', this._getNote.bind(this))
            this.subscribe(this.getElement('.note__save'), 'click', this.getBindFunctions('subscribeOnSave'));
        }
    }
    /**
     * отправляет запрос перед монтированием
     * @param {Number} lastNote id номер последней заметки. если 0 то заметок нет
     */
    _beforeMount(lastNote = 0) {
        let cardsContainer = this.getElement('.main__cards');
        let queryData = this.getPromise('getDataNotes', `${lastNote}`);

        queryData.then(value => {
            this.listNotes.data = JSON.parse(value);
            this._mount(cardsContainer);
        })
    }
    /**
     * монтирует заметки на страницу, или сообщение об их отсутствии
     * @param {Object} cardsContainer - элемент, куда вставляем вертску
     */
    _mount(cardsContainer) {
        let cards = this.listNotes.mount();
        if (cards != '') {
            cardsContainer.innerHTML += cards;
            this._afterMounth();
        }
        else {
            cardsContainer.innerHTML = 'В данный момент записей не обнаруженно';
        }
    }
    /**
     * действие после монтирования. подписки на кнопки
     */
    _afterMounth() {
        this.setBindFunctions('deleteNote', this._deleteNote.bind(this));
        let notes = document.querySelectorAll('.main__card-delete');
        notes.forEach(item => {
            this.subscribe(item, 'click', this.getBindFunctions('deleteNote'));
        });
        let btn = this.getElement('.main__cards-btn');
        if (btn && this.#flagMoreNotes != 1) {
            this.setBindFunctions('moreNotes', this._moreNotes.bind(this));
            this.subscribe(btn, 'click', this.getBindFunctions('moreNotes'));
            this.#flagMoreNotes = 1;
        }
    }
    /**
     * размонтирование замети
     * @param {Number} id - номер заметки, которую удаляем
     */
    _unmount(id) {
        let note = document.getElementById(`${id}`);
        let deleteBtn = note.querySelector('.main__card-delete');
        this.unsubscribe(deleteBtn, 'click', this.getBindFunctions('deleteNote'));
        this.deleteElement(note);

    }
    /**
     * получение данных из полей
     * @param {Object} event - событие кнопки "сохранить"
     */
    _getNote(event) {
        event.preventDefault();

        let note = {};

        let noteTitle = this.getElement('.note__title').value.trim();
        if (noteTitle != '') {
            let noteDiscription = this.getElement('.note__discription').value.trim();

            this.cleanInput('note__title');
            this.cleanInput('note__discription');

            note['note__title'] = noteTitle;
            note['note__discription'] = noteDiscription;

            this._pushOnServer(note);
        }
        else {
            alert('Заполните заголовок');
        }
    }
    /**
     * отправляем в бл
     * @param {Object} note заметка: title + discription
     */
    _pushOnServer(note) {
        let pushPromise = this.getPromise('note', note, 'json');

        pushPromise.then(value => {
            if (JSON.parse(value) == true) {
                let cards = this.getElement('.main__cards');
                this.deleteChilds(cards);

                this.#flagEventSave = 1;
                this.init();
                return;
            }
            else {
                alert('Проблемы при записи в базу данных');
            }
        })
    }
    /**
     * инициализирует удаление заметки.
     */
    _deleteNote() {
        let idNote = event.target.parentNode.id;

        let deleteNote = this.getPromise('deleteNote', idNote);

        deleteNote.then((value) => {
            this._checkDeleteNote(value, idNote);
        });
    }
    /**
     * проверяет ответ из бл.
     * @param {String} value - ответ из бл
     * @param {Number} idNote - id заметки
     */
    _checkDeleteNote(value, idNote) {
        let answer = JSON.parse(value);
        if (answer === true) {
            this._unmount(idNote);
        }
        else {
            alert('Ошибка при удалении данных');
        }
    }
    /**
     * инициализирует монтирование заметок по кнопке "еще"
     */
    _moreNotes() {
        let lastNote = this.getLastNote();
        this._beforeMount(lastNote);
    }/**
     * получает все заметки и возвращает id последней
     * @returns Number
     */
    getLastNote() {
        let allNotes = document.querySelectorAll('.main__card');
        return allNotes[allNotes.length - 1].id;
    }
}