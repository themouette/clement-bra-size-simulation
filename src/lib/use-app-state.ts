import { useMemo, useState } from "react";

export interface AppState {
  /** Does customer have asymetric chest? */
  isAsymetric: boolean;
  /** Customer waist size. This is the full size */
  breastSize: number | undefined;
  /**
   * Customer chest size.
   * Only for symetric chests
   */
  chestSize: number | undefined;
  /**
   * Customer left chest half size.
   * Only for asymetric chests
   */
  leftHalfChestSize: number | undefined;
  /**
   * Customer right chest half size.
   * Only for asymetric chests
   */
  rightHalfChestSize: number | undefined;
}

export interface AppStateActions {
  setAppState: (s: AppState) => void;
  toggleIsAsymetric: () => void;
  setBreastSize: (size: number | undefined) => void;
  setChestSize: (size: number | undefined) => void;
  setLeftHalfChestSize: (size: number | undefined) => void;
  setRightHalfChestSize: (size: number | undefined) => void;
}

export const useAppState = (): [AppState, AppStateActions] => {
  const [appState, setAppState] = useState<AppState>({
    isAsymetric: false,
    breastSize: undefined,
    chestSize: undefined,
    leftHalfChestSize: undefined,
    rightHalfChestSize: undefined,
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
      }),
      []
    ),
  ];
};
