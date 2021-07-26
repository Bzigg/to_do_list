"use strict";
/**
 * Базовый компонент
 * имеет объект (_bindFunctions) функций с заданным контекстом (для подписки/отписи)
 */
class Component {
    constructor() {
        this._bindFunctions = {};
    }
    /**
     * сеттер для _bindFunctions
     * @param {String} key - ключ функции
     * @param {Object} functionBind - сама функция с контекстром
     */
    setBindFunctions(key, functionBind) {
        this._bindFunctions[key] = functionBind;
    }
    /**
     * геттер для _bindFunctions
     * @param {String} key - ключ функции
     * @returns функцию с контекстом
     */
    getBindFunctions(key) {
        return this._bindFunctions[key];
    }
    /**
     * получает элемент дома
     * @param {String} - selector селектор элемента
     * @returns элемент дома
     */
    getElement(selector) {
        return document.querySelector(selector);
    }
    /**
     * создает промис
     * @param {String} key - ключ запроса
     * @param {String || Object} value - значение запроса
     * @param {String} type - форма HTML
     * @param {String} method - метод передачи
     * @returns - созданный промис
     */
    getPromise(key, value, type = 'x-www-form-urlencoded', method = 'POST') {

        let body = '';
        if (type == 'json') {
            let request = {};
            request[key] = value;
            body = JSON.stringify(request);
        }
        else {
            body = `${key}=${value}`
        }

        let myPromise = new Promise(function (resolve) {
            fetch(`${window.location.href}backend/app.php`, {
                method: method,
                headers: {
                    'Content-Type': `application/${type}`,
                },
                body: body
            })
                .then(function (data) {
                    resolve(data.text());
                })
        });
        return myPromise;
    }
    /**
     * функция подниски
     * @param {Object} item - элемент на которое вешаем событие
     * @param {String} event - событие
     * @param {Object} func - функция
     */
    subscribe(item, event, func) {
        item.addEventListener(event, func);
    }
    /**
     * функция отписки
     * @param {Object} item - элемент с которого удаляем событие
     * @param {String} event - событие
     * @param {Object} func - функция
     */
    unsubscribe(item, event, func) {
        item.removeEventListener(event, func);
    }
    /**
     * удаление элемента и детей
     * @param {Object} element - элемент удаления
     */
    deleteElement(element) {
        while (element.lastChild) {
            element.lastChild.remove();
        }
        element.remove();
    }
    /**
     * удаление дочерних элементов элемента
     * @param {Object} element - элемент у которого удоляем дочерние элементы
     */
    deleteChilds(element) {
        while (element.lastChild) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * отчистка поля
     */
    cleanInput(classInput) {
        this.getElement(`.${classInput}`).value = '';
    }
}