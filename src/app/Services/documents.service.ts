import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  openDocuSignEditor(base64Pdf: string, fileName: string): void {
    fetch('http://localhost:5000/api/docusign/create-sender-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document_base64: base64Pdf,
        file_name: fileName
      })
    })
    .then((response) => response.json())
    .then((res) => {
      window.open(res.url, '_blank');
    })
    .catch((err) => {
      console.error('Error launching DocuSign sender view', err);
    });
  }
  
  
  
}
