"use strict";

const config = require("./lib/config")(hexo);

hexo.extend.injector.register(
  "body_end",
  () => {
    let rtnStr = "";

    if (!config.enable || !config.serverURL) return rtnStr;

    //#region 扩展
    let extensionsAddCookie = "";
    if (config.hasOwnProperty("extensions") && config.extensions) {
      for (const key in config.extensions) {
        if (Object.hasOwnProperty.call(config.extensions, key)) {
          const itemConfig = config.extensions[key];
          let itemConfigJsonStr = JSON.stringify(item);
          extensionsAddCookie  = extensionsAddCookie + `hexoCloudAddCookie("${key}", '${itemConfigJsonStr}', 24);`;
        }
      }
    }
    //#endregion 扩展

    let plugincoreVersion = config.plugincoreVersion;
    rtnStr += `<!-- PluginCore.IPlugins.IWidgetPlugin.Widget(hexo-cloud,${plugincoreVersion},body_end) -->
               <script src="${config.plugincoreLibURL}"></script>
               <script>
                    function hexoCloudAddCookie(name, value, hours) {
                      var str = "hexo_cloud." + name + "=" + escape(value);
                      if (hours > 0) {
                          var date = new Date();
                          var ms = hours * 3600 * 1000;
                          date.setTime(date.getTime() + ms);
                          str += "; expires=" + date.toGMTString() + ";path=/";
                      }
                      document.cookie = str;
                    }
                    // 扩展
                    ${extensionsAddCookie}
                    document.addEventListener('page:loaded', () => {
                        var hexoPluginCore = new PluginCore({
                                baseUrl: "${config.serverURL}"
                            });
                    
                        hexoPluginCore.start();
                    });
               </script>`;

    return rtnStr;
  },
  "default"
);
