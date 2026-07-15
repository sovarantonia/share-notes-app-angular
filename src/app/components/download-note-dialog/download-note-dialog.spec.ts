import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNoteDialog } from './download-note-dialog';

describe('DownloadNoteDialog', () => {
  let component: DownloadNoteDialog;
  let fixture: ComponentFixture<DownloadNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
