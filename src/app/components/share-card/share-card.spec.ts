import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCard } from './share-card';

describe('ShareCard', () => {
  let component: ShareCard;
  let fixture: ComponentFixture<ShareCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
