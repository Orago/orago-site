return {
  color: {
    background: "#F08A4B",
    foreground: "#B05A24"
  },
  data: {
    title: "I'm Orago",
    description: "We do a bit of trollin"
  },
  cssTag: obj => `${obj.tag}[${obj.cType}=${obj.key}]`,
  init: function (obj){
    /* HTML */
    let gonCatImg;
  
    (() => {
      gonCatImg = `data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAypRfMAAAATpJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID4B72Yq2hJkdZAAAAAAElFTkSuQmCC`
    })();
  
    _M.data.background = this.color.background;
    _M.data.foreground = this.color.foreground;
  
    window.nav.updateColors(_M.data.foreground, _M.data.background);

    _M.node().set(obj)
      .inner(`
        <h1 cover-main>${this.data.title}</h1>
        <hr class="color-foreground w-80" style="border: solid; transform: translate(10px, 10px);">
        <h2 class="color-foreground">${this.data.description}</h2>
        <img class="aaaa" cover-image id="goncat" src="${gonCatImg}">
        <span class="color-foreground">
          <h3>Here are some of my favorite things to do!</h3>
          <div class="flex justify-center">
            <ul style="text-align: initial;">
              ${
                (() => {
                  let LIs = "";
                  componentManager.components.info().data.favorite.hobbies.map((item) => LIs += `<li>${item}</li>`);
                  return LIs;
                })()
              }
            </ul>
          </div>
          <br>
          <h2>Currently Listening To</h2>
          <nav meown-component="spotify" spotify-mini="true" spotify-bar="true" spotify-cover="true"></nav>
          <br>
          <h2>Some of My Favorite Games</h2>
          <div class="flex justify-center">
            <ul style="text-align: initial;">
              <li>
                <a href="https://www.minecraft.net/en-us">Minecraft</a>
              </li>
              <li>
                <a href="https://recroom.com/">Rec Room</a>
              </li>
              <li>
                <a href="https://hopfrogsa.net/">Forager</a>
              </li>
            </ul>
          </div>
        </span>
        ${this.styles(obj)}
      `);

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
  
      ${cssTag} h1[cover-main] {
        color: ${foreground};
        font-size: 9vw;
        width: 100%;
        transform: translateY(50%);
      }
  
      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
        ${cssTag} h1[cover-main] {
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
  }
}