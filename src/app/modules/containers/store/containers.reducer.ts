import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { ContainerModel } from '../models';

import { ContainersState, containersInitialState } from './containers.state';
import * as ContainersActions from './containers.actions';

const reducer: ActionReducer<ContainersState> = createReducer(
    containersInitialState,
    on(
      ContainersActions.getContainers,
      (state): ContainersState => ({
        ...state,
        loading: true
      }),
    ),
  
    on(
    ContainersActions.getContainersSuccess,
      (state, { containers }): ContainersState => {
        const data = [ ...containers ];
        const entities = data.reduce(
          (result: { [id: number]: ContainerModel}, container: ContainerModel) => {
            return {
              ...result,
              [container.id!]: container
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
      ContainersActions.getContainersFailed,
      (state, { error }): ContainersState => ({
        ...state,
        loading: false,
        loaded: false,
        error
      }),
    ),

    on(
      ContainersActions.createContainerSuccess,
      ContainersActions.updateContainerSuccess,
      (state, { container }): ContainersState => {
        const createUpdateContainer = { ...container };
        const entities = {
          ...state.entities,
          [createUpdateContainer.id!]: createUpdateContainer
        };
        
        return {
          ...state,
          entities,
        };
      },
    ),

    on(
      ContainersActions.createContainerFailed,
      ContainersActions.updateContainerFailed,
      ContainersActions.deleteContainerFailed,
      (state, { error }): ContainersState => ({
        ...state,
        error
      }),
    ),

    on(
      ContainersActions.deleteContainerSuccess,
        (state, { container }): ContainersState => {
          const { [container.id!]: removed, ...entities } = state.entities;

          return {
            ...state,
            entities
          };
        },
    ),

    on(
      ContainersActions.setOriginalContainer,
        (state, { container }): ContainersState => {
          const originalContainer = { ...container };

          return {
            ...state,
            originalContainer
          };
        },
    ),
    
    on(
      ContainersActions.selectContainer,
      ContainersActions.availableToUseContainer,
      ContainersActions.clearContainer,
        (state, { container }): ContainersState => {
          const { [container.id!]: removed, ...entities } = state.entities;
          const availableToUseSelectContainer = { ...container };
          const updatedEntities = {
            ...state.entities,
            [availableToUseSelectContainer.id!]: availableToUseSelectContainer
          };      

          return {
            ...state,
            entities: updatedEntities
          };
        },
    ),
)

export function containersStateReducer(state: ContainersState, action: Action): ContainersState {
  return reducer(state, action);
}
