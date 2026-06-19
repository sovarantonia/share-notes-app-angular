import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeChart } from './grade-chart';

describe('GradeChart', () => {
  let component: GradeChart;
  let fixture: ComponentFixture<GradeChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
