import {AppRootStateType} from '../store';

export const statusSelector = (state: AppRootStateType) => state.app.status;
export const isInizialisedSelector = (state: AppRootStateType) => state.app.isInizialised;