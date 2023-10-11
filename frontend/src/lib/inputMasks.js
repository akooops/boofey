import Cleave from 'cleave.js';


export function phoneMask(){
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {

        new Cleave(input, {
            prefix: '05',
            delimiter: '',
            blocks: [2, 8],
            numericOnly: true,
        });

    })
    
}