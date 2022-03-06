exports.success = ((req, res, message, data, status) => {
    res.status(status || 200).send({
        code: status || 200,
        description: message,
        type: 'success',
        content: data
    })
});

exports.error = ((req, res, message, status, error) => {
    if (error) {
        console.log(error);
    }
    res.status(status || 500).send({
        code: status || 500,
        description: message,
        type: 'error',
        content: null
    })
});
