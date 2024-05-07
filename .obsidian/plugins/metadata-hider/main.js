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
  default: () => MetadataHider
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/i18n.ts
var EN = {
  command: {},
  setting: {
    entries: {
      hide: {
        tableInactive: "Hide in property table",
        tableActive: "Always hide in property table",
        fileProperties: "Hide in file properties (side dock)",
        allProperties: "Hide in all properties (side dock)"
      },
      toggle: "Toggle",
      addEntryToHide: "Add metadata property entry to hide"
    },
    autoFold: {
      name: "Auto fold metadata properties table",
      desc: "Auto fold when opening a note."
    },
    headings: {
      hide: "Hide metadata properties"
    }
  }
};
var ZH = {
  command: {},
  setting: {
    entries: {
      hide: {
        tableInactive: "\u5728\u5C5E\u6027\u8868\u683C\u4E2D\u9690\u85CF",
        tableActive: "\u603B\u662F\u5728\u5C5E\u6027\u8868\u683C\u4E2D\u9690\u85CF",
        fileProperties: "\u5728\u6587\u4EF6\u5C5E\u6027\u4E2D\u9690\u85CF\uFF08\u4FA7\u8FB9\u680F\uFF09",
        allProperties: "\u5728\u6240\u6709\u5C5E\u6027\u4E2D\u9690\u85CF\uFF08\u4FA7\u8FB9\u680F\uFF09"
      },
      toggle: "\u5F00\u5173",
      addEntryToHide: "\u6DFB\u52A0\u8981\u9690\u85CF\u7684\u5143\u6570\u636E\u5C5E\u6027\u6761\u76EE"
    },
    autoFold: {
      name: "\u81EA\u52A8\u6298\u53E0\u5143\u6570\u636E\u5C5E\u6027\u8868\u683C",
      desc: "\u5728\u6253\u5F00\u7B14\u8BB0\u65F6\u81EA\u52A8\u6298\u53E0\u3002"
    },
    headings: {
      hide: "\u9690\u85CF\u5143\u6570\u636E\u5C5E\u6027"
    }
  }
};
var Locals = class {
  static get() {
    const lang = window.localStorage.getItem("language");
    switch (lang == null ? void 0 : lang.toLowerCase()) {
      case "zh":
        return ZH;
      case "zh-tw":
        return ZH;
      default:
        return EN;
    }
  }
};

// src/util.ts
function string2list(properties) {
  return properties.replace(/\n|^\s*,|,\s*$/g, "").replace(/,,+/g, ",").split(",").map((p) => p.trim());
}

// main.ts
var DEFAULT_SETTINGS = {
  autoFold: false,
  hideEmptyEntry: true,
  hideEmptyEntryInSideDock: false,
  propertiesVisible: "",
  // propertiesInvisible: "",
  // propertiesInvisibleAlways: "",
  propertyHideAll: "hide",
  entries: []
};
var MetadataHider = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.debounceUpdateCSS = (0, import_obsidian.debounce)(this.updateCSS, 1e3, true);
  }
  hideInAllProperties() {
    const metadataElement = document.querySelector('.workspace-leaf-content[data-type="all-properties"] .view-content');
    if (metadataElement == null) {
      return;
    }
    let propertiesInvisible = this.settings.entries.filter((entry) => entry.hide.allProperties).map((entry) => entry.name);
    const items = metadataElement.querySelectorAll(".tree-item");
    items.forEach((item) => {
      const inner = item.querySelector(".tree-item-inner");
      if (inner && inner.textContent && propertiesInvisible.includes(inner.textContent)) {
        item.classList.add("mh-hide");
      } else {
        item.classList.remove("mh-hide");
      }
    });
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new MetadataHiderSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      setTimeout(() => {
        this.updateCSS();
      }, 100);
    });
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      this.app.workspace.onLayoutReady(() => {
        setTimeout(() => {
          this.hideInAllProperties();
          ;
        }, 100);
      });
    }));
    this.registerDomEvent(document, "focusin", (evt) => {
      var _a;
      const target = evt.target;
      const metadataElement = document.querySelector(".workspace-leaf.mod-active .metadata-container");
      if (metadataElement === null) {
        return;
      }
      if (metadataElement == null ? void 0 : metadataElement.contains(target)) {
        metadataElement.classList.add("is-active");
        this.isMetadataFocused = true;
        if ((_a = target == null ? void 0 : target.classList) == null ? void 0 : _a.contains("metadata-add-button")) {
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          });
          target.dispatchEvent(clickEvent);
        }
      } else if (this.isMetadataFocused) {
        this.isMetadataFocused = false;
        metadataElement.classList.remove("is-active");
      }
    });
    this.registerDomEvent(document, "focusout", (evt) => {
      const target = evt.target;
      const metadataElement = document.querySelector(".workspace-leaf.mod-active .metadata-container");
      if (metadataElement == null ? void 0 : metadataElement.contains(target)) {
        this.isMetadataFocused = false;
        setTimeout(() => {
          if (!this.isMetadataFocused) {
            metadataElement.classList.remove("is-active");
          }
        }, 100);
      }
    });
    this.registerEvent(this.app.workspace.on("file-open", (file) => {
      if (!this.settings.autoFold) {
        return;
      }
      const metadataElement = document.querySelector(".workspace-leaf.mod-active .metadata-container");
      if (!(metadataElement == null ? void 0 : metadataElement.classList.contains("is-collapsed"))) {
        this.app.commands.executeCommandById(`editor:toggle-fold-properties`);
      }
    }));
  }
  onunload() {
    const parentElement = this.styleTag.parentElement;
    if (parentElement) {
      parentElement.removeChild(this.styleTag);
    } else {
      console.error("Parent element not found.");
    }
  }
  updateCSS() {
    var _a;
    this.styleTag = document.createElement("style");
    this.styleTag.id = "css-metadata-hider";
    let headElement = document.getElementsByTagName("head")[0];
    const existingStyleTag = headElement.querySelector("#" + this.styleTag.id);
    if (existingStyleTag) {
      (_a = existingStyleTag.parentNode) == null ? void 0 : _a.removeChild(existingStyleTag);
    }
    headElement.appendChild(this.styleTag);
    this.styleTag.innerText = genAllCSS(this);
    this.hideInAllProperties();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.upgradeSettingsToVersion1();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  upgradeSettingsToVersion1() {
    if (this.settings.entries.length == 0 && // @ts-ignore
    (this.settings.propertiesInvisible || this.settings.propertiesInvisibleAlways)) {
      const propertiesInvisible = string2list(this.settings.propertiesInvisible);
      const propertiesInvisibleAlways = string2list(this.settings.propertiesInvisibleAlways);
      const inter = propertiesInvisible.filter((x) => propertiesInvisibleAlways.includes(x));
      const union = /* @__PURE__ */ new Set([...propertiesInvisible, ...propertiesInvisibleAlways]);
      const diff1 = new Set([...union].filter((x) => !propertiesInvisible.includes(x)));
      const diff2 = new Set([...union].filter((x) => !propertiesInvisibleAlways.includes(x)));
      const entries = [];
      for (let key of inter) {
        entries.push({ name: key, hide: { tableInactive: true, tableActive: true } });
      }
      for (let key of diff1) {
        entries.push({ name: key, hide: { tableInactive: true, tableActive: true } });
      }
      for (let key of diff2) {
        entries.push({ name: key, hide: { tableInactive: true } });
      }
      this.settings.entries = entries;
      this.saveSettings();
    }
  }
};
function genCSS(properties, cssPrefix, cssSuffix, parentSelector = "") {
  let body = [];
  parentSelector = parentSelector ? parentSelector + " " : "";
  for (let property of properties) {
    body.push(`${parentSelector}.metadata-container > .metadata-content > .metadata-properties > .metadata-property[data-property-key="${property.trim()}"]`);
  }
  const sep = " ";
  return cssPrefix + sep + body.join("," + sep) + sep + cssSuffix + sep + sep;
}
function genAllCSS(plugin) {
  const s = plugin.settings;
  let content = [];
  if (s.hideEmptyEntry) {
    content = content.concat([
      // Show all metadata when it is focused
      `.metadata-container.is-active .metadata-property { display: flex !important; }`,
      /* * Hide the metadata that is empty */
      `.metadata-property:has(.metadata-property-value .mod-truncate:empty),`,
      `.metadata-property:has(.metadata-property-value input.metadata-input[type="number"]:placeholder-shown),`,
      `.metadata-property[data-property-type="text"]:has(input[type="date"]),`,
      `.metadata-property:has(.metadata-property-value .multi-select-container > .multi-select-input:first-child) {`,
      `	display: none;`,
      `}`
    ]);
  }
  if (!s.hideEmptyEntryInSideDock) {
    content.push(`.mod-sidedock .metadata-property { display: flex !important; }`);
  }
  if (s.propertyHideAll.trim()) {
    content.push([
      `.metadata-container:has(.metadata-property[data-property-key="${s.propertyHideAll.trim()}"] input[type="checkbox"]:checked) {`,
      `  display: none;`,
      `}`,
      ``
    ].join("\n"));
  }
  content.push(genCSS(
    plugin.settings.entries.filter((e) => e.hide.fileProperties).map((e) => e.name),
    "/* * Invisible in file properties */",
    " { display: none !important; }",
    `.workspace-leaf-content[data-type="file-properties"] `
  ));
  content.push(genCSS(
    plugin.settings.entries.filter((e) => e.hide.tableInactive || e.hide.tableActive).map((e) => e.name),
    "/* * Invisible in properties table (in .mod-root) */",
    " { display: none; }"
  ));
  content.push(genCSS(
    plugin.settings.entries.filter((e) => e.hide.tableActive).map((e) => e.name),
    "/* * Always invisible in properties table (in .mod-root) */",
    " { display: none !important; }",
    ".workspace-split:not(.mod-sidedock) "
  ));
  content.push(genCSS(
    string2list(plugin.settings.propertiesVisible),
    "/* * Always visible */",
    " { display: flex; }"
  ));
  return content.join(" ");
}
var MetadataHiderSettingTab = class extends import_obsidian.PluginSettingTab {
  // debouncedGenerate: Function;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  getLang() {
    let lang = window.localStorage.getItem("language");
    if (lang == null || ["en", "zh", "zh-TW"].indexOf(lang) == -1) {
      lang = "en";
    }
    return lang;
  }
  display() {
    const { containerEl } = this;
    const ts = Locals.get().setting;
    const lang = this.getLang();
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName(ts.autoFold.name).setDesc(ts.autoFold.desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoFold).onChange(async (value) => {
        this.plugin.settings.autoFold = value;
        await this.plugin.saveSettings();
        this.plugin.debounceUpdateCSS();
      });
    });
    new import_obsidian.Setting(containerEl).setName({ en: "Metadata properties that keep displaying", zh: "\u6C38\u8FDC\u663E\u793A\u7684\u6587\u6863\u5C5E\u6027\uFF08\u5143\u6570\u636E\uFF09", "zh-TW": "\u6C38\u9060\u986F\u793A\u7684\u6587\u4EF6\u5C6C\u6027\uFF08\u5143\u6578\u64DA\uFF09" }[lang]).setDesc({ en: "Metadata properties will always display even if their value are empty. Metadata property keys are separated by comma (`,`).", zh: "\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF08`,`\uFF09\u3002\u5982\uFF1A\u201Ctags, aliases\u201D", "zh-TW": "\u4EE5\u9017\u865F\u5206\u9694\uFF08`,`\uFF09" }[lang]).addTextArea(
      (text) => text.setValue(this.plugin.settings.propertiesVisible).onChange(async (value) => {
        this.plugin.settings.propertiesVisible = value;
        await this.plugin.saveSettings();
        ;
        this.plugin.debounceUpdateCSS();
      })
    );
    containerEl.createEl("h3", { text: ts.headings.hide });
    new import_obsidian.Setting(containerEl).setName({ en: "Hide empty metadata properties", zh: "\u9690\u85CF\u503C\u4E3A\u7A7A\u7684\u6587\u6863\u5C5E\u6027\uFF08\u5143\u6570\u636E\uFF09", "zh-TW": "\u96B1\u85CF\u7A7A\u767D\u6587\u4EF6\u5C6C\u6027\uFF08\u5143\u6578\u64DA\uFF09" }[lang]).setDesc("").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.hideEmptyEntry).onChange(async (value) => {
        this.plugin.settings.hideEmptyEntry = value;
        await this.plugin.saveSettings();
        this.plugin.debounceUpdateCSS();
        this.display();
      });
    });
    if (this.plugin.settings.hideEmptyEntry) {
      new import_obsidian.Setting(containerEl).setName({ en: "Hide empty metadata properties also in side dock", zh: "\u4FA7\u8FB9\u680F\u4E5F\u9690\u85CF\u503C\u4E3A\u7A7A\u7684\u6587\u6863\u5C5E\u6027\uFF08\u5143\u6570\u636E\uFF09", "zh-TW": "\u5074\u908A\u6B04\u4E5F\u96B1\u85CF\u7A7A\u767D\u6587\u4EF6\u5C6C\u6027\uFF08\u5143\u6578\u64DA\uFF09" }[lang]).setDesc("").addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.hideEmptyEntryInSideDock).onChange(async (value) => {
          this.plugin.settings.hideEmptyEntryInSideDock = value;
          await this.plugin.saveSettings();
          this.plugin.debounceUpdateCSS();
        });
      });
    }
    new import_obsidian.Setting(containerEl).setName({ en: "Key to hide the whole metadata properties table", zh: "\u9690\u85CF\u6574\u4E2A\u6587\u6863\u5C5E\u6027\uFF08\u5143\u6570\u636E\uFF09\u8868\u683C", "zh-TW": "\u96B1\u85CF\u6574\u500B\u6587\u6A94\u5C6C\u6027\uFF08\u5143\u6578\u64DA\uFF09\u8868\u683C" }[lang]).setDesc({ en: `when its value is true, the whole metadata properties table will be hidden`, zh: `\u5F53\u8BE5\u5C5E\u6027\u503C\u4E3A\u771F\u65F6`, "zh-TW": `\u7576\u8A72\u5C6C\u6027\u503C\u70BA\u771F\u6642` }[lang]).addText((cb) => {
      cb.setPlaceholder({ en: "entry name", zh: "\u6587\u6863\u5C5E\u6027\u540D\u79F0", "zh-TW": "\u6587\u4EF6\u5C6C\u6027\u540D\u7A31" }[lang]).setValue(this.plugin.settings.propertyHideAll).onChange(async (newValue) => {
        this.plugin.settings.propertyHideAll = newValue;
        await this.plugin.saveSettings();
        this.plugin.debounceUpdateCSS();
      });
    });
    let addEntryButton = new import_obsidian.Setting(containerEl).setName(ts.entries.addEntryToHide).addButton((button) => {
      button.setTooltip("Add new icon").setButtonText("+").setCta().onClick(async () => {
        if (this.plugin.settings.entries.filter((e) => e.name === "").length > 0) {
          new import_obsidian.Notice(`There is still unnamed entry!`);
          return;
        }
        this.plugin.settings.entries.push({
          name: "",
          hide: {
            tableInactive: true,
            tableActive: false,
            fileProperties: false,
            allProperties: false
          }
        });
        await this.plugin.saveSettings();
        this.display();
      });
    });
    addEntryButton.descEl.append(
      createDiv({ text: `${ts.entries.toggle} 1: ${ts.entries.hide.tableInactive}` }),
      createDiv({ text: `${ts.entries.toggle} 2: ${ts.entries.hide.tableActive}` }),
      createDiv({ text: `${ts.entries.toggle} 3: ${ts.entries.hide.fileProperties}` }),
      createDiv({ text: `${ts.entries.toggle} 4: ${ts.entries.hide.allProperties}` })
    );
    this.plugin.settings.entries.forEach((entrySetting, index) => {
      const s = new import_obsidian.Setting(this.containerEl);
      s.setClass("metadata-hider-setting-entry");
      s.addText((cb) => {
        cb.setPlaceholder("entry name").setValue(entrySetting.name).onChange(async (newValue) => {
          this.plugin.settings.entries[index].name = newValue.trim();
          await this.plugin.saveSettings();
          this.plugin.debounceUpdateCSS();
        });
      });
      let toggles = {};
      for (let key of ["tableInactive", "tableActive", "fileProperties", "allProperties"]) {
        s.addToggle((toggle) => {
          toggles[key] = toggle;
          toggle.setValue(this.plugin.settings.entries[index].hide[key]).setTooltip(ts.entries.hide[key]).onChange(async (value) => {
            this.plugin.settings.entries[index].hide[key] = value;
            if (key === "tableInactive" && value === false) {
              this.plugin.settings.entries[index].hide.tableActive = false;
              toggles["tableActive"].setValue(false);
            }
            if (key === "tableActive" && value === true) {
              this.plugin.settings.entries[index].hide.tableInactive = true;
              toggles["tableInactive"].setValue(true);
            }
            await this.plugin.saveSettings();
            this.plugin.debounceUpdateCSS();
          });
        });
      }
      s.addExtraButton((cb) => {
        cb.setIcon("cross").setTooltip("Delete Entry").onClick(async () => {
          this.plugin.settings.entries.splice(index, 1);
          await this.plugin.saveSettings();
          this.display();
          this.plugin.debounceUpdateCSS();
        });
      });
    });
    let noteEl = containerEl.createEl("p", {
      text: {
        en: `When the metadata properties table is focused, (i.e. inputting metadata properties), all metadata properties will be displayed, except metadata properties that are marked as "Always hide".`,
        zh: `\u5F53\u6587\u6863\u5C5E\u6027\uFF08\u5143\u6570\u636E\uFF09\u8868\u683C\u83B7\u5F97\u7126\u70B9\u65F6\uFF08\u5373\u8F93\u5165\u5143\u6570\u636E\uFF09\uFF0C\u9664\u201C\u6C38\u8FDC\u9690\u85CF\u7684\u6587\u6863\u5C5E\u6027\u201D\u5916\u7684\u6240\u6709\u6587\u6863\u5C5E\u6027\u90FD\u5C06\u663E\u793A\u3002`,
        "zh-TW": `\u7576\u6587\u6A94\u5C6C\u6027\uFF08\u5143\u6578\u64DA\uFF09\u8868\u683C\u7372\u5F97\u7126\u9EDE\u6642\uFF08\u5373\u8F38\u5165\u5143\u6578\u64DA\uFF09\uFF0C\u9664\u300C\u6C38\u9060\u96B1\u85CF\u7684\u6587\u4EF6\u5C6C\u6027\u300D\u5916\u7684\u6240\u6709\u6587\u6A94\u5C6C\u6027\u90FD\u5C07\u986F\u793A\u3002`
      }[lang]
    });
    noteEl.setAttribute("style", "color: gray; font-style: italic; margin-top: 30px;");
  }
};
