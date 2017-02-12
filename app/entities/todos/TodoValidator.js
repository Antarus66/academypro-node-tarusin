const Validator = require('../../common/Validator');

class TodoValidator extends Validator{
    constructor() {
        super();

        this.rules = {
            title: 'required|nozrada'
        };

        Object.assign(this.errorMessages, {
            nozrada: 'Zrada is not allowed! We need a victory!'
        });
    }

    validateNozrada(object, fieldName) {
        if (!object.hasOwnProperty(fieldName)) {
            return true;
        }

        let value = object[fieldName];

        return !(value.includes('зрада') || value.includes('zrada'));
    }
}

module.exports = new TodoValidator();