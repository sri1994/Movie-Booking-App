import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}
export class LogService {
  level: LogLevel = LogLevel.All;
  logWithDate = true;

  ebug(msg: string, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg, ...optionalParams: any[]) {
    return this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  writeToLog(msg, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let value;

      // Build log string
      if (this.logWithDate) {
        value = new Date() + ' - ';
      }
      value += 'Type: ' + LogLevel[this.level];
      value += ' - Message: ' + msg.message;
      if (params.length) {
        value += ' - Extra Info: ' + this.formatParams(params);
      }

      // Log the value
      return value;
    }
  }

  shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  formatParams(params: any[]): string {
    let ret: string = params.join(',');
    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }
}
