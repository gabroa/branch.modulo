const form = document.getElementById('form-validate')

const fieldA = document.getElementById('field-a')
const fieldB = document.getElementById('field-b')

const messageSuccess = document.getElementById('sucess-message')

formStatus = null

submitActivy = false

const messages = {
    empty: 'O campo não pode estar vazio. Por favor, preencha um valor.',
    invalid: 'O valor deve ser maior que zero.',
    success: 'Sucesso! O valor foi registrado corretamente.',
    comparison: 'O valor de B deve ser maior que o valor de A.'
};

function messageError(objectInput, objectMessage, type='error', textMessage){
    console.log(typeof(objectMessage))
    objectMessage.classList.add(type)
    objectMessage.innerHTML = textMessage
    objectInput.style.borderColor = 'red'
}


//Valida se o campo está vazio ou contém números
function validateInputEmpty(value, type = 'text') {
    if (value.trim() === '') {
        return { message: messages.empty, status: false };
    }

    if (type === 'number' && value <= 0) {
        return { message: messages.invalid, status: false };
    }

    return { message: messages.success, status: true };
}

//Faz a comparação se o valor B é menor ou maior que A
function validateComparison(fieldA, fieldB) {
    const valueA = parseFloat(fieldA.value);
    const valueB = parseFloat(fieldB.value);

    if (!isNaN(valueA) && !isNaN(valueB) && valueB <= valueA) {
        return { message: messages.comparison, status: false };
    }

    return { message: messages.success, status: true };
}

function validateInput(inputElement) {
    const messageFieldB = document.getElementById('message-field-b')
    const messageElement = document.getElementById(`message-${inputElement.id}`);
    const fieldType = inputElement.type;

    formStatus = validateInputEmpty(inputElement.value, fieldType);

    if (!formStatus.status) {
        messageError(inputElement, messageElement, 'error', formStatus.message);
        submitActivy = false
        return
    } else {
        messageElement.classList.remove('error');
        inputElement.style = '';
    }

    // Valida comparação entre fieldA e fieldB
    if (inputElement.id === 'field-a' || inputElement.id === 'field-b') {
        const comparisonStatus = validateComparison(fieldA, fieldB);

        if (!comparisonStatus.status) {
            messageError(fieldB, messageFieldB, 'error', comparisonStatus.message);
            submitActivy = false
            return
        } else {
            messageFieldB.classList.remove('error');
            fieldB.style = '';
        }
    }

    submitActivy = true
}

// Eventos
addEventListener('submit', function (e) {
    e.preventDefault();

    // Armazena todos inputs dentro do formulário
    const formFields = document.querySelectorAll('form input');

    // Inicializa como true e verifica se algum campo falha na validação
    let allValid = true;

    // Passa por cada input separadamente
    formFields.forEach(field => {
        validateInput(field);

        // Se algum campo falhar, marca allValid como false
        if (!submitActivy) {
            allValid = false;
        }
    });

    if (allValid) {
        messageSuccess.classList.add('sucess')
        messageSuccess.innerHTML = `${fieldB.value} é maior que ${fieldA.value}. Agradecemos o envio!`
        fieldA.value = ''
        fieldB.value = ''
    }
});

//Ao apertar qualquer botão no campo
addEventListener('keyup', function(e){      
    validateInput(e.target);
})
