import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';
import { TMDB_URLS, JSON_SERVER_URLS, BASE_URL } from '../../shared/config';
import { environment } from '../../../environments/environment';
const SEARCH_URL = BASE_URL.TMDB_API + TMDB_URLS.SEARCH_URL;
const THEATERS_URL = environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL;

@Injectable()

export class AdminService {

  constructor(private http: HttpClient) { }

  newTheater(data) {
    let newTheaters, newObject;
    this.http.get(THEATERS_URL).subscribe((value) => {
      console.log(value);
      newObject = value;
      newTheaters = newObject['theaters'];
      newTheaters.push(data);
      this.http.put(THEATERS_URL, newObject).subscribe((res) => {
        console.log('Sucess', res);
      },
        (e) => console.log(e, 'while updating data'));
    },
      (e) => {
        console.log(e, 'while fetching data');
      },
      () => {
        console.log(newObject);
      });
  }

  searchMovie(term) {
    return this.http.get(SEARCH_URL + environment.API_KEY + '&query=' + term);
  }
  saveNowPlaying(nowPlaying, theaterId) {
    let newObject;
    if (nowPlaying.length > 0) {
      this.http.get(THEATERS_URL).subscribe((value) => {
        console.log(value);
        newObject = value;
        newObject['theaters'].forEach(theater => {
          if (theater.id === theaterId) {

            theater.movies = nowPlaying;
          }
        });
        this.http.put(THEATERS_URL, newObject).subscribe((xyz) => {
          console.log('Sucess', xyz);
        });
      });
    }
  }
}
