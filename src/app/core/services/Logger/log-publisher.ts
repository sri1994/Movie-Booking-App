import 'rxjs/add/observable/of';
// import { LogEntry } from './log.service';
import { Observable } from 'rxjs';
export abstract class LogPublisher {
  location: string;
  abstract log(record): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
