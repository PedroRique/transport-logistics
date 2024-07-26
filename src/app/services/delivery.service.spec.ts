import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { DeliveryService } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
