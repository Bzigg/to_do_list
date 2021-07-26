"use strict";
class AbstractFactory {
    create(component, options) {
        return new component(options || {});
    }
}