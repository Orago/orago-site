if (_M == undefined) var _M;

let componentMaster = "meown";
let componentType = `${componentMaster}-component`;

class componentLoader {
  constructor (){
    this.runTimes = 0;
  }
  
  async update (){
    let components = document.querySelectorAll(`[${componentType}]`);
    for (var i = 0; i < components.length; i++){
      let component = components[i];

      if (component.getAttribute(`${componentMaster}-locked`) != undefined && this.runTimes > 0) continue;
      
      let func = await _M.get({ format: 'text', url: `/components/${component.getAttribute(componentType)}.js` });
      component.cType = componentType;
      component.key   = component.getAttribute(componentType);
      component.tag   = component.tagName.toLowerCase();
      component.runTimes = this.runTimes;
      new Function('obj', func)(component)();
    }

    this.runTimes += 1;
  }
}