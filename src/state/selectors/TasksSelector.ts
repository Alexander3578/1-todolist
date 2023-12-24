import {AppRootStateType} from '../store';
import {TaskStateType} from '../../AppWithRedux';

export const tasksSelector = (state: AppRootStateType):TaskStateType => state.tasks


