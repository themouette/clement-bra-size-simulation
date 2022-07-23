import { useMemo, useState } from "react";

export interface AppState {
  /** Does customer have asymetric chest? */
  isAsymetric: boolean;
  /** Customer waist size. This is the full size */
  breastSize: number;
  /**
   * Customer chest size.
   * Only for symetric chests
   */
  chestSize: number;
  /**
   * Customer left chest half size.
   * Only for asymetric chests
   */
  leftHalfChestSize: number;
  /**
   * Customer right chest half size.
   * Only for asymetric chests
   */
  rightHalfChestSize: number;
  /**
   * Customer hips size
   */
  hipsSize: number;
}

export interface AppStateActions {
  setAppState: (s: AppState) => void;
  toggleIsAsymetric: () => void;
  setBreastSize: (size: number) => void;
  setChestSize: (size: number) => void;
  setLeftHalfChestSize: (size: number) => void;
  setRightHalfChestSize: (size: number) => void;
  setHipsSize: (size: number) => void;
}

export const useAppState = (): [AppState, AppStateActions] => {
  const [appState, setAppState] = useState<AppState>({
    isAsymetric: false,
    breastSize: 80,
    chestSize: 85,
    leftHalfChestSize: 44,
    rightHalfChestSize: 44,
    hipsSize: 87,
  });

  return [
    appState,
    useMemo(
      () => ({
        setAppState,
        toggleIsAsymetric: () => {
          setAppState((previousState) => ({
            ...previousState,
            isAsymetric: !previousState.isAsymetric,
          }));
        },
        setBreastSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            breastSize: size,
          }));
        },
        setChestSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            chestSize: size,
          }));
        },
        setLeftHalfChestSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            leftHalfChestSize: size,
          }));
        },
        setRightHalfChestSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            rightHalfChestSize: size,
          }));
        },
        setHipsSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            hipsSize: size,
          }));
        },
      }),
      []
    ),
  ];
};