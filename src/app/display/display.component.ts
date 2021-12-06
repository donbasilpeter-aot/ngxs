import { Component, OnInit } from '@angular/core';
import { Select,Store } from '@ngxs/store';
import { EventState } from '../shared/event.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  selecteddata!:any;

  @Select(EventState.getSelectedEvent) selectedEvent$!:Observable<any>

  constructor() { }

  ngOnInit(): void {
    this.selectedEvent$.subscribe(data=>{
      this.selecteddata=data
      console.log(data)
    })
  }

}
