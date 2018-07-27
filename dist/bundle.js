!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r,i,a=function(){function t(){if(void 0==Audio)throw Error("HTML5 audio player is not supported. Please upgrade your browser");this.audioPlayer=new Audio}return t.prototype.loadTrack=function(t){this.audioPlayer.src=t},t.prototype.loadAndPlayAudio=function(t){this.audioPlayer.src=t,this.audioPlayer.play()},t.prototype.playAudio=function(){this.audioPlayer.play()},t.prototype.pauseAudio=function(){this.audioPlayer.pause()},t.prototype.muteAudio=function(){this.audioPlayer.muted=!0},t.prototype.unMuteAudio=function(){this.audioPlayer.muted=!1},t.prototype.stopAudio=function(){this.audioPlayer.readyState>0&&(this.audioPlayer.currentTime=this.getDuration())},t.prototype.enableLoop=function(t){this.audioPlayer.loop=t},t.prototype.setVolume=function(t){var e=t/100;e=e>1?1:e<0?0:e,this.audioPlayer.volume=e},t.prototype.volumeUp=function(){var t=this.audioPlayer.volume>=.9?1:this.audioPlayer.volume+.1;this.audioPlayer.volume=t},t.prototype.volumeDown=function(){var t=this.audioPlayer.volume<=.1?0:this.audioPlayer.volume-.1;this.audioPlayer.volume=t},t.prototype.getPlayerInstance=function(){return this.audioPlayer},t.prototype.getCurrentTime=function(){var t=Math.floor(this.audioPlayer.currentTime%3600/60)+":"+Math.floor(this.audioPlayer.currentTime%3600%60)+"/"+Math.floor(this.audioPlayer.duration%3600/60)+":"+Math.floor(this.audioPlayer.duration%3600%60)+" ";return t.indexOf("NaN")>-1&&(t=t.replace(/NaN/g,"00")),t},t.prototype.getDuration=function(){return this.audioPlayer.duration},t}();!function(t){t[t.norepeat=0]="norepeat",t[t.singleRepeat=1]="singleRepeat",t[t.playListRepeat=2]="playListRepeat"}(r||(r={})),function(t){t[t.play=0]="play",t[t.pause=1]="pause",t[t.mute=2]="mute",t[t.unmute=3]="unmute",t[t.norepeat=4]="norepeat",t[t.singleRepeat=5]="singleRepeat",t[t.playListRepeat=6]="playListRepeat"}(i||(i={}));var o,s=function(){function t(){this.events=[]}return t.prototype.on=function(t,e){if(!o[t])throw Error("invalid event type!");this.events[t]||(this.events[t]=[]),this.events[t]&&this.events[t].push(e)},t.prototype.trigger=function(t,e){void 0===e&&(e=null);var n=o[t];this.events[n]&&this.events[n].forEach(function(t){t(e)})},t.prototype.removeAll=function(t){this.events[t]&&delete this.events[t]},t.prototype.remove=function(t,e){var n=this;this.events[t]&&this.events[t].forEach(function(e){delete n.events[t]})},t}();!function(t){t[t.onstop=0]="onstop",t[t.onplay=1]="onplay",t[t.onpause=2]="onpause",t[t.onend=3]="onend",t[t.onnext=4]="onnext",t[t.onprevious=5]="onprevious",t[t.onmute=6]="onmute",t[t.ontimeupdate=7]="ontimeupdate",t[t.onunmute=8]="onunmute",t[t.onendofplaylist=9]="onendofplaylist",t[t.onerror=10]="onerror"}(o||(o={}));var l=s,u=function(){return function(){}}(),p=n(5),c=function(){function t(t){this.container=t,this.container.innerHTML=p({}),this.init()}return t.prototype.init=function(){this.albumArt=this.container.querySelector(".albumArt"),this.playbtn=this.container.querySelector(".playbtn"),this.nextbtn=this.container.querySelector(".nextbtn"),this.prevbtn=this.container.querySelector(".prevbtn"),this.volumebtn=this.container.querySelector(".volumebtn"),this.loopbtn=this.container.querySelector(".loopbtn"),this.playSeekBar=this.container.querySelector(".playSeekBar"),this.playSeekBarContainer=this.container.querySelector(".playSeekBarContainer"),this.volumeSeekBarContainer=this.container.querySelector(".volumeSeekBarContainer"),this.volumeSeekBar=this.container.querySelector(".volumeSeekBar"),this.playTime=this.container.querySelector(".playtime"),this.playListContainer=this.container.querySelector(".playListContainer"),this.trackItems=this.container.querySelector(".trackItems"),this.playListCollapse=this.container.querySelector(".playListCollapse")},t}(),y=function(){function t(t){this.options=t,this.repeatStatus=r.norepeat,this.playList=[],this.core=new a,this.events=new l,this.init();var e=new Array,n=new u;n.Url="song.mp3",n.Name="First song",n.Image="thumb1.jpg",n.Duration="3.45",e.push(n),(n=new u).Url="song1.mp3",n.Name="second song",n.Image="thumb2.jpg",n.Duration="2.45",e.push(n),(n=new u).Url="song2.mp3",n.Name="third song",n.Image="thumb3.jpg",n.Duration="5.45",e.push(n),this.addTracksToPlayList(e),t.enableCloseButton,t.enableScrolling,t.loopPlayList&&(this.repeatStatus=r.playListRepeat,this.updateIcons(i.playListRepeat)),t.scrollMaxHeight&&(this.template.trackItems.style.height=t.scrollMaxHeight)}return t.prototype.init=function(){var t=null;t="body"===this.options.container?document.body:/[#.]/.test(this.options.container)?document.querySelector(this.options.container):document.getElementById(this.options.container),this.template=new c(t),this.registerAllEvents()},t.prototype.registerAllEvents=function(){var t=this;this.template.playbtn.addEventListener("click",function(){""==t.core.getPlayerInstance().src?(t.playCurrentTrack(),t.updateIcons(i.pause)):t.core.getPlayerInstance().paused?(t.core.playAudio(),t.updateIcons(i.pause),t.events.trigger(o.onplay)):(t.core.pauseAudio(),t.updateIcons(i.play),t.events.trigger(o.onpause))}),this.template.prevbtn.addEventListener("click",function(){t.playPrevTrack()}),this.template.nextbtn.addEventListener("click",function(){t.playNextTrack()}),this.template.volumebtn.addEventListener("click",function(){t.core.getPlayerInstance().muted?(t.core.unMuteAudio(),t.updateIcons(i.unmute),t.events.trigger(o.onunmute)):(t.core.muteAudio(),t.updateIcons(i.mute),t.events.trigger(o.onmute))}),this.template.loopbtn.addEventListener("click",function(){switch(t.repeatStatus){case r.norepeat:t.repeatStatus=r.singleRepeat,t.updateIcons(i.singleRepeat);break;case r.singleRepeat:t.repeatStatus=r.playListRepeat,t.updateIcons(i.playListRepeat);break;case r.playListRepeat:t.repeatStatus=r.norepeat,t.updateIcons(i.norepeat)}}),this.template.playSeekBarContainer.addEventListener("click",function(e){var n=(e.screenX-t.template.playSeekBarContainer.offsetLeft)/t.template.playSeekBarContainer.offsetWidth;n=100*(n>1?1:n<0?0:n),t.template.playSeekBar.style.width=Math.round(n)+"%";var r=n*t.core.getDuration()/100;t.core.getPlayerInstance().ended&&t.core.getPlayerInstance().play(),0==t.core.getPlayerInstance().readyState&&t.playCurrentTrack(),4==t.core.getPlayerInstance().readyState&&(t.core.getPlayerInstance().currentTime=r)}),this.template.volumeSeekBarContainer.addEventListener("click",function(e){var n=(e.screenX-t.template.volumeSeekBarContainer.offsetLeft)/t.template.volumeSeekBarContainer.offsetWidth;n=n>1?1:n<0?0:n,t.core.getPlayerInstance().volume=n,t.updateVolumeBar(n)}),this.template.playListCollapse.addEventListener("click",function(){t.template.playListContainer.style.display="none"==t.template.playListContainer.style.display?"block":"none"}),this.core.getPlayerInstance().addEventListener("ended",function(){switch(t.events.trigger(o.onend),t.repeatStatus){case r.singleRepeat:t.playCurrentTrack();break;case r.playListRepeat:t.playNextTrack()}}),this.core.getPlayerInstance().addEventListener("error",function(e){t.events.trigger(o.onerror,e)}),this.core.getPlayerInstance().addEventListener("timeupdate",function(){t.template.playTime.innerHTML=t.core.getCurrentTime(),t.template.playSeekBar.style.width=100*t.core.getPlayerInstance().currentTime/t.core.getDuration()+"%",t.events.trigger(o.ontimeupdate)})},t.prototype.renderPlayList=function(){var t=this;this.playList.length>0&&this.options.showPlayList&&(this.template.trackItems.innerHTML="",console.log(this.playList),this.playList.forEach(function(e,n){var r=document.createElement("li");r.id="__track_id_"+n.toString(),r.setAttribute("data-index",n.toString()),r.addEventListener("click",t.trackItemClicked.bind(t,r));var i=document.createElement("span"),a=document.createElement("span"),o=document.createElement("span"),s=document.createElement("span");i.classList.add("pipe-span"),a.classList.add("index-span"),a.innerHTML=n.toString(),o.innerHTML=e.Name,s.classList.add("duration-span"),s.innerHTML=e.Duration,r.appendChild(i),r.appendChild(a),r.appendChild(o),r.appendChild(s),t.template.trackItems.appendChild(r)}),this.options.autoPlay&&this.playCurrentTrack())},t.prototype.updateVolumeBar=function(t){this.template.volumeSeekBar.style.width=Math.round(100*t)+"%",0==t?(this.core.muteAudio(),this.updateIcons(i.mute),this.events.trigger(o.onmute)):(this.core.unMuteAudio(),this.updateIcons(i.unmute),this.events.trigger(o.onunmute))},t.prototype.setCurrentTrack=function(t){this.currentTrack=t,""!=t.Image&&void 0!=t.Image&&(this.template.albumArt.src=t.Image)},t.prototype.getCurrentTrack=function(){return this.currentTrack},t.prototype.getTrackByIndex=function(t){return void 0!=this.playList[t]?this.playList[t]:null},t.prototype.getPreviousTrack=function(){var t=this.playList.indexOf(this.currentTrack);if(t>0&&t<this.playList.length)return this.playList[--t]},t.prototype.getNextTrack=function(){var t=this.playList.indexOf(this.currentTrack);if(this.playList.length>++t)return this.playList[t];this.events.trigger(o.onendofplaylist)},t.prototype.addTrackToPlayList=function(t){var e=!0;this.playList.length>0&&(e=!1),this.playList.push(t),e&&this.setCurrentTrack(this.playList[0]),this.renderPlayList()},t.prototype.addTracksToPlayList=function(t){var e=this,n=!0;this.playList.length>0&&(n=!1),t.forEach(function(t,n){e.playList.push(t)}),n&&this.setCurrentTrack(this.playList[0]),this.renderPlayList()},t.prototype.clearPlayList=function(){this.playList=[]},t.prototype.trackItemClicked=function(t){var e=parseInt(t.getAttribute("data-index")),n=this.getTrackByIndex(e);return null!=n&&(this.setCurrentTrack(n),this.playCurrentTrack()),!0},t.prototype.updateIcons=function(t){switch(t){case i.play:this.template.playbtn.style.backgroundPosition="left top";break;case i.pause:this.template.playbtn.style.backgroundPosition="right top";break;case i.mute:this.template.volumebtn.style.backgroundPosition="100% top";break;case i.unmute:this.template.volumebtn.style.backgroundPosition="0% top";break;case i.norepeat:this.template.loopbtn.style.backgroundPosition="right top";break;case i.singleRepeat:this.template.loopbtn.style.backgroundPosition="center top";break;case i.playListRepeat:this.template.loopbtn.style.backgroundPosition="left top"}},t.prototype.addListener=function(t,e){this.events.on(t,e)},t.prototype.removeListener=function(t,e){this.events.remove(t,e)},t.prototype.removeAllListener=function(t){this.events.removeAll(t)},t.prototype.stopTrack=function(){this.core.stopAudio(),this.events.trigger(o.onstop)},t.prototype.setVolume=function(t){t&&this.core.setVolume(t)},t.prototype.volumeUp=function(){this.core.volumeUp()},t.prototype.volumeDown=function(){this.core.volumeDown()},t.prototype.playCurrentTrack=function(){this.playList.length>0&&(this.core.loadAndPlayAudio(this.getCurrentTrack().Url),this.updateIcons(i.pause),this.events.trigger(o.onplay))},t.prototype.playNextTrack=function(){if(this.playList.length>0){var t=this.getNextTrack();t&&(this.setCurrentTrack(t),this.playCurrentTrack(),this.events.trigger(o.onnext))}},t.prototype.playPrevTrack=function(){if(this.playList.length>0){var t=this.getPreviousTrack();t&&(this.setCurrentTrack(t),this.playCurrentTrack(),this.events.trigger(o.onprevious))}},t}();e.a=y},function(t,e,n){(function(e){t.exports=!1;try{t.exports="[object process]"===Object.prototype.toString.call(e.process)}catch(t){}}).call(this,n(0))},function(t,e,n){"use strict";(function(e){
/*! art-template@runtime | https://github.com/aui/art-template */
var r=n(2),i=Object.create(r?e:window),a=/["&'<>]/;i.$escape=function(t){return function(t){var e=""+t,n=a.exec(e);if(!n)return t;var r="",i=void 0,o=void 0,s=void 0;for(i=n.index,o=0;i<e.length;i++){switch(e.charCodeAt(i)){case 34:s="&#34;";break;case 38:s="&#38;";break;case 39:s="&#39;";break;case 60:s="&#60;";break;case 62:s="&#62;";break;default:continue}o!==i&&(r+=e.substring(o,i)),o=i+1,r+=s}return o!==i?r+e.substring(o,i):r}(function t(e){"string"!=typeof e&&(e=void 0===e||null===e?"":"function"==typeof e?t(e.call(e)):JSON.stringify(e));return e}(t))},i.$each=function(t,e){if(Array.isArray(t))for(var n=0,r=t.length;n<r;n++)e(t[n],n);else for(var i in t)e(t[i],i)},t.exports=i}).call(this,n(0))},function(t,e,n){"use strict";t.exports=n(3)},function(t,e,n){n(4);t.exports=function(t){"use strict";t=t||{};var e="";return e+='<div class="container">\r\n    <div class="albumArtContainer">\r\n        <img class="albumArt" />\r\n    </div>\r\n    <div class="playerContainer">\r\n        <div class="prevbtn"></div>\r\n        <div class="playbtn"></div>\r\n        <div class="nextbtn"></div>\r\n        <div class="volumeContainer">\r\n            <div class="volumebtn"></div>\r\n            <div class="volumeSeekBarContainer">\r\n                <div class="volumeSeekBar"></div>\r\n            </div>\r\n        </div>\r\n        <div class="loopbtn"></div>\r\n        <div class="playListCollapse"></div>\r\n        <div class="seekBarContainer">\r\n            <span class="playtime">0:00/0:00</span>\r\n            <div class="playSeekBarContainer">\r\n                <div class="playSeekBar"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="playListContainer">\r\n        <ul class="trackItems"></ul>\r\n    </div>\r\n</div>'}},function(t,e,n){"use strict";n.r(e),function(t){var e=n(1);t.Player=e.a}.call(this,n(0))}]);