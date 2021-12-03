import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksTableComponent } from './artworks-table.component';

describe('ArtworksTableComponent', () => {
  let component: ArtworksTableComponent;
  let fixture: ComponentFixture<ArtworksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworksTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
