const chalk = require("chalk"); // 控制台打印颜色
const latestVersion = require("latest-version"); // 用于获取最新版本的 npm 包
const semver = require("semver"); // 语义化版本工具

function toast(msg) {
  console.log(chalk.green.bgRed.bold(msg));
}

class UpdateNotifier {
  constructor(options) {
    this.check(options);
  }
  async check(options) {
    const { name, version } = options;

    if (!name) {
      console.error("未获取到包名");
      return;
    }
    if (!version) {
      console.error("未获取到当前版本");
      return;
    }

    const latest = await latestVersion(name); // 获取到最新版本号
    if (semver.gt(latest, version.replace(/\^|~/g, ""))) {
      // 最新版本号是否大于当前版本
      toast(`建议更新 ${name} ，${version} => ${latest}`);
    }
  }
}

module.exports = UpdateNotifier;
