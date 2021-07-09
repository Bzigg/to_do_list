class List {
    constructor(dataStr) {
        this.dataStr = dataStr;
        // this.dataObj = {};
        this.notes = [];
        this.layout = '';
    }
    /**
     * парсим данные с сервера и передаем в dataObj
     * создаем экземпляр заметки
     */
    parseData() {
        let dataObj = JSON.parse(this.dataStr);
        for (let key in dataObj) {
            this.notes.push(new Note(key, dataObj[key]));
        }
    }
    /**
     * рендер заметки
     */
    render() {
        for (let value of this.notes) {
            let note = `
            <div class="main__card" id="${value.id}">
                <img src="images/ui/close_x.png" alt="Закрыть" class="main__card-delete">
                <div class="main__card-title">${value.title}</div>
                <div class="main__card-discription">${value.discription}</div>
                <div class="main__card-date">${value.date}</div>
            </div>`;
            this.layout += note;
        }
    }
}