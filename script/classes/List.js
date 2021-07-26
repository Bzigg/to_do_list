"use strict";
/**
 * класс списка c pfvtnrfvb. 
 * this.data - объект данных с бл. где notes - массив заметок; yet - есть ли еще заметки (bool)
 * this.notes - массив отрендеринных заметок 
 * this.layout - отрендеринный вид заметок
 */
class List {
    constructor(data) {
        this.data = data;
        this.notes = [];
        this.layout = '';
    }
    /**
     * начинает монтаж списка
     * обнуляет this.notes и this.layout
     * @returns - отрендеренный список
     */
    mount() {
        this.notes = [];
        this.layout = '';

        let arrayNotes = this.data.notes;
        for (let value of arrayNotes) {
            let note = factory.create(Note, value);
            this.notes.push(note.render());
        }
        return this.render();
    }
    /**
     * рендер списка. при необходимости добавит кнопку
     * @returns вернет переменную с готовым списком
     */
    render() {
        for (let value of this.notes) {
            this.layout += value;
        }
        if (this.data.yet && !document.querySelector('.main__cards-bottom')) {
            this.addMoreBtn();
            return this.layout;
        }
        else if (!this.data.yet && document.querySelector('.main__cards-bottom')) {
            document.querySelector('.main__cards-bottom').remove();
        }
        return this.layout;

    }
    /**
     * добавляет кнопку в верстку
     */
    addMoreBtn() {
        let cardBlock = document.querySelector('.main__cards-block');
        cardBlock.append(this.renderMoreBtn());
    }
    /**
     * рендер кнопки
     * @returns макет кнопки
     */
    renderMoreBtn() {
        let btn = document.createElement('div');
        btn.className = 'main__cards-bottom';
        btn.innerHTML = '<button class="main__cards-btn btn">Ещё</button>';
        return btn;
    }
}

