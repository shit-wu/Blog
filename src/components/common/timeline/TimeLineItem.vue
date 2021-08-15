<template>
  <div id="time-line-item">
    <el-card v-for="(article, index) in articles" :key="index" class="card">
      <div
        class="title"
        @click="
          showArticle(article.articleId);
          transportHtml(index);
        "
      >
        <h2>{{ article.title }}</h2>
      </div>
      <div class="label">
        <i class="el-icon-date"></i>
        <span>{{ article.createdAt }}</span>
        <i class="el-icon-folder-opened"></i>
        <span>{{ article.category }}</span>
        <i class="el-icon-discount"></i>
        <span>{{ article.tag }}</span>
        <div class="delete-button-wrap">
          <button
            class="delete-button"
            @click="deleteContent(article.articleId)"
          >
            <span class="delete-button-text">删除文章</span>
          </button>
        </div>
      </div>
      <!-- <div class="content">
        <h4 class="content"></h4>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import marked from "marked";
import store from "../../../store/index";
import getArticle from "../../../network/getArticle";
import deleteArticle from "../../../network/deleteArticle";
import {
  registerSessionStorageListener,
  unregisterSessionStorageListener,
  getSessionStorage,
  setSessionStorage,
} from "../../../store/sessionStorage";

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default {
  name: "TimeLineItem",
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    showArticle(articleId) {
      this.$router.push(`/article/${articleId}`).catch((err) => {
        console.log(err);
      });
    },
    transportHtml(index) {
      store.commit("setHtmlString", this.articles[index].content);
    },
    deleteContent(articleId) {
      console.log(articleId);
      deleteArticle(articleId)
        .then((res) => {
          getArticle()
            .then((res) => {
              console.log(res.data);
              setSessionStorage("articles", res.data);
            })
            .catch((err) => {
              console.log("请求错误~");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSessionStorageChanged(key) {
      if (key == "articles") {
        let articles = getSessionStorage("articles");
        console.log("A", articles);

        if (articles) {
          this.articles = articles;

          this.articles.forEach((element) => {
            return (element.content = marked(element.content));
          });
        }
      }
    },
  },

  beforeMount() {
    registerSessionStorageListener(this.onSessionStorageChanged);

    getArticle()
      .then((res) => {
        console.log(res.data);
        setSessionStorage("articles", res.data);
      })
      .catch((err) => {
        console.log("请求错误~");
        console.log(err);
      });
  },
  beforeDestroy() {
    unregisterSessionStorageListener(this.onSessionStorageChanged);
  },
};
</script>

<style scoped>
#time-line-item {
  width: 100%;
}
.card {
  border-radius: 20px;
  margin-bottom: 35px;
}
.title h2:hover {
  cursor: pointer;
  color: #38b7ea;
}
.card h2 {
  color: #565a5f;
}
.label :nth-child(n + 0) {
  font-size: 16px;
  padding-left: 3px;
  color: #565a5f;
}
.el-icon-folder-opened {
  margin-left: 8px;
}
.el-icon-discount {
  margin-left: 8px;
}
.content {
  color: #565a5f;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.borderline {
  background-color: #dcdfe6;
  font-size: 14px;
}
.delete-button {
  /* color: white; */
  padding: 10px;
  margin-top: 10px;
  background-color: #f56c6c;
  outline: none;
  border-radius: 20px;
}
.delete-button-text {
  color: white;
}
</style>