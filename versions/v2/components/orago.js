return {
  color: {
    background: "#D78A76",
    foreground: "#CE5E42",
    special: "#C23B19"
  },
  cssTag: `${obj.tag}[${obj.cType}=${obj.key}]`,
  run: function (){
    /* HTML */
    _M.data.background   = this.color.background;
    _M.data.foreground   = this.color.foreground;
    _M.data.specialColor = this.color.special;
  
      window.nav.updateColors(_M.data.foreground, _M.data.background);
  
    obj.id = "socials";
  
    obj.innerHTML = 
    `
    <h1 cover-main>I'm Orago</h1>
    
    ${this.styles()}
    `;
  
  },
  styles: function (){
    let { cssTag } = this;
    let { foreground, background } = _M.data;

    return `
    <style>
      ${cssTag} {
        background: ${background};
        height: 100%;
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
  
      ${cssTag} [socials-box]{
        margin: 20px;
        padding: 20px;
      }
  
      ${cssTag} [socials-box] [social-button]{
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
        font-size: 20px;
        text-decoration: none;
      }
  
      * {
        color: ${_M.data.specialColor};
        font-size: 18px;
      }
    </style>
    `
  }
}