/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ShareMyPluginList
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/i18n/en.ts
var EN = {
  commandGenerateList: "Export as List",
  commandGenerateTable: "Export as Table",
  genTableTemplateHeading: "|Name|Author|Version|",
  genTableTemplateAlign: "|----|------|-------|"
};

// src/i18n/zh.ts
var ZH = {
  commandGenerateList: "\u5217\u8868\u5F62\u5F0F\u5BFC\u51FA\u63D2\u4EF6\u540D\u5355",
  commandGenerateTable: "\u8868\u683C\u5F62\u5F0F\u5BFC\u51FA\u63D2\u4EF6\u540D\u5355",
  genTableTemplateHeading: "|\u63D2\u4EF6\u540D|\u4F5C\u8005|\u7248\u672C|",
  genTableTemplateAlign: "|-----|---|----|"
};

// src/i18n/zh-tw.ts
var ZHtw = {
  commandGenerateList: "\u6E05\u55AE\u5F62\u5F0F\u532F\u51FA\u63D2\u4EF6\u540D\u55AE",
  commandGenerateTable: "\u8868\u683C\u5F62\u5F0F\u532F\u51FA\u63D2\u4EF6\u540D\u55AE",
  genTableTemplateHeading: "|\u63D2\u4EF6\u540D|\u4F5C\u8005|\u7248\u672C|",
  genTableTemplateAlign: "|-----|---|----|"
};

// src/i18n/i18n.ts
var Locals = class {
  static get() {
    const lang = window.localStorage.getItem("language");
    switch (lang) {
      case "zh":
        return ZH;
      case "zh-tw":
        return ZHtw;
      default:
        return EN;
    }
  }
};

// main.ts
var ShareMyPluginList = class extends import_obsidian.Plugin {
  async onload() {
    const t = Locals.get();
    console.log(t);
    this.addCommand({
      id: "generate-list",
      name: t.commandGenerateList,
      editorCallback: (editor, view) => {
        this.genList(editor);
      }
    });
    this.addCommand({
      id: "generate-table",
      name: t.commandGenerateTable,
      editorCallback: (editor, view) => {
        this.genTable(editor);
      }
    });
  }
  async genList(editor) {
    const plugins = this.getPlugins();
    let text = [];
    for (let key in plugins) {
      const m = plugins[key].manifest;
      let line = `- [**${m.name}**](${m.pluginUrl})`;
      if (m.author && m.authorUrl) {
        line += ` by [*${m.author2}*](${m.authorUrl})`;
      }
      line += processFunding(m);
      text.push(line);
    }
    editor.replaceSelection(text.join("\n") + "\n");
  }
  async genTable(editor) {
    const plugins = this.getPlugins();
    const t = Locals.get();
    let text = [""];
    text.push(t.genTableTemplateHeading);
    text.push(t.genTableTemplateAlign);
    for (let key in plugins) {
      const m = plugins[key].manifest;
      let name = `[**${m.name}**](${m.pluginUrl})`;
      let author = "";
      if (m.author && m.authorUrl) {
        author = `[${m == null ? void 0 : m.author2}](${m == null ? void 0 : m.authorUrl})`;
      }
      author += processFunding(m);
      text.push(`|${name}|${author}|${m == null ? void 0 : m.version}|`);
    }
    editor.replaceSelection(text.join("\n") + "\n");
  }
  getPlugins() {
    let plugins = this.app.plugins.plugins;
    for (let name in plugins) {
      plugins[name].manifest.pluginUrl = `https://obsidian.md/plugins?id=${plugins[name].manifest.id}`;
      plugins[name].manifest["author2"] = plugins[name].manifest.author.replace(/<.*?@.*?\..*?>/g, "").trim();
    }
    if ("obsidian42-brat" in plugins == false) {
      return plugins;
    }
    const BRAT = plugins["obsidian42-brat"];
    for (let p of BRAT.settings.pluginList) {
      const pSplit = p.split("/");
      let githubAuthor = pSplit[0], name = pSplit[1];
      let find = false;
      if (name.toLowerCase() in plugins) {
        find = true;
      } else {
        name = name.toLowerCase().replace(/^obsidian-?/g, "");
        if (name in plugins) {
          find = true;
        }
      }
      if (find) {
        plugins[name].manifest.pluginUrl = `https://github.com/${p}`;
      }
    }
    return plugins;
  }
  onunload() {
  }
};
function processFunding(m) {
  let info = "";
  if (m.fundingUrl) {
    if (typeof m.fundingUrl == "string") {
      info += ` [\u2661](${m.fundingUrl})`;
    } else if (typeof m.fundingUrl == "object") {
      for (let key in m.fundingUrl) {
        info += ` [\u2661](${m.fundingUrl[key]})`;
      }
    }
  }
  return info;
}
