import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

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
/* INITIALIZE */
/* ====================================================== */

const app =
  initializeApp(firebaseConfig);

const analytics =
  getAnalytics(app);

/* ====================================================== */
/* AUTH */
/* ====================================================== */

export const auth =
  getAuth(app);

/* ====================================================== */
/* PROVIDERS */
/* ====================================================== */

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();