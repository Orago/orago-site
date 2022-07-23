return {
  cssTag: obj => `${obj.tag}[${obj.cType}=${obj.key}]`,
  init: function (obj){
    _M.node().set(obj)
      .inner(`Error!`);

  }
}