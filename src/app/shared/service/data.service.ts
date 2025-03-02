import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore); 

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
}