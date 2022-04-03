"use strict";

const config = require("./lib/config")(hexo);

hexo.extend.injector.register(
  "body_end",
  () => {
    let rtnStr = "";

    if (!config.enable || !config.serverURL) return rtnStr;

    //#region 扩展
    let extensionsAddStr = "";
    if (config.hasOwnProperty("extensions") && config.extensions) {
      for (const key in config.extensions) {
        if (Object.hasOwnProperty.call(config.extensions, key)) {
          const itemConfig = config.extensions[key];
          let itemConfigJsonStr = JSON.stringify(itemConfig);
          // 注意: 这里使用规范的 自定义 header, 当然更规范应该用 X- 开头, 并使用 X-Aaa-Bbb 命名
          extensionsAddStr  = extensionsAddStr + `'hexo-cloud-extensions-${key}': '${itemConfigJsonStr}',`;
        }
      }
    }
    //#endregion 扩展

    let plugincoreVersion = config.plugincoreVersion;
    rtnStr += `<!-- PluginCore.IPlugins.IWidgetPlugin.Widget(hexo-cloud,${plugincoreVersion},body_end) -->
               <script src="${config.plugincoreLibURL}"></script>
               <script>
                    document.addEventListener('page:loaded', () => {
                      var hexoPluginCore = new PluginCore({
                        baseUrl: "${config.serverURL}"
                      });
                      
                      // 扩展
                      hexoPluginCore.start(null, {
                        ${extensionsAddStr}
                      });
                    });
               </script>`;

    return rtnStr;
  },
  "default"
);
