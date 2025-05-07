import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }
  url = 'http://127.0.0.1:5000/documents'
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
}
