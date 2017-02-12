class Validator {
    constructor() {
        this.errors = {};

        this.errorMessages = {
            required: 'This field is required'
        };
    }

    validate(object) {
        this.errors = {};

        for (let field in this.rules) {
            let fieldRulesString = this.rules[field];

            if (!fieldRulesString) {
                continue;
            }

            let fieldRules = fieldRulesString.toLowerCase().split('|');

            for (let i = 0; i < fieldRules.length; i++) {
                this.checkRule(object, field, fieldRules[i]);
            }
        }

        return Boolean(!this.hasErrors());
    }

    checkRule(object, fieldName, ruleName) {
        let ruleNameCapitalized = ruleName[0].toUpperCase() + ruleName.slice(1);
        let validatorFuncName = 'validate' + ruleNameCapitalized;

        if (!this[validatorFuncName]) {
            throw new Error('No validation function for the "' + ruleName + '"rule!');
        }

        let isValid = this[validatorFuncName](object, fieldName);

        if (!isValid) {
            this.addErrorMessage(fieldName, ruleName);
        }
    }

    addErrorMessage(fieldName, ruleName) {
        if (!this.errors.hasOwnProperty(fieldName)) {
            this.errors[fieldName] = [];
        }

        if (this.errorMessages.hasOwnProperty(ruleName)) {
            this.errors[fieldName].push(this.errorMessages[ruleName]);
        } else {
            this.errors[fieldName].push(Validator.getDefautErrorMessage(fieldName, ruleName));
        }
    }

    static getDefautErrorMessage(fieldName, ruleName) {
        return "'" + fieldName + "' property is invalid. Rule " + ruleName + " is violated";
    }

    hasErrors() {
        let hasErrors = false;

        for (let error in this.errors) {
            hasErrors = true;
            break;
        }

        return hasErrors;
    }

    getErrors() {
        return this.errors;
    }

    validateRequired(object, fieldName) {
        return object.hasOwnProperty(fieldName) && object[fieldName] !== '';
    }
}

module.exports = Validator;