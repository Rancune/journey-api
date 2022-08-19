import { initializeApp } from 'firebase-admin/app';



export const appFirebase = () => {
    const app = initializeApp();
    console.log('########################### Init Firebase ###########################');
    return app;
}





