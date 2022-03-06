const axios = require('axios');
const response = require('../response');
const validation = require('../helpers/validation');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[ env ];

let getArrayWithURLs = (idInicio, idFinal) => {
        let arrayWithURLs = [];
        idInicio = idInicio || 1;
        for (let i = idInicio ; i <= idFinal ; i++) {
            let URL = config.RESOURCE_URL_ENTITY + i;
            arrayWithURLs.push(URL);
        }
        return arrayWithURLs;
    },
    getDataEntity = (URL) => {
        return axios
            .get(URL)
            .then(function(response) {
                let success = false,
                    data = null;
                if (response.data.type === 'success') {
                    success = true;
                    data = response.data.data;
                } else {
                    success = false;
                }
                return {
                    success: success,
                    data: data
                };
            })
            .catch(function(error) {
                return { success: false };
            });
    },
    getArrayOfEntities = (URLs) => {
        return new Promise( (resolve, reject) => {
            Promise.all( URLs.map(getDataEntity) )
                .then( async(response) => {
                    let arrayOfEntities = [];
                    await response.forEach((entityData) => {
                        if (entityData.success === true) {
                            arrayOfEntities.push(entityData.data);
                        } else {
                            reject('No se pudo obtener datos de entidades en el rango especificado');
                        }
                    });
                    resolve(arrayOfEntities);
                });
        });
    },
    sortEntitiesByName = (sortBy) => (a, b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1

exports.getOrderedEntitiesByName = async (req, res) => {
    // console.log('startid', req.headers.startid, 'endid', req.headers.endid);
    if ((validation.validateIsDefined(req.headers.startid)
        && validation.validateIsInteger(req.headers.startid)
        && validation.validateIsInRange(req.headers.startid, 1, 20))
        && (validation.validateIsDefined(req.headers.endid)
            && validation.validateIsInteger(req.headers.endid)
            && validation.validateIsInRange(req.headers.endid, 1, 20)))
    {
        let inicio = parseInt(req.headers.startid),
            final = parseInt(req.headers.endid);
        if (inicio <= final) {
            let URLs = await getArrayWithURLs(inicio, final);

            // console.log('URLs', URLs);

            getArrayOfEntities(URLs)
                .then((entities) => {
                    // console.log('entities', entities);
                    const sortedEntities = entities.sort(sortEntitiesByName('name'));
                    response.success(req, res, 'OK', sortedEntities, 200);
                })
                .catch((error) => {
                    response.error(req, res, "Error no se encuentra para rango especificado", 404, error);
                });
        } else {
            response.error(req, res, "Error en validación datos de entrada", 400);
        }
    } else {
        response.error(req, res, "Error en validación datos de entrada", 400);
    }
};