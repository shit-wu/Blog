<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="count">
        <el-input v-model="ruleForm.count"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import login from "../../../network/login";
import { setLocalStorage } from "../../../store/localStorage";

export default {
  name: "Login",
  data() {
    var checkCount = (rule, value, callback) => {
      if (!value) {
        this.$refs.ruleForm.validateField("checkAcount");
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      isLogin: false,
      ruleForm: {
        pass: "",
        count: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        count: [{ validator: checkCount, trigger: "blur" }],
      },
    };
  },
  methods: {
    tpLoginStatus() {
      this.$emit("changeLoginStatus", this.isLogin);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm.count, this.ruleForm.pass)
            .then((res) => {
              console.log(res.data.token);
              this.isLogin = true;
              this.tpLoginStatus();
              setLocalStorage("token", res.data.token);
            })
            .catch((err) => {
              console.log(err);
            });
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.demo-ruleForm {
  width: 100%;
  position: relative;
  right: 20px;
  top: 80px;
}
</style>