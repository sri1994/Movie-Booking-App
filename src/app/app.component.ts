import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { UserDetailService } from 'src/app/core/services/userDetails.service';
import { HomeService } from './features/home/services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'book-my-movie';
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private userDetailsService: UserDetailService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.homeService.updateLogs({ id: new Date().getMilliseconds(), log: new Date() + 'In app component ngOnInit'});
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const message = 'New version available. Update to new Version ?';
        const action = 'UPDATE';
        const snackbarRef = this.snackBar.open(message, action, { duration: 15000 });
        snackbarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
    // this.homeService.getNowshowing();
    // this.homeService.getTheaterList();
    this.homeService.fetchGenres();
  }
}
