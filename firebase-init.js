const firebaseConfig = {
  apiKey: "AIzaSyCZoUKvnekSP2-rdrK9oq9nBQup8GHUix4",
  authDomain: "studentverse-d6b5e.firebaseapp.com",
  projectId: "studentverse-d6b5e",
  storageBucket: "studentverse-d6b5e.firebasestorage.app",
  messagingSenderId: "450373885522",
  appId: "1:450373885522:web:08ea6d0511f4970006098b"
};

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

function withTimestamps(payload) {
  return {
    ...payload,
    clientTime: new Date().toLocaleString(),
    time: firebase.firestore.FieldValue.serverTimestamp()
  };
}

window.saveStressResult = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("stressScores").add(payload);
    console.log(Saved stress result (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving stress result:", e);
    return { ok: false, error: e };
  }
};

window.saveStudyPlan = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("studyPlans").add(payload);
    console.log(Saved study plan (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving study plan:", e);
    return { ok: false, error: e };
  }
};

window.saveCarbonData = async function(data) {
  try {
    const payload = withTimestamps(data);
    const docRef = await db.collection("carbonData").add(payload);
    console.log(Saved carbon data (id: ${docRef.id}));
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error("Error saving carbon data:", e);
    return { ok: false, error: e };
  }
};

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

window.checkFirestore = async function() {
  try {
    const snap = await db.collection("stressScores").limit(1).get();
    console.log("Firestore reachable. stressScores docs:", snap.size);
    return { ok: true, size: snap.size };
  } catch (e) {
    console.error("Firestore reachability check failed:", e);
    return { ok: false, error: e };
  }
};
