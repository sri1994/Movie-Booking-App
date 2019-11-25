import { TestBed } from '@angular/core/testing';

import { SegregateMovieService } from './segregate-movie.service';

describe('SegregateMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SegregateMovieService = TestBed.get(SegregateMovieService);
    expect(service).toBeTruthy();
  });
});
