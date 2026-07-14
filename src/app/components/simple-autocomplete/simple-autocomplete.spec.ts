import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAutocomplete } from './simple-autocomplete';

describe('SimpleAutocomplete', () => {
  let component: SimpleAutocomplete;
  let fixture: ComponentFixture<SimpleAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleAutocomplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleAutocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
