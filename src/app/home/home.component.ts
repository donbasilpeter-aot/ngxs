import { Component, OnInit } from '@angular/core';
import { Select,Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetEventAction, SetSelectedEvent } from '../shared/event.actions'; 
import { EventState } from '../shared/event.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(EventState.getEvents) events$! : Observable<any>;
  constructor(private store:Store) { }

  ngOnInit(): void {
     this.store.dispatch(new GetEventAction())
     
  }
  onSelectingEvent(event:[]){
    this.store.dispatch(new SetSelectedEvent(event))
  }

}
