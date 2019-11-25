import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Store, State } from '@ngrx/store';
import * as MovieState from './../../../../reducers/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  theaterList;
  constructor(private adminService: AdminService, private store: Store<MovieState.State>) { }

  ngOnInit() {
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
    });
  }

  addTheater(formData) {
    console.log('FormData :', formData);
//     Capacity: "45"
// City: "bengaluru"
// GLocationpath: "sfdfdgfdgfdg"
// theatreId: "67"
// theatreName: "mytheatre"

    // "tid": "6",
    //   "name": "srinivasa",
    //     "city": "dfdfdgd",
    //       "gLocation": "dgdgd",
    //         "capacity": 56,
    const modifiedObject: any = {
      tid: formData.theatreId,
      name: formData.theatreName,
      city: formData.City,
      gLocation: formData.GLocationpath,
      capacity: formData.Capacity
    };
    this.adminService.newTheater(modifiedObject);
  }
}
