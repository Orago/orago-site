return function (){
  let styles = [];

  obj.outerHTML = "";
  
  styles.push(
    _M.node("link", {
      attr: { rel: "stylesheet", href: "/css/main.css" }
    }).nodeObject,
    _M.node("link", {
      attr: { rel: "stylesheet", href: "https://orago.glitch.me/mittz-css/v5.css" }
    }).nodeObject
  );
  
  document.head.append(...styles);
}