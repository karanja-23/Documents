import { Component } from '@angular/core';
import { UploadModalComponent } from '../../Components/upload-modal/upload-modal.component';
import { OpacityService } from '../../Services/opacity.service';
@Component({
  selector: 'app-documents',
  imports: [UploadModalComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  constructor(public opacityService: OpacityService){}
  openModal: boolean = false
  
  showModal() {
    this.openModal = true
    this.opacityService.setOpacity(0.5)
  }
  closeModal() {
    this.openModal = false
    this.opacityService.resetOpacity()
  }
}
