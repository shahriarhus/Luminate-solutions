import { TestBed } from '@angular/core/testing';

import { QuoteFormService } from './quote-form.service';

describe('QuoteFormService', () => {
  let service: QuoteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
