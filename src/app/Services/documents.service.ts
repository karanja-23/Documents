import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }
  url = 'https://mobileimsbackend.onrender.com/documents'

  async postDocuments(data: FormData) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: data
    })
    return await response.json()
  }
  async getDocuments(){
    const response = await fetch(this.url,{

    })
    const data = await response.json()
    return data
  }
}
