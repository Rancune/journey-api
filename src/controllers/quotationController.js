import { JourneyTravel } from '../models/travel.model.js';  



export function create ( travel ) {
    return new Promise( ( resolve, reject ) => {
        Travel.create( travel, ( err, travel ) => {
            if ( err ) {
                reject( err );
            }
            else {
                resolve( travel );
            }
        } );
    } );
}



export { create } ;