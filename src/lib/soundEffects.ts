// Web Audio API synthesizer for ambient background music & sound effects

class SoundManager {
  private audioCtx: AudioContext | null = null;
  public isMuted: boolean = false;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, this.audioCtx.currentTime + 0.08); // C6

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch {
      // Ignore audio errors on un-interacted browsers
    }
  }

  public playMysticChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const freqs = [440, 554.37, 659.25, 880, 1108.73]; // A, C#, E, A, C#
      freqs.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.06);
        osc.stop(this.audioCtx.currentTime + idx * 0.06 + 0.8);
      });
    } catch {
      // Ignore audio errors
    }
  }

  public playFanfare() {
    this.playRevealFanfare();
  }

  public playRevealFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const chord = [220, 277.18, 329.63, 440, 554.37, 659.25, 880];
      chord.forEach((freq) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 2.5);
      });
    } catch {
      // Ignore audio errors
    }
  }

  public toggleAmbient() {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  public startAmbient() {
    if (this.isAmbientPlaying || this.isMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.025, this.audioCtx.currentTime);

      this.ambientOsc1 = this.audioCtx.createOscillator();
      this.ambientOsc2 = this.audioCtx.createOscillator();

      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(110, this.audioCtx.currentTime); // A2

      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(164.81, this.audioCtx.currentTime); // E3

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public stopAmbient() {
    try {
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
      this.isAmbientPlaying = false;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
