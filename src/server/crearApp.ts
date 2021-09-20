import ExpressAPP from './ExpressAPP';
import { crearRutaFB } from './routes/facebookRoute';
import { crearRutaExample } from './routes/exampleRoute';
/**
 * Crea una nueva aplicacion usando ExpressAPP
 * @param port 
 * @returns 
 */
export const nuevaApp = (port: number): ExpressAPP => {
    const expressAPP = new ExpressAPP(port);

    /**
     * *Crea rutas para el example
     */
    const rutasExpample = crearRutaExample();
    expressAPP.agregarRuta(rutasExpample);

    /**
     * *Crea rutas para fb
     */
    const rutasFB = crearRutaFB();
    expressAPP.agregarRuta(rutasFB);

    expressAPP.crearServidor();
    return expressAPP;
}