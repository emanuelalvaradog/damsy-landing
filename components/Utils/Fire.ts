import { initializeApp } from "firebase/app";

// Do firebase anlytics make the webpage singificantly slower?
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { CLIENT_STATIC_FILES_RUNTIME_MAIN_APP } from "next/dist/shared/lib/constants";

const firebaseConfig = {
  apiKey: "AIzaSyBxuKrKZj91I3cN-NHKF9OxZQH63I-fCFk",
  authDomain: "damsy-data.firebaseapp.com",
  projectId: "damsy-data",
  storageBucket: "damsy-data.appspot.com",
  messagingSenderId: "1018723982808",
  appId: "1:1018723982808:web:9d00eb7a69952df95f26ad",
  measurementId: "G-L0RWZPH03W",
};

let FireAnalytics;
const FireApp = initializeApp(firebaseConfig);

if (FireApp.name && typeof window !== "undefined") {
  FireAnalytics = getAnalytics(FireApp);
}

const FireDB = getFirestore(FireApp);

export { FireApp, FireDB, FireAnalytics };

// let self;

// class Fire {
//   constructor() {
//     self = this;
//   }

//   public static getApp() {
//     return self.app;
//   }

//   public static getDB() {
//     return self.db;
//   }

//   public static initialize() {
//     self.app = initializeApp(firebaseConfig);
//     self.analytics = getAnalytics(self.app);
//     self.db = getFirestore(self.app);
//   }
// }
