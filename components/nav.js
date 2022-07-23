return {
  init: function (obj){
    let { navStyles, transitionComponent } = this;
  
    if (obj.runTimes == 0){
      window.nav = _M.node().set(obj)
      .className("main-nav fixed flex flex-column")
      .attr({ "main-nav": "" });

      window.nav.toggle = (open) => {
        let hasFloat = [true, false].includes(open) ?
          !open : nav.nodeObject.classList.contains('open');

        nav.nodeObject.classList[hasFloat ? "remove" : "add"]('open');
      }

      window.nav.toggleBtn = _M.node("div")
      .attr({ "toggle": "" })
      .className("basic-button")
      .inner(`Nav`)
      .listen("click", window.nav.toggle).appendTo(window.nav)
      
      
      window.nav.content = _M.node()
      .attr({ "nav-content": "" })
      .inner(`
        <div class="align-text-center">Navigation</div>
        <hr class="color-foreground" style="border: solid;">
      `).appendTo(window.nav);

      window.nav.buttons = _M.node()
      .attr({ "nav-buttons": "" })
      .appendTo(window.nav.content);
      
      
      window.nav.nodeAnd(function (that){
        (that.loadButtons = (/* Load Buttons */) => {
          let navButton = (name = "Home", url = "home", external = false) => {
            let func = external == true ? () => location.href = url : () => componentManager.transition(url);

            let funcShell = () => {
              func();
              window.nav.toggle(false);
            }

            return _M.node("a", {
              setText: name,
              attr: { "nav-button": "" },
              className: "basic-button",
              listen: ["click",  funcShell]
            });
          }

          [
            navButton("Home", "home"),
            navButton("Socials", "socials"),
            navButton("Pages", "pages")
          ].forEach( e => e.appendTo(that.buttons));
        })();

        ((/* Init Values */) => {
          that.updateColors = function (){
            let navStylesObj = document.head.querySelector("[nav-styles]");
  
            if (!navStylesObj) document.head.innerHTML += navStyles(_M.data.foreground, _M.data.background);
            else navStylesObj.outerHTML = navStyles(_M.data.foreground, _M.data.background);
          };

          that.updateColors();
        })();

        _M.node(null, {
          set: document,
          listen: ["scroll", (obj) => {
            let { scrollY, innerHeight, nav } = window;

            let classList = nav.nodeObject.classList,
                hasFloat = scrollY <= 0 && classList.contains('float');

            nav.nodeObject.classList[hasFloat ? "remove" : "add"]('float');
            // document.body.style.paddingTop = hasFloat ? 0 : that.nodeObject.clientHeight+"px";
          }]
        });

        _M.node(null).set(document.body).style({ background: _M.data.background });
      });
    }
  },
  navStyles: (foreground = "black", background = "white") => `
  <style nav-styles>
    body {
      background: ${background};
    }

    .background-background { background: ${background} }
    .background-foreground { background: ${foreground} }
    .color-background { color: ${background} }
    .color-foreground { color: ${foreground} }

    nav[main-nav] {
      
      transition: 0.5s;
      z-index: 10;
    }

    [main-nav] [toggle]{
      position: fixed;
      border-radius: 5px;
      top: 0;
      right: 0;
      padding: 5px;
      margin: 10px;
      z-index: 11;
      cursor: pointer;
      transition: 0.5s;
    }

    [main-nav].open [toggle]{
      margin: 0px;
    }

    [main-nav].open [toggle]:before{
      content: "Close ";
    }

    [main-nav]:not(.open) [toggle]:before {
      content: "Open ";
    }

    [main-nav]:not(.open) [toggle] {
      animation: navH 10s infinite;
      border: solid 2px transparent; 
    }
    
    @keyframes navH {
      80% {
        border-color: transparent;
      }

      85% {
        border-color: ${foreground};
      }
    }

    [main-nav].float:not(.open) [toggle], [main-nav]:not(.open) [toggle]:hover {
      background: rgba(0, 0, 0, .2);
    }

    [main-nav] [nav-content]{
      position: fixed;
      top: 0;
      right: 0;
      visibility: hidden;
      width: 100%;
      height: 0;
      opacity: 0;
      border-radius: 0 0 100% 100%;
      background: ${foreground};
      transition: 0.6s ease;
    }

    nav[main-nav].open [nav-content]{
      visibility: visible;
      opacity: 1;
      right: 0;
      top: 0;
      height: 100%;
      background: ${background};
      border-radius: 0;
    }

    nav[main-nav] [nav-buttons]{
      margin: 15px;
      display: flex;
      flex-direction: column;
    }

    nav[main-nav] a[nav-button] {
      flex: 1 1;
      color: ${foreground};
      padding: 10px;
      margin: 5px;
      border: 1px solid ${foreground};
      border-radius: 10px;
      text-align: center;
      text-decoration: none;
      font-size: 25px;
      font-weight: 1000;
      transition: 0.5s;
    }

    [main-nav] a[nav-button]:hover {
      background: rgba(127.5, 127.5, 127.5, 0.2);
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
      window.nav.toggle(false);
    }, 500);

    
  }
}