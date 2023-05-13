// https://www.youtube.com/watch?v=ZmpO65DhRN0   Resource

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVxHVp67nhuswGVEuWyvtTBLReEnmnz0M",
  authDomain: "easycost-419c4.firebaseapp.com",
  projectId: "easycost-419c4",
  storageBucket: "easycost-419c4.appspot.com",
  messagingSenderId: "540554280311",
  appId: "1:540554280311:web:9d529f0f13e1b0323cf572",
  measurementId: "G-L14E26FBEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";

export const auth = getAuth();

export const signUp = async (email: string, password = "password") => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return user;
  } catch (error) {
    return { error };
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};
// export const deleteUserFirebase = async (uid: string) => {
//   try {
//     await deleteUser(uid);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//   }
// };
