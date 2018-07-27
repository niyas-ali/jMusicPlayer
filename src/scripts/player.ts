import { Core, IconsTags, RepeatKind, Settings } from "./core";
import Events, { EventKeywords } from "./events";
import Song from "./song";
import Template from "./template";

class Player {
  /**
   * holds template object
   * @type Template
   */
  private template: Template;
  /**
   * holds settings object
   * @type Settings
   */
  private settings: Settings;
  /**
   * holds storage object
   * @type StorageManager
   */
  // private storage: StorageManager;
  /**
   * holds repeatation status
   * @type RepeatKind
   */
  private repeatStatus: RepeatKind = RepeatKind.norepeat;
  /**
   * holds all songs object
   * @type Array<Song>
   */
  private playList: Array<Song> = [];
  /**
   * holds event object
   * @type Events
   */
  public events: Events;
  /**
   * holds core object
   * @type Core
   */
  private core: Core;
  /**
   * holds current track
   * @type Song
   */
  private currentTrack: Song;

  /**
   * @constructor
   * @param options Settings object
   */
  constructor(private options: Settings) {
    this.core = new Core();
    this.events = new Events();
    this.init();

    let songs = new Array<Song>();
    let s = new Song();
    (s.Url = "song.mp3"),
      (s.Name = "First song"),
      (s.Image = "thumb1.jpg"),
      (s.Duration = "3.45");
    songs.push(s);
    s = new Song();
    (s.Url = "song1.mp3"), (s.Name = "second song");
    (s.Image = "thumb2.jpg"), (s.Duration = "2.45");
    songs.push(s);
    s = new Song();
    (s.Url = "song2.mp3"), (s.Name = "third song");
    (s.Image = "thumb3.jpg"), (s.Duration = "5.45");
    songs.push(s);
    this.addTracksToPlayList(songs);

    //checking configurations
    if (options.enableCloseButton) {
      // hide or show close button
    }
    if (options.enableScrolling) {
    }

    if (options.loopPlayList) {
      this.repeatStatus = RepeatKind.playListRepeat;
      this.updateIcons(IconsTags.playListRepeat);
    }
    if (options.scrollMaxHeight) {
      this.template.trackItems.style.height = options.scrollMaxHeight;
    }
  }

  /**
   * method for initializing functionalities
   * @param options Settings object
   */
  private init() {
    let container = null;
    if (this.options.container === "body") {
      container = document.body;
    } else if (/[#.]/.test(this.options.container)) {
      container = document.querySelector(this.options.container);
    } else {
      container = document.getElementById(this.options.container);
    }
    this.template = new Template(container);
    this.registerAllEvents();
  }

  /**
   * register all events related to the player
   */
  registerAllEvents() {
    //#region
    // template related event listener
    this.template.playbtn.addEventListener("click", () => {
      // if the player is not running then we need to play the current track from the list
      if (this.core.getPlayerInstance().src == "") {
        this.playCurrentTrack();
        this.updateIcons(IconsTags.pause);
      } else {
        //when the player is in paused mode we need to play it again or pause it
        if (this.core.getPlayerInstance().paused) {
          this.core.playAudio();
          this.updateIcons(IconsTags.pause);
          this.events.trigger(EventKeywords.onplay);
        } else {
          this.core.pauseAudio();
          this.updateIcons(IconsTags.play);
          this.events.trigger(EventKeywords.onpause);
        }
      }
    });

    this.template.prevbtn.addEventListener("click", () => {
      //calls the previous track from the play list
      this.playPrevTrack();
    });
    this.template.nextbtn.addEventListener("click", () => {
      //calls the  next track from the play list
      this.playNextTrack();
    });
    this.template.volumebtn.addEventListener("click", () => {
      //when the player is in muted mode we need to unmute it or vice versa
      if (this.core.getPlayerInstance().muted) {
        this.core.unMuteAudio();
        this.updateIcons(IconsTags.unmute);
        this.events.trigger(EventKeywords.onunmute);
      } else {
        this.core.muteAudio();
        this.updateIcons(IconsTags.mute);
        this.events.trigger(EventKeywords.onmute);
      }
    });
    this.template.loopbtn.addEventListener("click", () => {
      switch (this.repeatStatus) {
        case RepeatKind.norepeat: {
          this.repeatStatus = RepeatKind.singleRepeat;
          this.updateIcons(IconsTags.singleRepeat);
          break;
        }
        case RepeatKind.singleRepeat: {
          this.repeatStatus = RepeatKind.playListRepeat;
          this.updateIcons(IconsTags.playListRepeat);
          break;
        }
        case RepeatKind.playListRepeat: {
          this.repeatStatus = RepeatKind.norepeat;
          this.updateIcons(IconsTags.norepeat);
          break;
        }
      }
    });
    this.template.playSeekBarContainer.addEventListener("click", e => {
      let vol =
        (e.screenX - this.template.playSeekBarContainer.offsetLeft) /
        this.template.playSeekBarContainer.offsetWidth;
      //checks whether the range is between 0 and 1
      vol = (vol > 1 ? 1 : vol < 0 ? 0 : vol) * 100;
      //updating the slider width
      this.template.playSeekBar.style.width = Math.round(vol) + "%";
      //calculating the current time from the duration
      var curr = vol * this.core.getDuration() / 100;
      //if audio is in completed mode then we need to play it
      if (this.core.getPlayerInstance().ended)
        this.core.getPlayerInstance().play();
      //if audio is not started play yet then we need to play it from the begining
      if (this.core.getPlayerInstance().readyState == 0)
        this.playCurrentTrack();
      //if audio is playing then we are going to update audio current time
      if (this.core.getPlayerInstance().readyState == 4)
        this.core.getPlayerInstance().currentTime = curr;
    });
    this.template.volumeSeekBarContainer.addEventListener("click", e => {
      //calculating volume difference
      var vol =
        (e.screenX - this.template.volumeSeekBarContainer.offsetLeft) /
        this.template.volumeSeekBarContainer.offsetWidth;
      //checks whether the range is between 0 and 1
      vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
      //updating volume
      this.core.getPlayerInstance().volume = vol;
      //updating volume controls icon
      this.updateVolumeBar(vol);
    });
    this.template.playListCollapse.addEventListener("click", () => {
      this.template.playListContainer.style.display =
        this.template.playListContainer.style.display == "none"
          ? "block"
          : "none";
    });
    //#endregion

    //#region
    //audio related event listener
    this.core.getPlayerInstance().addEventListener("ended", () => {
      this.events.trigger(EventKeywords.onend);
      // checking the track looping status
      switch (this.repeatStatus) {
        //if status is single loop then we need to play the current track again
        case RepeatKind.singleRepeat: {
          this.playCurrentTrack();
          break;
        }
        //if status is play list looping then we need to move to the next track from the list
        case RepeatKind.playListRepeat: {
          this.playNextTrack();
          break;
        }
      }
    });
    this.core.getPlayerInstance().addEventListener("error", error => {
      this.events.trigger(EventKeywords.onerror, error);
    });
    this.core.getPlayerInstance().addEventListener("timeupdate", () => {
      //updating current time with time stamp control
      this.template.playTime.innerHTML = this.core.getCurrentTime();
      //updating the slider width
      this.template.playSeekBar.style.width =
        this.core.getPlayerInstance().currentTime *
          100 /
          this.core.getDuration() +
        "%";
      this.events.trigger(EventKeywords.ontimeupdate);
    });
    //#endregion
  }

  /**
   * method for rendering all tracks based on the play list
   */
  public renderPlayList() {
    if (this.playList.length > 0) {
      //based on the configuration showing or hiding play list on UI
      if (this.options.showPlayList) {
        this.template.trackItems.innerHTML = "";
        console.log(this.playList)
        this.playList.forEach((value, index) => {
          let child = document.createElement("li");
          child.id = "__track_id_" + index.toString();
          child.setAttribute("data-index", index.toString());
          child.addEventListener(
            "click",
            this.trackItemClicked.bind(this, child)
          );
          //defining all child elements
          let pipeSpan = document.createElement("span");
          let indexSpan = document.createElement("span");
          let titleSpan = document.createElement("span");
          let durationSpan = document.createElement("span");
          pipeSpan.classList.add("pipe-span");
          indexSpan.classList.add("index-span");
          indexSpan.innerHTML = index.toString();
          titleSpan.innerHTML = value.Name;
          durationSpan.classList.add("duration-span");
          durationSpan.innerHTML = value.Duration;
          child.appendChild(pipeSpan);
          child.appendChild(indexSpan);
          child.appendChild(titleSpan);
          child.appendChild(durationSpan);
          this.template.trackItems.appendChild(child);
        });
        //play if the auto play configuration enabled
        if (this.options.autoPlay) {
          this.playCurrentTrack();
        }
      }
    }
  }

  /**
   * method for updating volume
   * @param stepBy any number between zero and one
   */
  private updateVolumeBar(stepBy: number) {
    this.template.volumeSeekBar.style.width = Math.round(stepBy * 100) + "%";
    if (stepBy == 0) {
      this.core.muteAudio();
      this.updateIcons(IconsTags.mute);
      this.events.trigger(EventKeywords.onmute);
    } else {
      this.core.unMuteAudio();
      this.updateIcons(IconsTags.unmute);
      this.events.trigger(EventKeywords.onunmute);
    }
  }

  /**
   * method for adding current track
   * @param song any Song object
   */
  private setCurrentTrack(song: Song) {
    this.currentTrack = song;
    if (song.Image != "" && song.Image != undefined)
      this.template.albumArt.src = song.Image;
  }

  /**
   * method for getting current track
   */
  private getCurrentTrack() {
    return this.currentTrack;
  }

  /**
   * method for getting track from the play list based on the index
   * @param index song index
   * @returns returns any matching song object or null
   */
  private getTrackByIndex(index: number): Song {
    if (this.playList[index] != undefined) return this.playList[index];
    return null;
  }

  /**
   * method for getting previous track from the play list
   * @returns returns Song object
   */
  private getPreviousTrack() {
    let index = this.playList.indexOf(this.currentTrack);
    if (index > 0 && index < this.playList.length) {
      return this.playList[--index];
    }
  }

  /**
   * method for getting next track from the play list
   * @returns returns Song object
   */
  private getNextTrack() {
    let index = this.playList.indexOf(this.currentTrack);
    if (this.playList.length > ++index) {
      return this.playList[index];
    } else this.events.trigger(EventKeywords.onendofplaylist);
  }

  /**
   * method for adding tracks to the play list
   * @param song
   */
  public addTrackToPlayList(song: Song) {
    let isFirstTime = true;
    if (this.playList.length > 0) isFirstTime = false;
    this.playList.push(song);
    if (isFirstTime) this.setCurrentTrack(this.playList[0]);
    this.renderPlayList();
  }

  /**
   * method for adding list of tracks to the play list
   * @param song array of songs
   */
  public addTracksToPlayList(song: Array<Song>) {
    let isFirstTime = true;
    if (this.playList.length > 0) isFirstTime = false;
    song.forEach((item, index) => {
      this.playList.push(item);
    });
    if (isFirstTime) this.setCurrentTrack(this.playList[0]);
    this.renderPlayList();
  }

  /**
   * method for clearing the play list
   */
  public clearPlayList() {
    this.playList = [];
  }

  /**
   * click handler for the play list track element
   * @param evt span element
   */
  private trackItemClicked(evt: any) {
    let index = parseInt(evt.getAttribute("data-index"));
    let song = this.getTrackByIndex(index);
    if (song != null) {
      this.setCurrentTrack(song);
      this.playCurrentTrack();
    }
    return true;
  }

  /**
   * method for updating icons
   * @param tag enum IconsTags
   */
  private updateIcons(tag: IconsTags) {
    switch (tag) {
      case IconsTags.play: {
        this.template.playbtn.style.backgroundPosition = "left top";
        break;
      }
      case IconsTags.pause: {
        this.template.playbtn.style.backgroundPosition = "right top";
        break;
      }
      case IconsTags.mute: {
        this.template.volumebtn.style.backgroundPosition = "100% top";
        break;
      }
      case IconsTags.unmute: {
        this.template.volumebtn.style.backgroundPosition = "0% top";
        break;
      }
      case IconsTags.norepeat: {
        this.template.loopbtn.style.backgroundPosition = "right top";
        break;
      }
      case IconsTags.singleRepeat: {
        this.template.loopbtn.style.backgroundPosition = "center top";
        break;
      }
      case IconsTags.playListRepeat: {
        this.template.loopbtn.style.backgroundPosition = "left top";
        break;
      }
      default:
        break;
    }
  }

  /**
   * method for adding external event listeners
   * @param eventName event name
   * @param callback handler function
   */
  public addListener(eventName: EventKeywords, callback: Function) {
    this.events.on(eventName, callback);
  }

  /**
   * method for removing specific event handler function
   * @param eventName registered event name
   */
  public removeListener(eventName: EventKeywords, callback: Function) {
    this.events.remove(eventName, callback);
  }

  /**
   * method for removing all event handler function assigned
   * @param eventName registered event name
   */
  public removeAllListener(eventName: EventKeywords) {
    this.events.removeAll(eventName);
  }

  /**
   * method for stopping current playing track
   */
  public stopTrack() {
    this.core.stopAudio();
    this.events.trigger(EventKeywords.onstop);
  }

  /**
   * method for increase or decrease volume manually
   * @param percentage volumne increase amount in percentage
   */
  public setVolume(percentage: number) {
    if (percentage as number) {
      this.core.setVolume(percentage);
    }
  }

  /**
   * method for increasing volume
   */
  public volumeUp() {
    this.core.volumeUp();
  }

  /**
   * method for decreasing volume
   */
  public volumeDown() {
    this.core.volumeDown();
  }

  /**
   * plays the current track
   */
  public playCurrentTrack() {
    if (this.playList.length > 0) {
      this.core.loadAndPlayAudio(this.getCurrentTrack().Url);
      this.updateIcons(IconsTags.pause);
      this.events.trigger(EventKeywords.onplay);
    }
  }

  /**
   * plays the next track from the play list
   */
  public playNextTrack() {
    if (this.playList.length > 0) {
      let track = this.getNextTrack();
      if (track) {
        this.setCurrentTrack(track);
        this.playCurrentTrack();
        this.events.trigger(EventKeywords.onnext);
      }
    }
  }

  /**
   * plays the previous track from the play list
   */
  public playPrevTrack() {
    if (this.playList.length > 0) {
      let track = this.getPreviousTrack();
      if (track) {
        this.setCurrentTrack(track);
        this.playCurrentTrack();
        this.events.trigger(EventKeywords.onprevious);
      }
    }
  }
}

export default Player;
