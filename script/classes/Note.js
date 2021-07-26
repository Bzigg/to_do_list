"use strict";
/**
 * класс заметки. имеет набор опций
 */
class Note {
    constructor(options) {
        for (let k in options) {
            this[k] = options[k];
        }
    }
    /**
     * рендер заметки
     * @returns заметка в виде строки
     */
    render() {
        return `
        <div class="main__card" id="${this.id_note}">
            <img src="images/ui/close_x.png" alt="Закрыть" class="main__card-delete">
            <div class="main__card-title">${this.title}</div>
            <div class="main__card-discription">${this.discription}</div>
            <div class="main__card-date">${this.date}</div>
        </div>`;
    }
}