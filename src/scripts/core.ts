

export class Core {
  /**
   * holds audio object
   * @type HTMLAudioElement
   * @description HTML5 audio element
   */
  private audioPlayer: HTMLAudioElement;

  /**
   *@constructor
   */
  constructor() {
    if (Audio == undefined) {
      throw Error(
        "HTML5 audio player is not supported. Please upgrade your browser"
      );
    }
    this.audioPlayer = new Audio();
  }

/**
 * method for loading a track from a URL
 * @param url audio source file URL
 */
  loadTrack(url: string) {
    this.audioPlayer.src = url;
  }

  /**
   * method for loading and playing a audio from a URL
   * @param url  audio source file URL
   */
  loadAndPlayAudio(url: string) {
    this.audioPlayer.src = url;
    this.audioPlayer.play();
  }

  /**
   * method for play the loaded audio
   */
  playAudio() {
    this.audioPlayer.play();
  }

  /**
   * method for pausing audio
   */
  pauseAudio() {
    this.audioPlayer.pause();
  }

  /**
   * method for muting audio
   */
  muteAudio() {
    this.audioPlayer.muted = true;
  }

  /**
   * method for unmuting audio
   */
  unMuteAudio() {
    this.audioPlayer.muted = false;
  }

  /**
   * method for stopping playing audio
   */
  stopAudio() {
    if (this.audioPlayer.readyState > 0) {
      this.audioPlayer.currentTime = this.getDuration();
    }
  }

  /**
   * method for enable or disable audio looping
   * @param flag True or False 
   */
  enableLoop(flag: boolean) {
    this.audioPlayer.loop = flag;
  }

  /**
   * method for setting player volume
   * @param percentage value in percentage
   */
  setVolume(percentage: number) {
    let vol = percentage / 100;
    vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
    this.audioPlayer.volume = vol;
  }

  /**
   * method for increasing volume
   */
  volumeUp() {
    let vol =  this.audioPlayer.volume >= 0.9 ? 1 : this.audioPlayer.volume + 0.1;
    this.audioPlayer.volume = vol;
  }

  /**
   * method for decrease volume
   */
  volumeDown() {
    let vol = this.audioPlayer.volume <= 0.1 ? 0 : this.audioPlayer.volume - 0.1;
    this.audioPlayer.volume = vol;
  }
  
  /**
   * method for getting audio instance
   * @returns returns audio object
   * @type HTMLAudioElement
   */
  public getPlayerInstance():HTMLAudioElement {
    return this.audioPlayer;
  }

  /**
   * method for getting current audio time
   * @returns timeStamp
   */
  public getCurrentTime() {
    let timeStamp =
      Math.floor((this.audioPlayer.currentTime % 3600) / 60) +
      ":" +
      Math.floor((this.audioPlayer.currentTime % 3600) % 60) +
      "/" +
      Math.floor((this.audioPlayer.duration % 3600) / 60) +
      ":" +
      Math.floor((this.audioPlayer.duration % 3600) % 60) +
      " ";
    if (timeStamp.indexOf("NaN") > -1) {
      timeStamp = timeStamp.replace(/NaN/g, "00");
    }
    return timeStamp;
  }

  /**
   * method for audio total duration of the playing audio
   * @returns total duration
   */
  public getDuration():number {
    return this.audioPlayer.duration;
  }
}

/**
 * Types of repetition options
 * @type enum
 */
export enum RepeatKind {
  norepeat,
  singleRepeat,
  playListRepeat
}

/**
 * Types of icon options
 * @type enum
 */
export enum IconsTags {
  play,
  pause,
  mute,
  unmute,
  norepeat,
  singleRepeat,
  playListRepeat
}

/**
 * interface for storing configuration detaills
 * @type interface
 */
export interface Settings {
  autoPlay: false;
  showPlayList: true;
  loopPlayList: false;
  enableCloseButton: true;
  enableScrolling: true;
  scrollMaxHeight: "180px";
  container: "body";
}
