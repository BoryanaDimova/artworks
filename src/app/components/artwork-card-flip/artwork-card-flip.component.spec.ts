import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkCardFlipComponent } from './artwork-card-flip.component';

describe('ArtworkCardFlipComponent', () => {
  let component: ArtworkCardFlipComponent;
  let fixture: ComponentFixture<ArtworkCardFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworkCardFlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkCardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
