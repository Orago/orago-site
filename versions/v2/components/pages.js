return {
  color: {
    background: "#F2AE3F",
    foreground: "#C18424"
  },
  cssTag: `${obj.tag}[${obj.cType}=${obj.key}]`,
  
  run: function (){
    let { components: componentLinks, color} = this;

    _M.data.background = color.background;
    _M.data.foreground = color.foreground;

    window.nav.updateColors(_M.data.foreground, _M.data.background);

    obj.id = "socials";
  
    obj.innerHTML = 
    `
    <h1 cover-main>Pages</h1>
    <div socials-box class="flex flex-row flex-wrap"></div>
    ${this.styles()}
    `
  
    let componentLinkButtons = obj.querySelector("[socials-box]");
    
    for (let componentLink in componentLinks){
      let componentLinkObj = componentLinks[componentLink];
      
      
      if (componentManager.components[componentLinkObj.component]){
        let component = componentManager.components[componentLinkObj.component]({});
        
        componentLinkObj.color = component.color.foreground;
        componentLinkObj.background = component.color.background;
      }
      else {
        componentManager.load(componentLinkObj.component);
        componentManager.components["nav"]({}).transitionComponent(obj.key);
        break;
      }
  
      _M.node("a", {
        attr: {
          "social-button": "",
          target: "_blank"
        },
        style: {
          color: componentLinkObj.color || "white",
          background: componentLinkObj.background || "black",
          flex: "1 1"
        },
        listen: ["click", () => {
          componentManager.components["nav"]({}).transitionComponent(componentLinkObj.component);
        }],
        setText: componentLink,
        appendTo: componentLinkButtons
      });
    }
  
  },
  styles: function (){
    let { cssTag } = this;
    let { foreground, background, special } = _M.data;

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
    </style>
    `;
  },
  components: {
    Home:    { component: "home"    },
    Orago:   { component: "orago"   },
    Socials: { component: "socials" },
    Palette: { component: "palette" }
  },
}