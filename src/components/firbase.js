import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCiHhWadOnNes9oMbQMrbIYAOmjKvZBOQA",
    authDomain: "vivdo-5a85d.firebaseapp.com",
    projectId: "vivdo-5a85d",
    storageBucket: "vivdo-5a85d.appspot.com",
    messagingSenderId: "404721812381",
    appId: "1:404721812381:web:6e775275fb22a1f0c36574",
    measurementId: "G-1RK36S06H8"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

