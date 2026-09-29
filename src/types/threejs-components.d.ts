declare module 'threejs-components/build/cursors/tubes1.min.js' {
  export interface TubesCursorOptions {
    bloom?: {
      threshold?: number;
      strength?: number;
      radius?: number;
    };
    tubes?: {
      count?: number;
      colors?: string[];
      minRadius?: number;
      maxRadius?: number;
      minTubularSegments?: number;
      maxTubularSegments?: number;
      material?: {
        metalness?: number;
        roughness?: number;
      };
      lights?: {
        intensity?: number;
        colors?: string[];
      };
      lerp?: number;
      noise?: number;
    };
    sleepRadiusX?: number;
    sleepRadiusY?: number;
    sleepTimeScale1?: number;
    sleepTimeScale2?: number;
  }

  export interface TubesCursorInstance {
    three: any;
    options: TubesCursorOptions;
    tubes: any;
    bloomPass: any;
    dispose: () => void;
  }

  const TubesCursor: (canvas: HTMLCanvasElement, options?: TubesCursorOptions) => TubesCursorInstance;
  export default TubesCursor;
}
