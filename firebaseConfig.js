import { getApp, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAoRif98tkoEXv0P6UEGsaPSoTfTTkGD_E',
    authDomain: 'coolkidsapp.firebaseapp.com',
    databaseURL: 'https://coolkidsapp.firebaseio.com',
    projectId: 'coolkidsapp',
    storageBucket: 'coolkidsapp.appspot.com',
    messagingSenderId: '710274765433',
    appId: '1:710274765433:ios:551337aa4c982162267aa8'
}


const initializeAppIfNecessary = () => {
    try {
        return getApp();
    } catch {
        return initializeApp(firebaseConfig);
    }
}
let app = initializeAppIfNecessary();
export const storageBucket = getStorage(app);