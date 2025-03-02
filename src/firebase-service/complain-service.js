import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestoreDb } from "../Components/Firebase/Config";

export async function createComplain(complain) {
  return await addDoc(collection(firestoreDb, "complains"), complain);
}

export async function listComplain(email) {
  const _query = query(
    collection(firestoreDb, "complains"),
    where("createdBy", "==", email)
  );
  const querySnapshot = await getDocs(_query);

  const list = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}
const complaintsRef = collection(firestoreDb, "complains");

// Fetch all complaints
export const fetchComplaints = async () => {
  const querySnapshot = await getDocs(complaintsRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update complaint status
export const updateComplaintStatus = async (id, newStatus) => {
  const complaintDoc = doc(firestoreDb, "complains", id);
  await updateDoc(complaintDoc, { status: newStatus });
};

// Delete complaint
export const deleteComplaint = async (id) => {
  const complaintDoc = doc(firestoreDb, "complains", id);
  await deleteDoc(complaintDoc);
};
