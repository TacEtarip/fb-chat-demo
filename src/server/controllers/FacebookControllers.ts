/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConfig } from '../../config/config';
import { IFacebookWebHook } from '../../lib/FacebookInterfaces';
import { Request, Response } from 'express';
/**
 * Controladores para facebook
 *
 * @export
 * @class FaceBookController
 */
export default class FaceBookController {
    VERIFY_TOKEN: string;

    constructor(public ruta: string) {
        this.ruta = ruta;
        this.VERIFY_TOKEN = getConfig(process.env.NODE_ENV).verify_fb;
    }

    /**
     * Verificar webhook
     *
     * @memberof FaceBookController
     */
    verificacionTokenWebhook = (req: Request, res: Response): any => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === this.VERIFY_TOKEN) {
                return res.status(200).send(challenge);
            } else {
                return res.status(403).json({error: 'Verificacion fallida'});    
            }
        } else {
            return res.status(403).json({error: 'Verificacion fallida'});    
        } 
    }

    /**
     * Recivir webhook
     *
     * @memberof FaceBookController
     */
    recivirWebHook = (req: Request, res: Response): any => {
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
    }
}
