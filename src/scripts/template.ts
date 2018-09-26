declare function require(path: string): any;
const art_template = require("../arts/player.art");

class Template {
  /**
   * selector for albumArt
   * @type HTMLImageElement
   */
  public albumArt: HTMLImageElement;
  /**
   * selector for playbtn
   * @type HTMLElement
   */
  public playbtn: HTMLElement;
  /**
   * selector for nextbtn
   * @type HTMLElement
   */
  public nextbtn: HTMLElement;
  /**
   * selector for prevbtn
   * @type HTMLElement
   */
  public prevbtn: HTMLElement;
  /**
   * selector for volumebtn
   * @type HTMLElement
   */
  public volumebtn: HTMLElement;
  /**
   * selector for loopbtn
   * @type HTMLElement
   */
  public loopbtn: HTMLElement;
  /**
   * selector for playSeekBar
   * @type HTMLElement
   */
  public playSeekBar: HTMLElement;
  /**
   * selector for playSeekBarContainer
   * @type HTMLElement
   */
  public playSeekBarContainer: HTMLElement;
  /**
   * selector for volumeSeekBarContainer
   * @type HTMLElement
   */
  public volumeSeekBarContainer: HTMLElement;
  /**
   * selector for volumeSeekBar
   * @type HTMLElement
   */
  public volumeSeekBar: HTMLElement;
  /**
   * selector for playTime
   * @type HTMLElement
   */
  public playTime: HTMLSpanElement;
  /**
   * selector for trackItems
   * @type HTMLElement
   */
  public trackItems: HTMLElement;
  /**
   * selector for playListCollapse
   * @type HTMLElement
   */
  public playListCollapse: HTMLElement;
  /**
   * selector for playListContainer
   * @type HTMLElement
   */
  public playListContainer: HTMLElement;
  /**
   * selector for container
   * @type HTMLElement
   */
  private container: HTMLElement;

  /**
   * @constructor
   * @param container root element
   */
  constructor(container: HTMLElement) {
    this.container = container;
    this.container.innerHTML = art_template({});
    this.init();
  }

  /**
   * method for initialization all player controls
   */
  init() {
    this.albumArt = this.container.querySelector(".jMusicPlayer-albumArt");
    this.playbtn = this.container.querySelector(".jMusicPlayer-playbtn");
    this.nextbtn = this.container.querySelector(".jMusicPlayer-nextbtn");
    this.prevbtn = this.container.querySelector(".jMusicPlayer-prevbtn");
    this.volumebtn = this.container.querySelector(".jMusicPlayer-volumebtn");
    this.loopbtn = this.container.querySelector(".jMusicPlayer-loopbtn");
    this.playSeekBar = this.container.querySelector(".jMusicPlayer-playSeekBar");
    this.playSeekBarContainer = this.container.querySelector(
      ".jMusicPlayer-playSeekBarContainer"
    );
    this.volumeSeekBarContainer = this.container.querySelector(
      ".jMusicPlayer-volumeSeekBarContainer"
    );
    this.volumeSeekBar = this.container.querySelector(".jMusicPlayer-volumeSeekBar");
    this.playTime = this.container.querySelector(".jMusicPlayer-playtime");
    this.playListContainer = this.container.querySelector(".jMusicPlayer-playListContainer");
    this.trackItems = this.container.querySelector(".jMusicPlayer-trackItems");
    this.playListCollapse = this.container.querySelector(".jMusicPlayer-playListCollapse");
  }
}

export default Template;
