import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocusignModalComponent } from './docusign-modal.component';

describe('DocusignModalComponent', () => {
  let component: DocusignModalComponent;
  let fixture: ComponentFixture<DocusignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocusignModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocusignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
