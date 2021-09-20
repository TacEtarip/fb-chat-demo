import { Router } from 'express';
import Route from './Route';
import { IFacebookWebHook } from '../../lib/FacebookInterfaces';
import { getConfig } from '../../config/config';

// ** Crea una ruta

export const crearRutaFB = (): Route => {

    const rutaNombre = 'fb';
    const router = Router();

    // *Agregar las rutas get, post aqui
    
    router.get('/', (req, res) => {
        return res.json({message: `Ruta /${rutaNombre} funciona`});
    });

    
    /**
     * * Crea POST para webhook de fb espera un body de tipo IFacebookWebHook el object debe ser 'page'
     */
    router.post('/webhook', (req, res) => {
        try {
            const body = req.body as IFacebookWebHook;
            if (body.object === 'page') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                body.entry.forEach((entry) => {
                    const webhook_event = entry.messaging[0];
                    console.log(webhook_event);
                });
                return res.status(200).send('EVENT_RECEIVED');
              } else {
                return res.status(404).json({error: 'El evento no es de una pagina de subscripcion'});
              }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    });

        
    /**
     *  * Crea GET espera un query donde el mode tiene que ser subscribe y 
     *  * dar el token secreto en hub.verify_token, el challange en hub.challenge y el mode en hub.mode
     */
    //
    router.get('/webhook', (req, res) => {
            const VERIFY_TOKEN = getConfig(process.env.NODE_ENV).verify_fb;
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];
            if (mode && token) {
              if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                return res.status(200).send(challenge);
              } else {
                return res.status(403).json({error: 'Verificacion fallida'});    
              }
            } else {
                return res.status(403).json({error: 'Verificacion fallida'});    
            } 
  });

    const rutaEjemplo = new Route(rutaNombre, router);

    return rutaEjemplo;
};
