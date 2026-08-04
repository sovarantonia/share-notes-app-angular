import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchBar } from './note-search-bar';

describe('NoteSearchBar', () => {
  let component: NoteSearchBar;
  let fixture: ComponentFixture<NoteSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSearchBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
