return function (){
  /* HTML */
  let cssTag = `${obj.tag}[${obj.cType}=${obj.key}]`

  let socials = {
    Discord: {
      url: "https://discord.gg/ytBtmHJjmE",
      background: "#738adb"
    },
    Youtube: {
      url: "https://www.youtube.com/channel/UCbVQOO0xb57ja74eLJQJ3Kg",
      background: "#ff0000"
    },
    Twitch: {
      url: "https://www.twitch.tv/oragocat",
      background: "#6441a5"
    },
    Twitter: {
      url: "https://twitter.com/OragoMosh",
      background: "#1DA1F2"
    },
    Reddit: {
      url: "https://www.reddit.com/user/Orago51",
      background: "#FF4301"
    },
    Instagram: {
      url: "https://www.instagram.com/oragocat/",
      background: "#405DE6"
    },
    Minecraft: {
      url: "https://namemc.com/profile/9d9380ad-ccda-46e2-9fef-04e4541be0e1",
      background: "#40ae33"
    }
  }

  _M.data.background = "#EEAB53";
  _M.data.foreground = "#DA7C01";

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
  </style>
  `;

  obj.id = "socials";

  obj.innerHTML = 
  `
  <h1 cover-main>Socials</h1>
  <div socials-box class="flex flex-row flex-wrap"></div>
  ${styles()}
  `

  let socialButtons = obj.querySelector("[socials-box]");
  

  for (social in socials){
    let socialObj = socials[social];

    _M.node("a", {
      attr: {
        "social-button": "",
        href: socialObj.url,
        target: "_blank"
      },
      style: {
        color: socialObj.color || "white",
        background: socialObj.background || "black",
        flex: "1 1"
      },
      setText: social,
      appendCloneTo: socialButtons
    });
  }

}