import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore); 

  // Add Doctor
  async addDoctor(doctor: any) {
    doctor.id = doc(collection(this.firestore, "Doctor")).id; 
    return addDoc(collection(this.firestore, "Doctor"), doctor);
  }

  getAllDoctors() {
    return collectionData(collection(this.firestore, "Doctor"), { idField: 'id' }); 

  }

  updateDoctor(doctor: any) {
    return updateDoc(doc(this.firestore, "Doctor", doctor.id), doctor);
  }

  deleteDoctor(id: string) {
    return deleteDoc(doc(this.firestore, "Doctor", id));
  }

  getDoctorById(id: any) {
    return getDoc(doc(this.firestore, "Doctor", id)).then(docSnap => docSnap.data());
  }   


  // Add Patient
  async addPatient(patient: any) {
    patient.patient_id = doc(collection(this.firestore, "Patient")).id; 
    return addDoc(collection(this.firestore, "Patient"), patient);
  }

  getAllPatients() {
    return collectionData(collection(this.firestore, "Patient"), { idField: 'patient_id' }); 
  }

  updatePatient(patient: any) {
    return updateDoc(doc(this.firestore, "Patient", patient.patient_id), patient);
  }

  deletePatient(id: string) {
    return deleteDoc(doc(this.firestore, "Patient", id));
  }

  getPatientById(id: string) {
    return getDoc(doc(this.firestore, "Patient", id)).then(docSnap => docSnap.data());
  }
}