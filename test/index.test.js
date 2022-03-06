const app = require("../app");
const request = require("supertest");

/**
 * Testing entitie's get data
 */
describe('GET /api/entities/filter', () => {

    it('It responds with 400 status code', (done) => {
        request(app)
            .get('/api/entities/filter')
            .set('Accept', 'application/json')
            .expect(/{"code":400,"description":"Error en validación datos de entrada","type":"error","content":null}/)
            .expect(400, done);
        // done();
    }).timeout(10000);

    it('It responds with 200 status code', (done) => {
        request(app)
            .get('/api/entities/filter')
            .set('Accept', 'application/json')
            .set({
                startid: "1",
                endid: "2"
            })
            .expect(200, done);
    }).timeout(10000);
});
