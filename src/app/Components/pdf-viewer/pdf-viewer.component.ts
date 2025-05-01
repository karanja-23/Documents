import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare const AdobeDC: any;

@Component({
  selector: 'app-pdf-viewer',
  template: `
  <div class="pdf-viewer-wrapper">
    <i class="pi pi-times close-icon" (click)="closePdfViewer()"></i>
    <div id="adobe-dc-view" class="adobe-viewer-container"></div>
  </div>
`,
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent implements AfterViewInit {
  @Input() pdfUrl!: string ;
  @Output() close = new EventEmitter<void>();
  ngAfterViewInit() {
    console.log('PDF viewer init triggered, pdfUrl:', this.pdfUrl?.slice(0, 50));
    if ((window as any).AdobeDC) {
      this.initAdobeViewer();
    } else {
      document.addEventListener('adobe_dc_view_sdk.ready', () => this.initAdobeViewer());
    }
  }

  initAdobeViewer() {
    const byteCharacters = atob(this.pdfUrl);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob); // ✅ Use this as the URL
  
    const adobeDCView = new AdobeDC.View({
      clientId: 'dd7f09d66212460594538bc6d0f7b8ca',
      divId: 'adobe-dc-view',
    });
    
    adobeDCView.previewFile(
      {
        content: {
          location: {
            url: blobUrl,
          },
        },
        metaData: { fileName: 'Document.pdf' },
      },
      {
        embedMode: 'SIZED_CONTAINER',
        showDownloadPDF: false,
        showPrintPDF: false,
      }
    );
  }
  closePdfViewer() {
    this.close.emit(); 
  }
 
  
}
