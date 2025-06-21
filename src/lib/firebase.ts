import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!);

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const getFirebaseToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    return token;
  } catch (error) {
    console.error("Firebase token error:", error);
    return null;
  }
};