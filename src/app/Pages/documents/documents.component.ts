import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UploadModalComponent } from '../../Components/upload-modal/upload-modal.component';
import { OpacityService } from '../../Services/opacity.service';
import { DocumentsService } from '../../Services/documents.service';
import { PdfViewerComponent } from '../../Components/pdf-viewer/pdf-viewer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocusignModalComponent } from '../../Components/docusign-modal/docusign-modal.component';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [UploadModalComponent, CommonModule, TableModule, PdfViewerComponent,HttpClientModule,DocusignModalComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  documentsList = signal<any[]>([]);
  filteredDocs = signal<any[]>([]);
  paginatedDocuments = signal<any[]>([]);
  selectedPdfUrl: string | null = null;
  docusignUrl: string | null = null;
  openDocusignModal: boolean = false;

  rows = 4;
  currentPage = 1;
  totalPages = 1;

  hoveredRow: any = null;

  openModal = false;
  opacity = computed(() => this.opacityService.opacity());

  constructor(
    public opacityService: OpacityService,
    private documentService: DocumentsService,
    private http: HttpClient
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
  async startSigning(doc: any) {
    console.log('Sending doc to backend:', doc);
    try {
      const response = await fetch('http://127.0.0.1:5000/create-envelope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Content: doc.document,
          filename: doc.name
        })
      });
  
      const data = await response.json();
      console.log('Response from backend:', data); // 👈 ADD THIS
      if (data.url) {
        console.log('Redirecting to signing URL:', data.url); // Log the URL
        window.location.href = data.url; // Redirect to DocuSign
      } else {
        console.log(data)
        console.warn('No URL returned for signing.');
      }
    } catch (error) {
      console.error('Error starting signing process:', error); // Already here
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
  base64ToFile(base64: string, filename: string): File {
    if (!base64) {
      console.error('Base64 string is undefined or null.');
      throw new Error('Base64 content is missing');
    }
    
    // Strip out prefix if it exists
    const base64Content = base64.split(',').pop()?.trim() ?? '';
    
    try {
      const byteString = atob(base64Content);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new File([ab], filename, { type: 'application/pdf' });
    } catch (e) {
      console.error('Invalid base64 string passed to atob:', e);
      throw new Error('Invalid base64 document content');
    }
  }
  
  viewDocWithDocusign(name: string, doc: any) {
    if (!doc.document) {
      console.error('Document content is missing.');
      return;  // Handle the error gracefully
    }
    if (typeof doc.document !== 'string') {
      console.error('Document content is not a valid string:', doc.document);
      return;
    }
    
    const formData = new FormData();
    const file = this.base64ToFile(doc.document, name); // ✅ convert base64 to File
    formData.append('name', name);
    formData.append('file', file); // ✅ proper File object
  
    this.http.post('http://127.0.0.1:5000/api/docusign/view', formData).subscribe({
      next: (res: any) => {
        console.log('DocuSign view response:', res.url);
        this.docusignUrl = res.url;
        this.openDocusignModal = true;
      },
      error: (err) => {
        console.error('DocuSign view error:', err);
      }
    });
  }
  
  
  
}
