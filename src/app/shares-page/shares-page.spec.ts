import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesPage } from './shares-page';

describe('SharesPage', () => {
  let component: SharesPage;
  let fixture: ComponentFixture<SharesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
