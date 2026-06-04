import { initializeApp } from "firebase/app";

import {

  getAuth,

  GoogleAuthProvider,

  GithubAuthProvider,

  setPersistence,

  browserLocalPersistence,

} from "firebase/auth";

import {
  getAnalytics,
  isSupported,
} from "firebase/analytics";

/* ====================================================== */
/* FIREBASE CONFIG */
/* ====================================================== */

const firebaseConfig = {

  apiKey:
    "AIzaSyB8W9A02oHTWGoo7-R2gDTxFHnUZwNz_KQ",

  authDomain:
    "uptoskillslms.firebaseapp.com",

  projectId:
    "uptoskillslms",

  storageBucket:
    "uptoskillslms.firebasestorage.app",

  messagingSenderId:
    "367026953122",

  appId:
    "1:367026953122:web:47333a7bff3279ea6f30fb",

  measurementId:
    "G-RNRT507XNE",
};

/* ====================================================== */
/* INITIALIZE APP */
/* ====================================================== */

const app =
  initializeApp(firebaseConfig);

/* ====================================================== */
/* ANALYTICS */
/* ====================================================== */

isSupported().then((yes) => {

  if (yes) {

    getAnalytics(app);
  }
});

/* ====================================================== */
/* AUTH */
/* ====================================================== */

export const auth =
  getAuth(app);

/* ====================================================== */
/* PERSISTENCE */
/* ====================================================== */

setPersistence(

  auth,

  browserLocalPersistence

).catch((error) => {

  console.log(
    "Persistence Error:",
    error
  );
});

/* ====================================================== */
/* GOOGLE PROVIDER */
/* ====================================================== */

export const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({

  prompt:
    "select_account",
});

/* ====================================================== */
/* GITHUB PROVIDER */
/* ====================================================== */

export const githubProvider =
  new GithubAuthProvider();

githubProvider.addScope(
  "user:email"
);

/* ====================================================== */
/* EXPORT APP */
/* ====================================================== */

export default app;