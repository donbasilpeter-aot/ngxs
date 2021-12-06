import { Selector, State, StateContext, Action } from '@ngxs/store';
import { GetEventAction, SetSelectedEvent } from './event.actions';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class EventStateModel {
  events: any = [];
  selectedEvent: any;
}

@State<EventStateModel>({
  name: 'events',
  defaults: {
    events: [],
    selectedEvent:[],
  },
})
@Injectable()
export class EventState {
  eventData: any;

  constructor(private apiservice: ApiService) {}

  @Selector()
  static getEvents(state: EventStateModel) {
    return state.events;
  }

  @Selector()
  static getSelectedEvent(state:EventStateModel){
      return state.selectedEvent
  }

  @Action(GetEventAction)
  getevents({ getState, setState }: StateContext<EventStateModel>) {
    return this.apiservice.getAllEevents().pipe(
      tap((result) => {
        console.log(result)
        const state = getState();
        this.eventData = result;

        setState({
          ...state,
          events: this.eventData['result']['content'],
        });
      })
    );
  }

  @Action(SetSelectedEvent)
  selectevent(
    { getState, setState }: StateContext<EventStateModel>,
    { payload }: SetSelectedEvent
  ) {
    const state = getState();
    setState({
      ...state,
      selectedEvent:payload
    });
  }
}
