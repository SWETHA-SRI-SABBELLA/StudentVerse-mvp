// firebase-init.js
// Firebase v8 (web) initialization + Firestore helpers for StudentVerse
// Drop this file in the same folder as your HTML files and make sure
// the HTML pages include the v8 firebase-app & firebase-firestore scripts BEFORE this file:
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
// <script src="firebase-init.js"></script>

// ---- 1) Project config (copied from your Firebase console) ----
const firebaseConfig = {
  apiKey: "AIzaSyCZoUKvnekSP2-rdrK9oq9nBQup8GHUix4",
  authDomain: "studentverse-d6b5e.firebaseapp.com",
  projectId: "studentverse-d6b5e",
  storageBucket: "studentverse-d6b5e.firebasestorage.app",
  messagingSenderId: "450373885522",
  appId: "1:450373885522:web:08ea6d0511f4970006098b"
};

// ---- 2) Initialize Firebase + Firestore (v8 style) ----
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized.");
  } else {
    console.log("Firebase app already initialized.");
  }
} catch (e) {
  console.error("Firebase initialization error:", e);
}

const db = firebase.firestore();

// ---- 3) Helper: server timestamp + client time wrapper ----
function withTimestamps(payload) {
  return {
    ...payload,
    clientTime: new Date().toLocaleString(),
    time: firebase.firestore.FieldValue.serverTimestamp()
  };
}

// ---- 4) Save helpers (exported on window) ----

// Save stress test result
// data should be an object (words, wpm, stressLevel, stressScore, scheduleHtml, etc.)
window.saveStressResult = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("stressScores").add(payload);
    console.log(✅ Saved stress result to Firestore (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving stress result:", e);
    return { ok: false, error: e };
  }
};

// Save study plan
// data should be an object (stressScore, hoursAvailable, plan, etc.)
window.saveStudyPlan = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("studyPlans").add(payload);
    console.log(✅ Saved study plan to Firestore (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving study plan:", e);
    return { ok: false, error: e };
  }
};

// Save carbon data
// data should be an object (distance, mode, co2kg, etc.)
window.saveCarbonData = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("carbonData").add(payload);
    console.log(✅ Saved carbon data to Firestore (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving carbon data:", e);
    return { ok: false, error: e };
  }
};

// ---- 5) Optional helper for dashboard (fetch latest documents) ----
// Example usage: window.getLatestStress(5).then(r => console.log(r))
window.getLatestStress = async function(limit = 5) {
  try {
    const snap = await db.collection("stressScores")
      .orderBy("time", "desc")
      .limit(limit)
      .get();
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return { ok: true, items };
  } catch (e) {
    console.error("Error reading latest stress scores:", e);
    return { ok: false, error: e };
  }
};

// ---- 6) Quick init check (for demo) ----
window.checkFirestore = async function() {
  try {
    // very lightweight read: try to fetch 1 doc (if collection exists)
    const snap = await db.collection("stressScores").limit(1).get();
    console.log("Firestore reachable. stressScores docs:", snap.size);
    return { ok: true, size: snap.size };
  } catch (e) {
    console.error("Firestore reachability check failed:", e);
    return { ok: false, error: e };
  }
};

// End of firebase-init.js
