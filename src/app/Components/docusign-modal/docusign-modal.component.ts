import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-docusign-modal',
  templateUrl: './docusign-modal.component.html',
  styleUrls: ['./docusign-modal.component.css']
})
export class DocusignModalComponent implements OnChanges {
  @Input() url: string | null = null;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }
}

