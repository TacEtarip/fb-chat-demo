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

    router.get('/webhook', (req, res) => {
            const VERIFY_TOKEN = getConfig(process.env.NODE_ENV).verify_fb;
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];
            if (mode && token) {
              if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                console.log('WEBHOOK_VERIFIED');
                return res.status(200).send({message: 'Verificacion exitosa', challenge});
            
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
