'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TunerValues {
  // Page 1 (Hero)
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
  rotY: number; // degrees
  rotX: number; // degrees
  idleEnabled: boolean;

  // Page 3 (Ask Vedika Bot)
  p3X: number;
  p3Y: number;
  p3Z: number;
  p3Scale: number;
  p3RotY: number; // degrees
  p3RotX: number; // degrees

  // Page 3 Wave Tuner
  waveAmp: number;       // Peak-to-peak amplitude (waviness)
  waveYOffset: number;   // Wave center vertical offset in px
  waveThickness: number; // Ribbon width/thickness
  waveSpeed: number;     // Wave flow speed multiplier
}

export const DEFAULT_TUNER_VALUES: TunerValues = {
  // Page 1 (Locked values)
  posX: -0.96,
  posY: -0.25,
  posZ: 0,
  scale: 1.04,
  rotY: 25,
  rotX: 0,
  idleEnabled: true,

  // Page 3 (User fixed values)
  p3X: -1.6,
  p3Y: -0.14,
  p3Z: 0,
  p3Scale: 0.65,
  p3RotY: 37,
  p3RotX: 0,

  // Page 3 Waves (User fixed parameters)
  waveAmp: 42,
  waveYOffset: 68,
  waveThickness: 39,
  waveSpeed: 0.8,
};

interface TunerContextType {
  values: TunerValues;
  updateValue: <K extends keyof TunerValues>(key: K, value: TunerValues[K]) => void;
  resetValues: () => void;
  resetPage3Values: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const TunerContext = createContext<TunerContextType | undefined>(undefined);

const STORAGE_KEY = 'vedika_model_tuner_v6';

export function ModelTunerProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<TunerValues>(DEFAULT_TUNER_VALUES);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setValues((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // Ignore localStorage errors
    }
    setLoaded(true);
  }, []);

  const updateValue = <K extends keyof TunerValues>(key: K, value: TunerValues[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const resetValues = () => {
    setValues(DEFAULT_TUNER_VALUES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const resetPage3Values = () => {
    setValues((prev) => {
      const next = {
        ...prev,
        p3X: DEFAULT_TUNER_VALUES.p3X,
        p3Y: DEFAULT_TUNER_VALUES.p3Y,
        p3Z: DEFAULT_TUNER_VALUES.p3Z,
        p3Scale: DEFAULT_TUNER_VALUES.p3Scale,
        p3RotY: DEFAULT_TUNER_VALUES.p3RotY,
        p3RotX: DEFAULT_TUNER_VALUES.p3RotX,
        waveAmp: DEFAULT_TUNER_VALUES.waveAmp,
        waveYOffset: DEFAULT_TUNER_VALUES.waveYOffset,
        waveThickness: DEFAULT_TUNER_VALUES.waveThickness,
        waveSpeed: DEFAULT_TUNER_VALUES.waveSpeed,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  return (
    <TunerContext.Provider
      value={{ values, updateValue, resetValues, resetPage3Values, isOpen, setIsOpen }}
    >
      {children}
    </TunerContext.Provider>
  );
}

export function useModelTuner() {
  const context = useContext(TunerContext);
  if (!context) {
    throw new Error('useModelTuner must be used within ModelTunerProvider');
  }
  return context;
}
