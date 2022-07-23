return {
  color: {
    background: "#D15909",
    foreground: "#96450F",
    special: "#753409"
  },
  cssTag: obj => `${obj.tag}[${obj.cType}=${obj.key}]`,
  
  init: function (obj){
    let { components: componentLinks, color} = this;

    _M.data.background = color.background;
    _M.data.foreground = color.foreground;
    window.nav.updateColors(_M.data.foreground, _M.data.background);

  
    obj.innerHTML = 
    `
    <h1 cover-main>Page Palette</h1>
    <div socials-box class="flex flex-row flex-wrap"></div>
    ${this.styles(obj)}
    `
  
    let componentLinkButtons = obj.querySelector("[socials-box]");

    let palettes = {};

    for (let componentLink in componentLinks){
      let componentLinkObj = componentLinks[componentLink];

      palettes[componentLinkObj.component] = _M.node("a")
      .attr({
        "social-button": "",
        target: "_blank"
      })
      .style({
        background: this.color.foreground,
        flex: "1 1"
      })
      .append(
        _M.node().setText(componentLink)
        .className("basic-button")
        .listen("click", () => {
          componentManager.transition(componentLinkObj.component);
        })
      ).appendTo(componentLinkButtons);
    }
    
    for (let componentLink in componentLinks){
      let componentLinkObj = componentLinks[componentLink];
      
      if (componentManager.components[componentLinkObj.component]){
        let component = componentManager.components[componentLinkObj.component]({});

        let box = _M.node("div", {
          className: "flex flex-column flex-wrap",
          style: { border: `2px solid ${this.color.special}` },
          appendTo: palettes[componentLinkObj.component]
        })
        
        for (let colorID in component.color){
          let color = component.color[colorID];
          let bc = _M.hexToRGB(color);

          _M.node("div")
          .className("aspect-ratio basic-button")
          .style({
            background: color,
            color: `rgb(${bc[0]-40}, ${bc[1]-40}, ${bc[2]-40})`,
            height: "30px",
            padding: "2px",
            fontSize: "16px"
          })
          .attr({ title: "Click to copy!" })
          .setText(color)
          .listen("click", () => {
            _M.copyTxt(color);
          })
          .appendTo(box);
        }
      }
      else {
        componentManager.load(componentLinkObj.component);

        setTimeout(function (){
          componentManager.transition(obj.key);
        }, 50);

        // componentManager.transition(componentLinkObj.component);
        break;
      }
  
      
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
        overflow: hidden;
      }
  
      ${cssTag} [socials-box] [social-button]{
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
        font-size: 20px;
        text-decoration: none;
        transition: 0.5s;
      }
    </style>
    `;
  },
  components: {
    Home:    { component: "home"    },
    Socials: { component: "socials" },
    "Page Palette": { component: "pages"   },
    "404": { component: "404" },
    "Cat": { component: "cat" }
  },
}