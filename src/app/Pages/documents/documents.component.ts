import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UploadModalComponent } from '../../Components/upload-modal/upload-modal.component';
import { OpacityService } from '../../Services/opacity.service';
import { DocumentsService } from '../../Services/documents.service';
import { PdfViewerComponent } from '../../Components/pdf-viewer/pdf-viewer.component';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [UploadModalComponent, CommonModule, TableModule, PdfViewerComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  documentsList = signal<any[]>([]);
  filteredDocs = signal<any[]>([]);
  paginatedDocuments = signal<any[]>([]);
  selectedPdfUrl: string | null = null;

  rows = 4;
  currentPage = 1;
  totalPages = 1;

  hoveredRow: any = null;

  openModal = false;
  opacity = computed(() => this.opacityService.opacity());

  constructor(
    public opacityService: OpacityService,
    private documentService: DocumentsService
  ) {}

  openViewer(base64Pdf: string) {
    console.log('Opening viewer for base64:', base64Pdf?.slice(0, 50));
    this.selectedPdfUrl = base64Pdf;
  }
  

  showModal() {
    this.openModal = true;
    this.opacityService.setOpacity(0.5);
  }

  closeModal() {
    this.openModal = false;
    this.opacityService.resetOpacity();
  }

  closePdfViewer() {
    this.selectedPdfUrl = null;
  }
  async ngOnInit(): Promise<void> {
    await this.documentService.getDocuments();

    this.documentsList.set(this.documentService.documents());
    this.filteredDocs.set(this.documentsList());
    this.paginatedDocuments.set(this.filteredDocs());
    this.updatePagination();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      const query = input.value; // Access the input value
      const documents = this.documentsList();
      const filtered = documents.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase())
      );
      this.filteredDocs.set(filtered);
      this.currentPage = 1;
      this.updatePagination();
    }
  }
  
  
  updatePagination() {
    const filtered = this.filteredDocs();
    const start = (this.currentPage - 1) * this.rows;
    const end = start + this.rows;
    this.totalPages = Math.ceil(filtered.length / this.rows);
    this.paginatedDocuments.set(filtered.slice(start, end));
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
