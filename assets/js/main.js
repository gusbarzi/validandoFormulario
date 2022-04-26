class FormValidate {
    constructor() {
        this.form = document.querySelector('.class__form');


        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.isValid();
        const validPassword = this.passwordIsValid();

        if(validFields && validPassword) {
            alert('Formulário enviado.')
            this.form.submit();        
        }
    }

    passwordIsValid() {
        let valid = true;

        const password = this.form.querySelector('.password'); 
        const repeatPassword = this.form.querySelector('.repeat__password');

        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, "Campos 'senha e repetir senha' precisam ser iguais.")
            this.createError(repeatPassword, "Campos 'senha e repetir senha' precisam ser iguais.")
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    isValid() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error__text')) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.createError(field, `O campo '${label}' não podem estar em branco`);
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.cpfValidator(field)) valid = false;
            }

            if(field.classList.contains('user')) {
                if(!this.userValidator(field)) valid = false;
            }
        }

        return valid;
    }  

    userValidator(field) {
       const user = field.value;
       let accept = true
       if(user.length < 3 || user.length > 12) {
           this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
           accept = false;
       }

       if(!user.match(/^[a-zA-Z0-9]+$/g)) {
        this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números.');
        accept = false;
    }

        return accept;
    }
    
    cpfValidator(field) {
        const cpf = new Validate(field.value);

        if(!cpf.valid()) {
            this.createError(field, 'CPF inválido')
            return false;
        }
        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error__text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valid = new FormValidate();