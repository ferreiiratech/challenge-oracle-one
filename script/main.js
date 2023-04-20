const textareaInput = document.querySelector('#textarea');
const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDecrypt = document.querySelector('#btn-decrypt');
const sectionOutput = document.getElementById('section-output');

// Define um objeto com as substituições de vogais a serem usadas 
// na criptografia e descriptografia
const replacements = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
};

// Verifica se o botão "Criptografar" ou "Descriptografar" 
// foi clicado, e aplica a criptografia ou descriptografia
// com base no objeto "replacements"
const replaceVowels = (event, str) => {
    const vowels = /[aeiou]/g;
    const regexSubs = /(ai|enter|imes|ober|ufat)/g;

    if (event.target === btnEncrypt) {
        return str.replace(vowels, match => replacements[match]);
    } else {
        const invertedSubstitutions = {};
        for (let vowel in replacements) {
            invertedSubstitutions[replacements[vowel]] = vowel;
        }
        return str.replace(regexSubs, match => invertedSubstitutions[match]);
    }
};

// Cria um <textarea> e um botão "Copiar" para exibir o resultado
const textareaOutput = document.createElement('textarea');
textareaOutput.id = 'text-result';
textareaOutput.style.resize = 'none'

const btnCopy = document.createElement('button');
btnCopy.classList.add('btn-general');
btnCopy.id = 'btn-copy';
btnCopy.type = 'submit';
btnCopy.textContent = 'Copiar';

// exibe o resultado na tela
const displayResult = str => {
    if (textareaInput.value !== '') {
        sectionOutput.innerHTML = '';
        textareaOutput.value = ''
        sectionOutput.appendChild(textareaOutput);
        sectionOutput.appendChild(btnCopy);

        let i = 0;
        const intervalId = setInterval(() => {
            textareaOutput.value += str[i];
            i++;
            if (i === str.length) {
                clearInterval(intervalId);
            }
        }, 15); 
    }
};

// Função para Criptografar ou Descriptografar o texto inserido pelo usuário
const encryptDecrypt = event => {
    const str = textareaInput.value.toLowerCase();
    const newStr = replaceVowels(event, str);
    displayResult(newStr);

    if (event.target === btnEncrypt){
        setTimeout(() => changeText('Criptografado', 'Criptografar', btnEncrypt), 10);
    } else{
        setTimeout(() => changeText('Descriptografado', 'Descriptografar', btnDecrypt), 10);
    }    
}

// Função para alterar o texto do botão após o clique
const changeText = (strtemporary, strOriginal, btn) => {
    textareaInput.placeholder = "Digite seu texto aqui"
    if (textareaInput.value !== '') {
        btn.textContent = strtemporary;
        setTimeout(() => {
        btn.textContent = strOriginal;
        }, 1500);
    } else{
        textareaInput.placeholder = "Primeiro digite seu texto aqui"
    }
};

// Função para copiar o texto criptografado ou descriptografado
const copyContent = () => {
    const text = textareaOutput.value;
    const elementTemporary = document.createElement('textarea');
    elementTemporary.value = text;
    document.body.appendChild(elementTemporary);
    elementTemporary.select();
    document.execCommand('copy');
    document.body.removeChild(elementTemporary);

    setTimeout(() => changeText('Copiado', 'Copiar', btnCopy), 10);
};

const changeTextareaBackgroundcolor = () => {
    if (textareaInput.value === '') {
        textareaInput.style.background = 'transparent';
    } else {
        textareaInput.style.background = '#d8dfe86c';
    }
}

btnEncrypt.addEventListener('click', encryptDecrypt);
btnDecrypt.addEventListener('click', encryptDecrypt);
btnCopy.addEventListener('click', copyContent);
textareaInput.addEventListener('input', changeTextareaBackgroundcolor);