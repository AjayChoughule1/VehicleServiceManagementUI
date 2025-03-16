import { TestBed } from '@angular/core/testing';

import { ServiceRecordItemService } from './service-record-item.service';

describe('ServiceRecordItemService', () => {
  let service: ServiceRecordItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRecordItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
