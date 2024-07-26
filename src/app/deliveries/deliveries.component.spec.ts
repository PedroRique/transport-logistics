import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesComponent } from './deliveries.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DeliveriesComponent', () => {
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveriesComponent],
      providers: [provideMockStore(), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
