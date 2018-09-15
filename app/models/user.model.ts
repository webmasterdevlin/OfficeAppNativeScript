import {validate} from "email-validator";
// var validator = require('email-validator');

export class User {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;

    isValidEmail() {
        return validate(this.email);
        // return validator.validate(this.email);
    }
}