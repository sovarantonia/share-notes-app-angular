import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoteDialog } from './view-note-dialog';

describe('ViewNoteDialog', () => {
  let component: ViewNoteDialog;
  let fixture: ComponentFixture<ViewNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
