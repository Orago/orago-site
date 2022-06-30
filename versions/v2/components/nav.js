return {
  run: function (){
    let { navStyles, transitionComponent } = this;
  
    if (obj.runTimes == 0){
      window.nav = _M.node(null, {
        set: obj,
        className: "main-nav fixed bottom flex justify-space-between",
        attr: {
          "main-nav": ""
        },
        nodeAnd: function (that){
          
          
          _M.node(null, {
            set: document,
            listen: ["scroll", (obj) => {
              let { scrollY, innerHeight } = window;

              if (scrollY + innerHeight + this.nodeObject.clientHeight >= document.body.scrollHeight){
                let gg = _M.difference(this.nodeObject.clientHeight/(scrollY + innerHeight + this.nodeObject.clientHeight - document.body.scrollHeight), 1);
                
                if (gg > 1) gg = 1;

                window.nav.nodeObject.style.transform = `scale(${gg})`;
              }
              else {window.nav.nodeObject.style.transform = ``;

              }
            }]
          });

          that.updateColors = function (){
  
            let navStylesObj = document.head.querySelector("[nav-styles]");
  
            if (!navStylesObj) document.head.innerHTML += navStyles(_M.data.foreground, _M.data.background);
            else navStylesObj.outerHTML = navStyles(_M.data.foreground, _M.data.background);
          };
  
          _M.node(null, {
            set: document.body,
            style: {
              background: _M.data.background
            }
          });
        }
      });
  
      let nav = window.nav;
      
      _M.node("a", {
        setText: "Home",
        attr: { "nav-button": "" },
        listen: ["click",  () => transitionComponent("home")],
        appendTo: nav
      });
    
      _M.node("a", {
        setText: "About Orago",
        attr: { "nav-button": "" },
        listen: ["click",  () => transitionComponent("orago")],
        appendTo: nav
      });
    
      _M.node("a", {
        setText: "Pages",
        attr: { "nav-button": "" },
        listen: ["click",  () => transitionComponent("pages")],
        appendTo: nav
      });
    }
  },
  navStyles: (foreground = "black", background = "white") => `
  <style nav-styles>
    body {
      background: ${background};
    }

    nav[main-nav] {
      background: ${foreground};
      border-radius: 10px 10px 0 0;
      width: 100%;
      padding: 5px;
      z-index: 1000;
      transition: 0.5s;
    }

    .main-nav a[nav-button] {
      flex: 1 1;
      color: ${background};
      padding: 10px;
      margin: 5px;
      border: 1px solid ${background};
      border-radius: 5px;
      text-align: center;
      text-decoration: none;
      font-size: 25px;
      font-weight: 1000;
      transition: 0.5s;
    }

    .main-nav a[nav-button]:hover {
      background: rgba(127.5, 127.5, 127.5, 0.2);
      cursor: pointer;
    }
  </style>
  `,
  transitionComponent: function (name){
    document.body.style.opacity = 0;

    setTimeout(function (){
      document.querySelector("[current-components]").innerHTML = `
      <div meown-component="${name}"></div>
      `;
      componentManager.update();
      document.body.style.opacity = 1;
    }, 500);

    
  }
}