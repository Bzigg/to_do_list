"use strict";

const factory = new AbstractFactory();
let user = factory.create(User);
user.init();