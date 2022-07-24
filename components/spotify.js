return {
  color: {
    background: "#1DB954",
    foreground: "#191414"
  },
  data: {
    apiUrl: "https://orago-spotify.glitch.me/current"
  },
  cssTag: obj => `${obj.tag}[${obj.cType}=${obj.key}]`,
  update: async function (obj){
    this.obj = obj;

    let { funcs } = this;

    let selfObj = _M.node().set(obj).setText("Loading..."),
        el = selfObj.nodeObject;

    this.notMini = el.getAttribute("spotify-mini") != "true";

    let { notMini } = this;

    let get = await funcs.get.bind(this)(),
        reloadBtn = funcs.reloadBtn.bind(this)(),
        progressBar = funcs.progressBar.bind(this),
        coverArt = funcs.coverArt.bind(this);

    selfObj.empty();
    
    if (notMini){
      _M.data.background = this.color.background;
      _M.data.foreground = this.color.foreground;

      window.nav.updateColors(_M.data.foreground, _M.data.background);
      
      selfObj.append(
        _M.node("span").inner(this.styles(obj))
      );
    }

    if (get.status == false) selfObj.setText("Offline.").append(reloadBtn);
    else {
      selfObj.append(
        _M.node().setText(get.data.title).nodeAnd(function (){
          if (notMini) this.attr({ "cover-main": true });
        })
      );
      
      if (el.getAttribute("spotify-cover") == "true" || notMini) selfObj.append(coverArt(get.data));
      if (el.getAttribute("spotify-bar") == "true" || notMini) selfObj.append(progressBar(get.data));
    }
  },
  funcs: {
    reloadBtn: function (){
      return _M.node("span").setText("Reload").style({
        border: `solid 2px ${_M.data.foreground}`,
        borderRadius: "10px",
        padding: "5px",
        margin: "5px",
        cursor: "pointer"
      }).listen("click", () => this.update(this.obj));
    },
    get: async function (){
      /* Spotify Api */
      let artists = "", spotifyData;
      let spotifyRequest = await fetch( this.data.apiUrl );

      try {
        spotifyData = await spotifyRequest.json();
      }
      catch (error) {
        throw "Couldn't parse spotify data" + error;
      }

      if (spotifyData.is_playing){
        artists = spotifyData.item.artists.map( (artist, index) => (index > 0) ? " • "+artist.name : artist.name);

        console.log(`Updated spotify song to\n${spotifyData.item.name+" by "+artists}\n${Date()}`);
        
        return {
          data: {
            ...spotifyData,
            title: spotifyData.item.name+" by "+artists,
            song: spotifyData.item.name,
            artists: spotifyData.item.artists,
            artistsString: artists,
          },
          status: true
        };
      }
      else return { status: false };
    },
    progressBar: function (data){
      let bar = _M.node("div").className("").style({
        background: _M.data.foreground,
        width: "50%",
        margin: "auto",
        borderRadius: "10px",
        padding: "5px"
      })

      let barLet = _M.node("div").style({
        background: _M.data.background,
        width: `0%`,
        height: "20px",
        borderRadius: "5px"
      }).appendTo(bar);

      let dateCache = performance.now();

      bar.interval = setInterval(() => {
        let passedTime = performance.now() - dateCache;
        let progressMs = data.progress_ms + passedTime;
        let percent = (progressMs / data.item.duration_ms) * 100;
        let songEnded = percent > 100

        if (!document.body.contains(bar.nodeObject) || songEnded){
          if (songEnded) this.update(this.obj);

          clearInterval(bar.interval);
        }

        barLet.style({ width: `${ percent }%` });
      }, 300);

      return bar;
    },
    coverArt: function (data){
      let { obj, notMini } = this;

      let imageData = data.item.album.images;

      let frame = _M.node().style({ margin: "10px" })

      let coverArt = _M.node().style({
        background: _M.data.foreground,
        width: "30%",
        margin: "auto",
        padding: "10px",
        borderRadius: "10px"
      }).appendTo(frame);

      let coverImage = _M.node("img").className("aspect-ratio")
      .style({
        width: "100%",
        borderRadius: "5px",
        cursor: "pointer",
      })
      .attr({ src: imageData[0].url })
      .appendTo(coverArt);

      // console.log()

        coverImage.listen("click", notMini ? () =>  window.location = data.item.external_urls.spotify : () => componentManager.transition(obj.key)
        );

      return frame;
    }
  },
  styles: function (obj){
    let cssTag = this.cssTag(obj);
    let { foreground, background } = _M.data;

    return `
    <style>
      ${cssTag} {
        background: ${background};
        text-align: center;
      }
  
      ${cssTag} [cover-main] {
        color: ${foreground};
        font-size: 9vw;
        width: 100%;
        margin-top: 100px;
      }
  
      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
        ${cssTag} [cover-main] {
          font-size: 50px;
        }
      }
  
      ${cssTag} img[cover-image]{
        width: 30%;
      }

      ${cssTag} img[cover-image]:after {
        content: "";
        width: 30%;

      }

      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
        ${cssTag} img[cover-image] {
          width: 50%;
        }
      }
    </style>
    `;
  },
}