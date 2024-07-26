import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProgressComponent } from './driver-progress.component';

describe('DriverProgressComponent', () => {
  let component: DriverProgressComponent;
  let fixture: ComponentFixture<DriverProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
