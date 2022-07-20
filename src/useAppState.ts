import { useMemo, useState } from "react";

export interface AppState {
  /** Does customer have asymetric chest? */
  isAsymetric: boolean;
  /** Customer waist size. This is the full size */
  waistSize: number;
  /**
   * Customer chest size.
   * Symetric chests: this is the full size.
   * Asymetric chests: this is the half size for one breast.
   */
  chestSize: number;
}

export interface AppStateActions {
  setAppState: (s: AppState) => void;
  toggleIsAsymetric: () => void;
  setWaistSize: (size: number) => void;
  setChestSize: (size: number) => void;
}

export const useAppState = (): [AppState, AppStateActions] => {
  const [appState, setAppState] = useState<AppState>({
    isAsymetric: false,
    waistSize: 80,
    chestSize: 85,
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
        setWaistSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            waistSize: size,
          }));
        },
        setChestSize: (size) => {
          setAppState((previousState) => ({
            ...previousState,
            chestSize: size,
          }));
        },
      }),
      []
    ),
  ];
};
