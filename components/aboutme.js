return function (){
  /* HTML */
  let cssTag = `${obj.tag}[${obj.cType}=${obj.key}]`

  _M.data.background   = "#D78A76";
  _M.data.foreground   = "#CE5E42";
  _M.data.specialColor = "#C23B19";

    window.nav.updateColors(_M.data.foreground, _M.data.background);

  let styles = () => `
  <style>
    ${cssTag} {
      background: ${_M.data.background};
      height: 100%;
      text-align: center;
    }

    ${cssTag} h1[cover-main] {
      color: ${_M.data.foreground};
      font-size: 9vw;
      width: 100%;
      transform: translateY(50%);
    }

    @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
      ${cssTag} h1[cover-main] {
        font-size: 50px;
      }
    }

    ${cssTag} [socials-box]{
      margin: 20px;
      padding: 20px;
    }

    ${cssTag} [socials-box] [social-button]{
      border-radius: 5px;
      margin: 5px;
      padding: 10px;
      font-size: 20px;
      text-decoration: none;
    }

    * {
      color: ${_M.data.specialColor};
      font-size: 18px;
    }
  </style>
  `;

  obj.id = "socials";

  obj.innerHTML = 
  `
  <h1 cover-main>About Me</h1>
  <h2>Yo I'm Orago</h2>
  <h3>Here are some of my favorite things to do!</h3>
  <div class="flex justify-center">
    <ul>
      <li>Drawing</li>
      <li>Programming</li>
      <li>Photography</li>
      <li>Drawing</li>
    </ul>
  </div>
  <br>
  <h2>Some of My Favorite Games</h2>
  <div class="flex justify-center">
    <ul>
      <li>
        <a href="https://www.minecraft.net/en-us">Minecraft</a>
      </li>
      <li>
        <a href="https://recroom.com/">Rec Room</a>
      </li>
      <li>
        <a href="https://hopfrogsa.net/">Forager</a>
      </li>
    </ul>
  </div>
  ${styles()}
  `;

}