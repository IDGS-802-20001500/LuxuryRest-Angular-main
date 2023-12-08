import { TestBed } from '@angular/core/testing';

import { ConexionServiceService } from './conexion-service.service';

describe('ConexionServiceService', () => {
  let service: ConexionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
