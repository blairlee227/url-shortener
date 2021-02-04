<template>
  <div class="landing-page-layout">
    <div class="section-search">
      <h1>短網址小工具</h1>
      <input class="default-input" v-model="originUrl" />
      <button type="button" class="default-btn" @click="getShortcutLink">
        縮短網址
      </button>
      <!-- 短網址，有資料再顯示 -->
      <p class="new-url" v-if="!!shortCut">短網址：{{ shortCut }}</p>
      <!-- 歷史清單，有資料再顯示 -->
      <div v-if="allUrls.length !== 0">
        歷史清單
        <table>
          <tr v-for="(item, index) in allUrls" :key="index">
            <td>{{ item }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// 短網址 API
import shortcutApi from "../api/shortcut.api.js";

export default {
  name: "Home",
  data() {
    return {
      originUrl: "",
      shortCut: "",
      allUrls: []
    };
  },
  created() {
    // 初始化先取得 localStorage 歷史紀錄清單
    this.geturlList();
  },
  methods: {
    geturlList() {
      // 取得 localStorage 歷史紀錄清單
      let keys = Object.keys(localStorage);
      keys.forEach(eachKey => {
        if (eachKey.includes("url")) {
          let value = localStorage.getItem(eachKey);
          this.allUrls.push(value);
        }
      });
    },
    async getShortcutLink() {
      // 新增短網址
      let newUrl = await shortcutApi
        .addShortcut(this.originUrl)
        .then(response => {
          return response;
        })
        .catch(e => {
          alert(e);
        });
      this.shortCut = newUrl.data.data.picseeUrl;
      // 將短網址暫存到 localStorage
      localStorage.setItem("url", this.shortCut);
      // 重整歷史紀錄清單
      this.geturlList();
    }
  }
};
</script>
<style scoped>
.landing-page-layout {
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
.default-btn {
  height: 50px;
  min-width: 64px;
  padding: 0 30px;
  border-radius: 5rem;
  border: none;
  outline: none;
  font-size: 20px;
  background-color: #f59549;
  color: white;
  margin-top: 1rem;
}
.default-input {
  line-height: 1.75rem;
  width: 50rem;
  max-width: 100%;
  min-height: 50px;
  outline: none;
  padding: 0 30px;
  font-size: 20px;
  margin-top: 1rem;
  border-radius: 8px;
  border: none;
}
.section-search {
  padding: 7rem;
  background-color: #dddcdc;
}
</style>
