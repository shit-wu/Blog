<template>
  <div>
    <div id="write">
      <h2 class="tip">写点什么</h2>

      <!-- 标题 -->
      <div id="write-title">
        <h2>标题</h2>
        <el-input
          class="title"
          type="text"
          placeholder="请输入内容"
          v-model="blog.title"
          maxlength="30"
          suffix-icon="el-icon-edit"
        ></el-input>
        <el-divider></el-divider>
      </div>

      <!-- 类型 -->
      <div id="write-category">
        <h2>类型</h2>
        <div class="category">
          <el-radio-group v-model="blog.category">
            <el-radio :label="type[0]" name="type[0]"></el-radio>
            <el-radio :label="type[1]" name="type[1]"></el-radio>
            <el-radio :label="type[2]" name="type[2]"></el-radio>
          </el-radio-group>
        </div>
      </div>

      <!-- 标签 -->
      <div id="write-label">
        <el-divider></el-divider>
        <h2>标签</h2>
        <el-input
          class="label"
          v-model="blog.tag"
          placeholder="请输入标签名字"
          suffix-icon="el-icon-price-tag"
        ></el-input>
      </div>
    </div>

    <!-- 正文 -->
    <div id="editor">
      <mavon-editor
        style="height: 100%"
        class="content"
        v-model="blog.content"
      ></mavon-editor>
      <div class="button-wrapper">
        <el-button type="success" class="submit-button" @click="commit"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import addArticle from "../../network/addArticle";
import { getLocalStorage } from "../../store/localStorage";
import store from "../../store/index";

export default {
  name: "Write",
  components: {
    mavonEditor,
  },
  data() {
    return {
      blog: {
        title: "",
        category: "",
        tag: "",
        content: "",
      },
      submtied: false,
      type: ["开发日记", "小总结", "日常"],
    };
  },
  methods: {
    commit() {
      console.log(this.blog);
      const userId = getLocalStorage("userId");
      addArticle(this.blog, userId)
        .then((res) => {
          if (res.status == 200) {
            this.blog.title = "";
            this.blog.category = "";
            this.blog.tag = "";
            this.blog.content = "";
            store.commit("setTotal", store.state.total + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    if (this.blog.content) {
      alert("当前表单还存在未提交的数据，确定要离开吗？");
    }
  },
};
</script>

<style scoped>
#write {
  width: 54%;
  margin: 0 auto;
}
.tip {
  text-align: center;
  border-bottom: 2px solid grey;
  padding-bottom: 10px;
}
.title {
  font-size: 20px;
}
.category {
  margin-top: 20px;
}
.label {
  width: 100%;
  font-size: 20px;
}
#editor {
  margin: 0 auto;
  margin-top: 50px;
  width: 90%;
  height: 780px;
}
.button-wrapper {
  text-align: center;
}
.submit-button {
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>