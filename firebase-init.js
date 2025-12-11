// firebase-init.js
// Simple Firebase Firestore setup (Google Cloud)

// 1) Your config from Firebase console:
const firebaseConfig = {
  apiKey: "AIzaSyCZoUKvnekSP2-rdrK9oq9nBQup8GHUix4",
  authDomain: "studentverse-d6b5e.firebaseapp.com",
  projectId: "studentverse-d6b5e",
  storageBucket: "studentverse-d6b5e.firebasestorage.app",
  messagingSenderId: "450373885522",
  appId: "1:450373885522:web:08ea6d0511f4970006098b"
};

// 2) Initialize Firebase app + Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3) Helper functions to save data

// Save stress test result
window.saveStressResult = async function(data){
  try {
    await db.collection("stressScores").add(data);
    console.log("✅ Saved stress result to Firestore");
  } catch (e) {
    console.error("Error saving stress result:", e);
  }
};

// Save study plan
window.saveStudyPlan = async function(data){
  try {
    await db.collection("studyPlans").add(data);
    console.log("✅ Saved study plan to Firestore");
  } catch (e) {
    console.error("Error saving study plan:", e);
  }
};

// Save carbon data
window.saveCarbonData = async function(data){
  try {
    await db.collection("carbonData").add(data);
    console.log("✅ Saved carbon data to Firestore");
  } catch (e) {
    console.error("Error saving carbon data:", e);
  }
};
