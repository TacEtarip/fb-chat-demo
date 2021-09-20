import Route from '../../lib/Route';
import FacebookControllers from '../controllers/FacebookControllers';
/**
 * Crea las rutas para facebook
 * @returns Route
 */
export const crearRutaFB = (): Route => {

    const rutaNombre = '/fb'

    const facebookRoute = new Route(rutaNombre);

    const fbControllers = new FacebookControllers(rutaNombre);

    facebookRoute.router.get('/', (req, res) => {
        return res.json({message: `Ruta ${rutaNombre} funciona`});
    });
    
    /**
     * * Crea POST para webhook de fb espera un body de tipo IFacebookWebHook el object debe ser 'page'
    */
     facebookRoute.router.post('/webhook', fbControllers.recivirWebHook);
        
    /**
     *  * Crea GET espera un query donde el mode tiene que ser subscribe y 
     *  * dar el token secreto en hub.verify_token, el challange en hub.challenge y el mode en hub.mode
    */
    facebookRoute.router.get('/webhook', fbControllers.verificacionTokenWebhook);

    return facebookRoute;
};
