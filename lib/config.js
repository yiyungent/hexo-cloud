module.exports = (hexo) => {
  hexo.config.hexo_cloud = Object.assign(
    {
      enable: true,
      serverURL: "https://api-onetree.moeci.com",
      plugincoreVersion: "latest",
      plugincoreLibURL: "https://unpkg.com/@yiyungent/plugincore/dist/PluginCore.min.js"
    },
    hexo.config.hexo_cloud
  );
  return hexo.config.hexo_cloud;
};
