const { Router } = require('express');
const router = Router();
const entityController = require('../controllers/entityController');

/**
 * @api {get} /api/entities/filter Filtrar entidades
 * @apiName getOrderedEntitiesByName
 * @apiVersion 1.0.0
 * @apiGroup Entities
 * @apiHeader {Number{1..20}} startId Identificador de entidad que indica el inicio del rango a filtrar
 * @apiHeader {Number{1..20}} endId Identificador de entidad que indica el final del rango a filtrar
 * @apiSuccess {Number} code Código de respuesta
 * @apiSuccess {String} description Descripción de la respuesta
 * @apiSuccess {String=success,error} type Tipo de respuesta, exitoso o con error
 * @apiSuccess {Object[]} content
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      'code': 200,
 *      'description': "OK",
 *      'type': "success",
 *      '"content': [
 *          {"entityId": 2, "name": "Bancolombia", "identificationNumber": "987654321", "expirationDate": "2030-10-27",…},
 *          {"entityId": 3, "name": "Mi Aguila", "identificationNumber": "9008508671", "expirationDate": "2030-10-27",…},
 *          {"entityId": 1, "name": "Tuya", "identificationNumber": "123456789", "expirationDate": "2030-10-27",…}
 *      ]
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    HTTP/1.1 400 Bad request
 *    HTTP/1.1 404 Not found
 */
router.get('/api/entities/filter', entityController.getOrderedEntitiesByName);

module.exports = router;
