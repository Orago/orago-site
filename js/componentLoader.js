if (_M == undefined) var _M;
class componentLoader {
  constructor (){
    this.master = "meown";
    this.type = `${this.master}-component`;
    this.runTimes = 0;
    this.components = {};
  }

  load = async (id) => {
    let compString = await _M.get({ format: 'text', url: `./components/${id}.js` });
    let comp = new Function('obj', compString);
    this.components[id] = comp;
    return comp;
  }
  
  async update (){
    let components = document.querySelectorAll(`[${this.type}]`);

    for (var i = 0; i < components.length; i++){
      let dataObj = components[i];
      
      dataObj.cType = this.type;
      dataObj.key   = dataObj.getAttribute(this.type);
      dataObj.tag   = dataObj.tagName.toLowerCase();
      dataObj.runTimes = this.runTimes;

      if (dataObj.getAttribute(`${this.master}-locked`) != undefined && this.runTimes > 0) continue;
      (
        await this.load(dataObj.getAttribute(this.type)))(dataObj).run();
    }

    this.runTimes += 1;
  }
}