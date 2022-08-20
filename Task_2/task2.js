var formElement = document.forms['formElement'];

formElement.onfocus = function(evt) {
    var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
        activeElement.classList.remove('focused');
    }
    evt.target.classList.add('focused');
};

formElement.onblur = function(evt) {
    var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
        activeElement.classList.remove('focused');
    }
};