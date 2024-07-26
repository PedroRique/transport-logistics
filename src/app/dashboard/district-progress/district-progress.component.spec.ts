import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictProgressComponent } from './district-progress.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('DistrictProgressComponent', () => {
  let component: DistrictProgressComponent;
  let fixture: ComponentFixture<DistrictProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictProgressComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(DistrictProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
