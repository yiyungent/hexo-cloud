"use strict";

const config = require("./lib/config")(hexo);

hexo.extend.injector.register(
  "body_end",
  () => {
    let rtnStr = "";

    if (!config.enable || !config.serverURL) return rtnStr;

    let plugincoreVersion = config.plugincoreVersion;
    rtnStr += `<!-- PluginCore.IPlugins.IWidgetPlugin.Widget(hexo-cloud,${plugincoreVersion},body_end) -->
               <script src="${config.plugincoreLibURL}"></script>
               <script>
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
