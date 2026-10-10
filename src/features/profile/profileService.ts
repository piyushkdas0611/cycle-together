
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export async function createUserProfile(
  uid: string,
  displayName: string,
  email: string
) {
  const profileRef = doc(db, "users", uid);

  await setDoc(profileRef, {
    uid,
    displayName: displayName.trim(),
    email: email.trim().toLowerCase(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const profileRef = doc(db, "users", uid);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}

export async function updateUserDisplayName(
  uid: string,
  displayName: string
) {
  const profileRef = doc(db, "users", uid);

  await updateDoc(profileRef, {
    displayName: displayName.trim(),
    updatedAt: serverTimestamp(),
  });
}
