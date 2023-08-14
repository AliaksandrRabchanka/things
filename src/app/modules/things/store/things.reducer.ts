import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { ThingModel } from '../models';

import { ThingsState, thingsInitialState } from './things.state';
import * as ThingsActions from './things.actions';

const reducer: ActionReducer<ThingsState> = createReducer(
    thingsInitialState,
  on(
    ThingsActions.getThings,
    (state): ThingsState => ({
      ...state,
      loading: true
    }),
  ),
  
  on(
    ThingsActions.getThingsSuccess,
      (state, { things }): ThingsState => {
        const data = [ ...things ];
        const entities = data.reduce(
          (result: { [id: number]: ThingModel}, thing: ThingModel) => {
            return {
              ...result,
              [thing.id!]: thing
            };
          },
          {
            ...state.entities
          }
        );
        return {
          ...state,
          loading: false,
          loaded: true,
          entities
        };
      },
    ),

    on(
      ThingsActions.getThingsFailed,
      (state, { error }): ThingsState => ({
        ...state,
        loading: false,
        loaded: false,
        error
      }),
    ),

    on(
      ThingsActions.createThingSuccess,
      ThingsActions.updateThingSuccess,
      (state, { thing }): ThingsState => {
        const createUpdateThing = { ...thing };
        const entities = {
          ...state.entities,
          [createUpdateThing.id!]: createUpdateThing
        };
        
        return {
          ...state,
          entities,
        };
      },
    ),

    on(
      ThingsActions.createThingFailed,
      ThingsActions.updateThingFailed,
      ThingsActions.deleteThingFailed,
      (state, { error }): ThingsState => ({
        ...state,
        error
      }),
    ),

    on(
      ThingsActions.deleteThingSuccess,
        (state, { thing }): ThingsState => {
          const { [thing.id!]: removed, ...entities } = state.entities;

          return {
            ...state,
            entities
          };
        },
    ),
    
    on(
      ThingsActions.selectThing,
      ThingsActions.clearThing,
        (state, { thing }): ThingsState => {
          const { [thing.id!]: removed, ...entities } = state.entities;
          const selectedThing = { ...thing };
          const updatedEntities = {
            ...state.entities,
            [selectedThing.id!]: selectedThing
          };      

          return {
            ...state,
            entities: updatedEntities
          };
        },
    ),
)

export function thingsStateReducer(state: ThingsState, action: Action): ThingsState {
  return reducer(state, action);
}
