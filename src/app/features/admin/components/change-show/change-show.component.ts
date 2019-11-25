import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-change-show',
  templateUrl: './change-show.component.html',
  styleUrls: ['./change-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeShowComponent implements OnInit {
  @Input() theaterList;
  movieInput: FormControl;
  selectTheater: FormControl;
  movieResult: Observable<Object>;
  selectedTheater;
  nowShowing = [];
  nowPlaying = [];
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  constructor(private adminService: AdminService, private matDialog: MatDialog) {
    this.movieInput = new FormControl();
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    this.movieInput.valueChanges.subscribe(value => {
      if (value) {
        this.movieResult = this.adminService.searchMovie(value).pipe(map(movies => movies['results']));
      }
    });
    this.selectTheater.valueChanges.subscribe(value => {
      this.selectedTheater = value;
      this.nowShowing = [];
    });
  }
  addMovie(movie) {
    this.nowShowing.push(movie.name);
    this.nowPlaying.push(movie.id);
  }
  save() {
    this.matDialog.open(this.successDialog);
    this.adminService.saveNowPlaying(this.nowPlaying, this.selectTheater['tid']);
  }
  cancel() {
    this.nowShowing = [];
  }
  dialogOk() {
    this.nowShowing = [];
    this.movieInput.reset();
    this.selectTheater.reset();
    this.matDialog.closeAll();
    this.movieResult = of([]);
  }

  track(_index, item) {
    return item;
  }
}
