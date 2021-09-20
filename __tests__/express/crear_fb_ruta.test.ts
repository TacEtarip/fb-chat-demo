import { crearRutaFB } from '../../src/server/routes/facebookRoute'
import ExpressAPP from '../../src/server/ExpressAPP';
import request from 'supertest';
import Route from '../../src/lib/Route';
import { IFacebookWebHook } from '../../src/lib/FacebookInterfaces';
import { getConfig } from '../../src/config/config';

const rutaBase = '/fb';

const webhookPostBodyFAIL404 = {object: 'page2', entry: [{messaging: [{message: 'TEST_MESSAGE'}]}]} as IFacebookWebHook;
const webhookPostBody = {object: 'page', entry: [{messaging: [{message: 'TEST_MESSAGE'}]}]} as IFacebookWebHook;
const webhookPostBodyFAIL500 = {object: 'page'};

describe('Crracion de la ruta fb (para facebook)', () => {
    let appExp: ExpressAPP;
    let rutaCreada: Route;

    beforeAll(() => {
        appExp = new ExpressAPP(8084);
        rutaCreada = crearRutaFB();
        appExp.app.use(rutaCreada.ruta, rutaCreada.router);
        appExp.crearServidor();
    });

    it('La ruta base es la adecuada', () => {
        expect(rutaCreada.ruta).toBe(rutaBase);
    });

    it('La ruta / es correcta', async () => {
        const response = await request(appExp.app).get(rutaBase);
        expect(response.statusCode).toBe(200);
    });

    it('La ruta /webhook POST es correcta', async () => {
        const response = await request(appExp.app).post(rutaBase + '/webhook')
        .send(webhookPostBody);
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')

        const errorMsg = {error: 'El evento no es de una pagina de subscripcion'}
        const errorResponse = await request(appExp.app).post(rutaBase + '/webhook')
        .send(webhookPostBodyFAIL404);
        expect(errorResponse.body).toStrictEqual(errorMsg)
        expect(errorResponse.statusCode).toBe(404);

        const errorResponse500 = await request(appExp.app).post(rutaBase + '/webhook')
        .send(webhookPostBodyFAIL500);
        expect(errorResponse500.statusCode).toBe(500);
    });

    it('La ruta /webhook GET es correcta', async () => {
        const config = getConfig('test');
        const challenge = 'CHALLENGE_ACCEPTED';
        const response = await request(appExp.app)
        .get(rutaBase + `/webhook?hub.verify_token=${config.verify_fb}&hub.challenge=${challenge}&hub.mode=subscribe`);
        expect(response.statusCode).toBe(200);

        const errorMsg = {error: 'Verificacion fallida'}
        const errorResponse = await request(appExp.app)
        .get(rutaBase + '/webhook?hub.verify_token=otrotoken&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe');
        expect(errorResponse.body).toStrictEqual(errorMsg)
        expect(errorResponse.statusCode).toBe(403);

        const errorResponseST = await request(appExp.app)
        .get(rutaBase + '/webhook?hub.verify_token=otrotoken&hub.mode=subscribe');
        expect(errorResponseST.body).toStrictEqual(errorMsg)
        expect(errorResponseST.statusCode).toBe(403);

        const errorResponseTT = await request(appExp.app)
        .get(rutaBase + '/webhook');
        expect(errorResponseTT.statusCode).toBe(403);

        const errorResponseFT = await request(appExp.app)
        .get(rutaBase + `/webhook?hub.verify_token=${config.verify_fb}&hub.challenge=${challenge}&hub.mode=nops`);
        expect(errorResponseFT.statusCode).toBe(403);
    });

    afterAll(() => {
        appExp.server.close();
    });
    
});
