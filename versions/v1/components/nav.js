return function (){
  /* HTML */


  let navStyles = (background = "black", foreground = "white") => `
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
        color: ${foreground};
        padding: 10px;
        margin: 5px;
        border: 1px solid ${foreground};
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
        that.updateColors = function (){

          let navStylesObj = document.head.querySelector("[nav-styles]");

          if (!navStylesObj) document.head.innerHTML += navStyles(_M.data.foreground, _M.data.background);
          else navStylesObj.outerHTML = navStyles(_M.data.foreground, _M.data.background);
          
          console.log(navStyles(_M.data.foreground, _M.data.background))
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
      listen: ["click",  () => transitionComponent("aboutme")],
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