import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import type { RootApplicationState } from './index';

export type ThunkAppDispatch = ThunkDispatch<
  RootApplicationState,
  void,
  Action
>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootApplicationState> =
  useSelector;

/*
export const useRootSelector: <
  TState = RootApplicationState,
  TSelected = unknown
>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelector;
*/
