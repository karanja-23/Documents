import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-modal',
  imports: [],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {
  @Input() openModal: boolean = false;
  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }
}
