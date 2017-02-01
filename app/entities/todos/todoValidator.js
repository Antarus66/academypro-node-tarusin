class TodoValidator {
    constructor() {
        this.restrictedValues = ['зрада', 'zrada', 'srada'];
        this.errors = {};
    }

    validateModel(todo){
        this.validateTitle(todo.title);

        if (!this.errors) {
            return true;
        } else {
            var e = new Error('Validation failed');
            e.errors = this.errors
            throw e;
        }
    }

    validateTitle(title){
        for (var value in this.restrictedValues) {
            if (title.includes(value)) {
                this.errors.title = 'Нам порібна перемога!';
                return false;
            }
        }

        return true;
    }
}

module.exports = new TodoValidator();