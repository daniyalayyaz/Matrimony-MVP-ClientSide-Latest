import { LocalStorageItem } from "src/app/helpers/localStorageItem.enum";

export const environment = {
  firebase: {
    projectId: 'matrimony-e3819',
    appId: '1:180744314389:web:55e81ae908e81070f9f81c',
    storageBucket: 'matrimony-e3819.appspot.com',
    apiKey: 'AIzaSyD2kuWKeU24zNtatobz51E1xPXA7dR3bP8',
    authDomain: 'matrimony-e3819.firebaseapp.com',
    messagingSenderId: '180744314389',
  },
  production: true,
  apiBaseUrl: '{{environment.url}}/api',
};
