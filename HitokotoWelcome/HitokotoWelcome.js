/// <reference path="C:\Users\Administrator\Documents\WORKDIR\HelperLib\src\index.d.ts" />

/// 注册插件
const plugin_name = "HitokotoWelcome";
const plugin_introduction = "进服一言";
const plugin_version = [2, 0, 0];
ll.registerPlugin(plugin_name, plugin_introduction, plugin_version);

/// 初始化配置文件
const plugin_config_dir = "./plugins/Hitokoto/config.json";
const plugin_config_content = {
  api_url: "https://v1.hitokoto.cn",
  hitokoto_type: "i",
  title_color: "§a",
  content_color: "§d",
};
/*
let config = new JsonConfigFile(
    plugin_config_dir,
    JSON.stringify(plugin_config_content));
    */
let config = new JsonConfigFile(
  "./plugins/HitokotoWelcome/config.json",
  JSON.stringify(plugin_config_content)
);

/// 玩家进服事件
mc.listen("onJoin", (player) => {
  // 读取配置并解析
  const api_url = config.get("api_url");
  const type = config.get("hitokoto_type");
  const parameter = "/?encode=text&?c=";
  const hitokoto = api_url + parameter + type;
  const get_url = hitokoto;
  // 发送GET请求
  network.httpGet(get_url, (get_status, get_result) => {
    // 初始化标题及颜色
    const hitokoto_title = "一言:";
    const title_color = config.get("title_color");
    const title = title_color + hitokoto_title;

    // 初始化内容及颜色
    const content_color = config.get("content_color");
    const content = content_color + get_result;
    if (get_status == "200") {
      player.sendToast(title, content);
    } else {
      player.sendToast(title, "§c请求失败，请检查配置文件");
    }
  });
});
