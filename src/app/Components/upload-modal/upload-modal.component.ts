import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { FormInput } from '../../Interfaces/form-data';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../../Services/documents.service';
@Component({
  selector: 'app-upload-modal',
  imports: [FileUploadModule, ButtonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {

  constructor (private documentService:DocumentsService){}
  @Input() openModal: boolean = false;
  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }


  formData: FormInput = {
    name: '',
    type: '',
    description: '',
    document: new File([], '')
  }
  onUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formData.document = input.files[0];
    }
  }
  submit() {
    const form = new FormData();
    form.append('name', this.formData.name);
    form.append('type', this.formData.type);
    form.append('description', this.formData.description);
    form.append('document', this.formData.document);

    this.documentService.postDocuments(form).then((response) => {
      console.log(response);
    })
  
  }

  

}
