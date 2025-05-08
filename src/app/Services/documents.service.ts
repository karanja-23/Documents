import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }
  url = 'http://127.0.0.1:5000/documents'
  signingUrl = 'http://127.0.0.1:5000/create-envelope'
  documents= signal([])
  async postDocuments(data: FormData) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: data
    })
    return await response.json()
  }
  async getDocuments() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.documents.set(data); 
      console.log(this.documents())
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }
  async getSigningUrl(){
    const response = await fetch(this.signingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
    });
   return await response.json()
   
  }
  
  
}
