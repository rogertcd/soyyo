exports.validateIsInteger = (value) => {
    return !isNaN(value) && ((numero) => { return (numero | 0) === numero; })(parseFloat(value));
}

exports.validateIsDefined = (field) => {
    return (field !== undefined && field !== '');
}

exports.validateIsInRange = (numero, inicio, final) => {
    // let validacion = ((parseInt(numero) >= parseInt(inicio)) && (parseInt(numero) <= parseInt(final)));
    // console.log('validacionr', validacion);
    return ((parseInt(numero) >= parseInt(inicio)) && (parseInt(numero) <= parseInt(final)));
}