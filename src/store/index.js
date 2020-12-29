import Vue from "vue";
import Vuex from "vuex";
import rootModule from "./rootModule";
Vue.use(Vuex);

let files = require.context("./module", false, /\.js$/);
files.keys().forEach(item => {
  console.log(item);
  let name = item.replace(/\.\//, "").replace(/\.js/, "");
  let store = files(item).default;
  let module = (rootModule.modules = rootModule.modules || {});
  module[name] = store;
  module[name].namespaced = true;
});
console.log(new Vuex.Store(rootModule));
export default new Vuex.Store(rootModule);
