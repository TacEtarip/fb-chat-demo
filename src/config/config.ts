// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import bunyan from 'bunyan';
import pjs from '../../package.json';

// * Obtiene el json package
const { version } = pjs;

// * Crea un logger
const getLogger = (serviceName: string, serviceVersion: string) => 
bunyan.createLogger({ name: `${serviceName}:${serviceVersion}` });

/**
 * * Configuración segun env 
 */
const config = {
	development: {
        estado: 'development',
        port: parseInt(process.env.PORT_DEV),
        verify_fb: process.env.VERIFY_TOKEN,
        log: (): bunyan => getLogger('DEVELOPMENT', version),
	},

	production: {
        estado: 'production',
        port: parseInt(process.env.PORT_DEV),
        verify_fb: process.env.VERIFY_TOKEN,
        log: (): bunyan => getLogger('PRODUCCION', version),
	},

    test: {
        estado: 'test',
        verify_fb: process.env.VERIFY_TOKEN,
        port: 1,
        log: (): bunyan => getLogger('TEST', version),
    },
};

/**
 * Adquiere una configuración segun el tipo de env
 * @param env 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfig = (env: string) => {
    switch (env) {
        case 'development':
            return config.development;
        case 'production':
            return config.production;
        case 'test':
            return config.test;                    
        default:
            break;
    }
    return null;
}
