import { HomeService } from 'src/app/home/services/home.service';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { UserDetailService } from 'src/app/core/services/userDetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'book-my-movie';
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar,
    private userDetailsService: UserDetailService,
    private homeService: HomeService) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const message = 'New version available. Update to new Version ?';
        const action = 'UPDATE';
        const snackbarRef = this.snackBar.open(message, action, { duration: 15000, });
        snackbarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
    this.homeService.getNowshowing();
    this.homeService.getTheaterList();
    this.homeService.fetchGenres();
  }
}
