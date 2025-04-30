import { Component, computed, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadModalComponent } from '../../Components/upload-modal/upload-modal.component';
import { OpacityService } from '../../Services/opacity.service';
@Component({
  selector: 'app-documents',
  imports: [UploadModalComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  constructor(public opacityService: OpacityService){}
  openModal: boolean = false
  opacity = computed(() => this.opacityService.opacity())
  
  showModal() {
    this.openModal = true
    this.opacityService.setOpacity(0.5)
  }
  closeModal() {
    this.openModal = false
    this.opacityService.resetOpacity()
  }
}
