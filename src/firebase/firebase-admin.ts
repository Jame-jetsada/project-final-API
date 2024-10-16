import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

// โหลดค่าจาก .env
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // แทนที่ \n ด้วย newline จริง
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderCertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    clientCertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
  } as admin.ServiceAccount),
  databaseURL: "https://<project-id>.firebaseio.com" // เปลี่ยน project ID ของคุณ
});

const firestoreAdmin = admin.firestore();

export default firestoreAdmin;
