return {
  color: {
    background: "#D8D7D5",
    foreground: "#9ea3ab"
  },
  data: {
    title: "404",
    description: "Yo we can't find this page sorry"
  },
  cssTag: obj => `${obj.tag}[${obj.cType}=${obj.key}]`,
  init: function (obj){
    /* HTML */
    let gonCatImg;
  
  
    _M.data.background = this.color.background;
    _M.data.foreground = this.color.foreground;
  
    window.nav.updateColors(_M.data.foreground, _M.data.background);

    _M.node().set(obj)
      .inner(`
        <div class="absolute center-both color-foreground align-text-center">
          <h1 cover-main>${this.data.title}</h1>
          <hr class="w-80" style="border: solid; transform: translate(10px, 10px);">
          <h2>${this.data.description}</h2>
        </div>
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

      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
        ${cssTag} img[cover-image] {
          width: 50%;
        }
      }
    </style>
    `;
  }
}