import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  const logServiceStub = {};
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LogService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(LogService);
  });
  it('should be created', () => {
    // const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });

  it('can call ebug method', () => {
    const msg = 'string';
    expect(service.ebug).toBeDefined();
    spyOn(service, 'ebug').and.callThrough();
    service.ebug(msg);
    expect(service.ebug).toHaveBeenCalled();
  });

  it('can call info   method', () => {
    const msg = 'string';
    expect(service.info).toBeDefined();
    spyOn(service, 'info').and.callThrough();
    service.info(msg);
    expect(service.info).toHaveBeenCalled();
  });

  it('can call warn method', () => {
    const msg = 'string';
    expect(service.warn).toBeDefined();
    spyOn(service, 'warn').and.callThrough();
    service.warn(msg);
    expect(service.warn).toHaveBeenCalled();
  });

  it('can call error method', () => {
    const msg = 'string';
    expect(service.error).toBeDefined();
    spyOn(service, 'error').and.callThrough();
    service.error(msg);
    expect(service.error).toHaveBeenCalled();
  });

  it('can call fatal method', () => {
    const msg = 'string';
    expect(service.fatal).toBeDefined();
    spyOn(service, 'fatal').and.callThrough();
    service.fatal(msg);
    expect(service.fatal).toHaveBeenCalled();
  });

  it('can call log method', () => {
    const msg = 'string';
    expect(service.log).toBeDefined();
    spyOn(service, 'log').and.callThrough();
    service.log(msg);
    expect(service.log).toHaveBeenCalled();
  });

  it('can call writeToLog method', () => {
    const msg = 'string';
    const level = 1;
    const params = ['error', 'no error'];
    expect(service.writeToLog).toBeDefined();
    spyOn(service, 'writeToLog').and.callThrough();
    service.writeToLog(msg, level, params);
    expect(service.writeToLog).toHaveBeenCalled();
  });

  it('can call shouldLog method', () => {
    const level = 1;
    expect(service.shouldLog).toBeDefined();
    spyOn(service, 'shouldLog').and.callThrough();
    service.shouldLog(level);
    expect(service.shouldLog).toHaveBeenCalled();
  });

  it('can call formatParams method', () => {
    const params = ['error', 'no error'];
    expect(service.formatParams).toBeDefined();
    spyOn(service, 'formatParams').and.callThrough();
    service.formatParams(params);
    expect(service.formatParams).toHaveBeenCalled();
  });
});
