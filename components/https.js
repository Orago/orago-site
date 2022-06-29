return {
  run: function (){
    let url = _M.parseUrl();
    if (url.protocol == "http:") location.redirect = `${url.protocol}//${url.host}/${url.pathname+url.search}`;
  }
}