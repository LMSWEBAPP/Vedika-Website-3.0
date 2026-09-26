/**
 * Web Audio API Analyzer for real-time microphone audio processing.
 * Manages AudioContext, AnalyserNode, MediaStream tracks, and frequency extraction.
 */
export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private frequencyData: Uint8Array<ArrayBuffer> | null = null;
  private isRunning: boolean = false;

  public async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.mediaStream = stream;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      this.audioContext = new AudioContextClass();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 128; // 64 frequency bins
      this.analyser.smoothingTimeConstant = 0.82; // Smooth movement
      this.analyser.minDecibels = -85;
      this.analyser.maxDecibels = -15;

      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);

      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      this.isRunning = true;
    } catch (err) {
      this.stop();
      throw err;
    }
  }

  public getFrequencyData(): Uint8Array<ArrayBuffer> | null {
    if (!this.analyser || !this.frequencyData || !this.isRunning) {
      return null;
    }
    this.analyser.getByteFrequencyData(this.frequencyData);
    return this.frequencyData;
  }

  public getAverageVolume(): number {
    const data = this.getFrequencyData();
    if (!data || data.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum / data.length / 255;
  }

  public stop(): void {
    this.isRunning = false;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore
        }
      });
      this.mediaStream = null;
    }

    if (this.source) {
      try {
        this.source.disconnect();
      } catch {
        // Ignore
      }
      this.source = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {
        // Ignore
      }
      this.audioContext = null;
    }

    this.analyser = null;
    this.frequencyData = null;
  }

  public isActive(): boolean {
    return this.isRunning;
  }
}
