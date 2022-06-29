return function (){
  /* HTML */


  let navStyles = (color = "white", background = "black") => `
    <style nav-styles>
      nav[main-nav] {
        background: ${background};
        border-radius: 10px 10px 0 0;
        width: 100%;
        padding: 5px;
        z-index: 1000;
      }

      .main-nav a[nav-button] {
        flex: 1 1;
        color: ${color};
        padding: 10px;
        margin: 5px;
        border: 1px solid ${color};
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        font-size: 25px;
        font-weight: 1000;
        transition: 0.5s;
      }

      .main-nav a[nav-button]:hover {
        background: rgba(127.5, 127.5, 127.5, 0.2)
      }
    </style>
    `;

    
  
  if (obj.runTimes == 0){
    window.nav = _M.node(null, {
      set: obj,
      className: "main-nav fixed bottom flex justify-space-between",
      attr: {
        "main-nav": ""
      },
      nodeAnd: function (that){
        that.updateColors = function (color, background){
          if (color)      this.data.color = color;
          if (background) this.data.background = background;

          let navStylesObj = document.head.querySelector("[nav-styles]");

          if (!navStylesObj){
            document.head.innerHTML += navStyles(this.data.color, this.data.background);
          }
          else {
            navStylesObj.outerHTML = navStyles(this.data.color, this.data.background);
          }
        };

        _M.node(null, {
          set: document.body,
          style: {
            background: _M.data.background
          }
        })

        that.updateColors();
      }
    });

    let nav = window.nav;


    function transitionComponent(name){
      document.body.style.background = _M.data.background;
      document.body.style.opacity = 0;

      setTimeout(function (){
        document.querySelector("[current-components]").innerHTML = `
        <div meown-component="${name}"></div>
        `;
        components.update();
        document.body.style.opacity = 1;
        
      },1000);

      
    }

    _M.node("a", {
      setText: "Home",
      attr: { "nav-button": "" },
      listen: ["click",  () => transitionComponent("cover")],
      appendTo: nav
    });
  
    _M.node("a", {
      setText: "About Me",
      attr: { "nav-button": "" },
      appendTo: nav
    });
  
    _M.node("a", {
      setText: "Socials",
      attr: { "nav-button": "" },
      listen: ["click",  () => transitionComponent("socials")],
      appendTo: nav
    });
  }
  

}