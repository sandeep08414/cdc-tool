import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWithNoCoverageComponent } from './save-with-no-coverage.component';

describe('SaveWithNoCoverageComponent', () => {
  let component: SaveWithNoCoverageComponent;
  let fixture: ComponentFixture<SaveWithNoCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWithNoCoverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWithNoCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
