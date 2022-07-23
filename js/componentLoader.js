if (_M == undefined) var _M; /* V15 */
class componentLoader {
  constructor (defaultComponent = "home"){
    this.master = "meown";
    this.type = `${this.master}-component`;
    this.missingComponent = "404";
    this.defaultComponent = defaultComponent;
    this.runTimes = 0;
    this.components = {};
    this.componentData = {};
  }

  load = async (id, data = {}) => new Promise( async (resolve, reject) => {
    
    let compString = await (_M.url().fetch({ url: `./components/${id}.js` }));
    
    if (compString.response.status == 404){
      compString = await (_M.url().fetch({ url: `./components/${this.missingComponent}.js` }));

      if (compString.response.status == 404) {
        compString = await (_M.url().fetch({ url: `./components/${this.defaultComponent}.js` }));
      }
    }

    this.componentData[id] = data;

    resolve(_M.and((new Function(await compString.text())), (e) => {
      this.components[id] = e;
      return e;
    }));
  });
  
  transition = async function (name, ms = 1000){
    document.body.style.opacity = 0;
    
    _M.node().qs("[meown-main-component]").attr({ "meown-component": name });
    await componentManager.update();
    _M.url().query(true).set("@", name);

    document.body.style.opacity = 1;
  }
  
  async update (){
    return new Promise( async (resolve, reject) => {
      let components = document.querySelectorAll(`[${this.type}]`);

      for (var i = 0; i < components.length; i++){
        let dataObj = this.bindObj(components[i]);

        let componentData = componentManager.components.hasOwnProperty(dataObj.key) ?
        componentManager.components[dataObj.key] : ( await this.load(dataObj.key, dataObj) )

        let comp =  componentData();

        if (comp.locked == true && this.runTimes > 0) continue;
        if (comp.init) comp.init(dataObj);
      }

      await this.refresh();

      this.runTimes += 1;
      resolve();
    });
  }



  refresh(){
    return new Promise( async (resolve, reject) => {
      let components = document.querySelectorAll(`[${this.type}]`);

      for (var i = 0; i < components.length; i++){
        _M.and(this.bindObj(components[i]), async dataObj => {
          let comp =  (
            await this.load(dataObj.key, dataObj)
          )();

          if (comp.update) comp.update(dataObj);
        });
      }
      
      resolve();
    });
  }

  bindObj (dataObj) {
    return _M.bindData(dataObj, {
      cType: this.type,
      key: dataObj.getAttribute(this.type),
      tag: dataObj.tagName.toLowerCase(),
      runTimes: this.runTimes
    })
  }
}