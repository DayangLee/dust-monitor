<template>
  <q-transition appear enter="fadeIn" leave="fadeOut" duration="250">
    <div class="login-wrapper">
      <div class="login-content bg-white">
      <div class="text-center">
        <div style="font-size:2rem;">
          <!-- {{status === 'username' ? '登录 / 注册' : status.includes('login') ? '登录' : '注册'}} -->
          汉王扬尘监测系统
        </div>
      </div>

      <div class="fields" style="margin:30px;">
          <q-field class="field" :icon="usernameIcon" :count="status === 'username' ? usernameAutoComplete : null" :helper="status==='username'?`根据${usernameType==='phone'&&'手机号码'||usernameType==='email'&&'邮箱地址'||'用户名'}自动检测注册/登录`:null" v-show="usernameShown" :error="usernameError" error-label="手机号码 邮箱地址 或 用户名 错误">
          <q-input v-model.trim="username" float-label="手机号码  邮箱地址 或 用户名" ref="username" autofocus :clearable="!usernameDisabled" :loading="loading && status === 'username'" :disable="usernameDisabled" @change="usernameError = false" @keyup.enter="enterPressed('u')">
            <q-autocomplete @search="function(terms, done) {
                done([])
                if (username.length==11){
                  checkUni()
                }
              }" :min-characters="usernameAutoComplete" />
          </q-input>
        </q-field>

        <q-field class="field" icon="code" v-show="loginVerificationShown" :error="verificationError" error-label="验证码错误">
          <q-input v-model.trim="verification" clearable float-label="验证码" ref="verification" :loading="loading" @change="verificationError = false">
            <q-autocomplete @search="function(terms, done) {
                done([])
                verify()
              }" :min-characters="6" />
          </q-input>
        </q-field>

        <q-field class="field" icon="code" v-show="registerVerificationShown" :error="verificationError" error-label="验证码错误">
          <q-input v-model.trim="verification" clearable float-label="验证码" ref="verification" :loading="loading" @change="verificationError = false" @keyup.enter="enterPressed('v')">
            <q-autocomplete @search="function(terms, done) {
                done([])
                verify()
              }" :min-characters="6" />
          </q-input>
        </q-field>

        <q-field class="field" icon="lock" v-show="passwordShown" :error="passwordError" error-label="密码错误">
          <q-input v-model.trim="password" type="password" clearable :float-label="`密码${status.includes('setPassword')?'(可选)':''}`" ref="password" @change="passwordError = false" @keyup.enter="enterPressed('p')"></q-input>
        </q-field>
        
      </div>
      

      <div class="buttons">
        <q-btn :icon="usernameIcon" @click="checkUni" class="row full-width btn" color="primary" v-model="loading" loader v-show="status === 'username' && (username.length>=6 && usernameType !== 'phone' || undoed && usernameType === 'phone' && username.length >= 11)">
          使用{{usernameType === 'email' ? '邮箱' : usernameType === 'phone' ? '手机' : '用户名'}}
        </q-btn>

        <q-btn icon="fa-sign-in" v-if="status === 'login-password'" v-model="loading" loader @click="login" class="full-width btn" color="primary">登录</q-btn>

        <q-btn icon="send" v-if="status === 'login-password' && this.usernameType !== 'user'" v-model="loading" loader @click="send" class="full-width btn">通过验证码登录</q-btn>

        <q-btn icon="repeat" v-if="status === 'register-verification' || status === 'login-verification'" @click="send" loader dark-percentage :percentage="verificationPercentage" v-model="verificationProcessing" class="full-width btn">
          再次发送验证码
          <span v-if="verificationProcessing" slot="loading">
            <q-spinner-facebook class="on-left" /> 再次发送验证码
          </span>
        </q-btn>

        <q-btn icon="fa-fast-forward" v-if="status === 'login-setPassword'" v-model="loading" loader @click="loginByVcode" class="full-width btn">仅登录(不修改密码)</q-btn>

        <q-btn icon="fa-sign-in" v-if="status === 'login-setPassword'" v-model="loading" loader @click="update" class="full-width btn" color="primary">修改密码</q-btn>

        <q-btn icon="send" v-if="status === 'register-presend'" v-model="loading" loader @click="send" class="full-width btn" color="primary">通过验证码注册</q-btn>

        <q-btn icon="done" v-if="status === 'register-setPassword' && password.length >= 6" v-model="loading" loader @click="register" class="full-width btn" color="primary">设置密码并注册</q-btn>

        <q-btn icon="fa-fast-forward" v-if="status === 'register-setPassword'" v-model="loading" loader @click="register" class="full-width btn">注册(不设置密码)</q-btn>

        <q-btn icon="undo" v-if="status !== 'username'" @click="popStatus" class="full-width btn">返回上一步</q-btn>

      </div>
      </div>
    </div>
  </q-transition>
</template>

<script>
const s2i = new Map([
  ["username", "U"],
  ["login-password", "UP"],
  ["login-verification", "uV"],
  ["login-setPassword", "uP"],
  ["register-presend", "U"],
  ["register-verification", "uV"],
  ["register-setPassword", "uP"]
]);
import { userService } from "api/index";
import { isChinese } from "lib/params";
import { Alert } from "quasar";
import md5 from "js-md5";
import "quasar-extras/animate";
let Base64 = require("js-base64").Base64;
export default {
  data: () => ({
    statusList: ["username"],
    username: "",
    usernameError: false,
    usernameChangedSinceHead: false,
    verification: "",
    verificationError: false,
    varificationExchanged: "",
    verificationPercentage: 0,
    verificationProcessing: false,
    password: "",
    passwordError: false,
    loading: false,
    undoed: false
  }),
  watch: {
    username: function() {
      this.usernameChangedSinceHead = true;
    }
  },
  computed: {
    status: function() {
      console.log([...this.statusList].pop());
      return [...this.statusList].pop();
    },
    usernameType: function() {
      return this.username === "" || /^1(3|4|5|7|8)\d{9}$/.test(this.username)
        ? "phone"
        : this.username.includes("@") ? "email" : "user";
    },
    usernameIcon: function() {
      return this.usernameType === "user" ? "person" : this.usernameType;
    },
    usernameAutoComplete: function() {
      return this.usernameType === "phone" ? 11 : null;
    },
    usernameShown: function() {
      return s2i
        .get(this.status)
        .toLowerCase()
        .includes("u");
    },
    usernameDisabled: function() {
      return this.loading || s2i.get(this.status).includes("u");
    },
    passwordShown: function() {
      return s2i
        .get(this.status)
        .toLowerCase()
        .includes("p");
    },
    loginVerificationShown: function() {
      return this.status === "login-verification";
    },
    registerVerificationShown: function() {
      return this.status === "register-verification";
    }
  },
  methods: {
    enterPressed(e) {
      console.log(e);
      if (this.status === "username") {
        this.loading = true;
        this.checkUni();
      } else if (this.status === "login-password") {
        if (e === "u") {
          this.$refs.password.focus();
        } else {
          this.loading = true;
          this.login();
        }
      } else if (this.status.includes("verification")) {
        this.loading = true;
        this.verify();
      } else if (this.status === "login-setPassword") {
        this.loading = true;
        this.update();
      } else if (this.status === "register-presend") {
        this.loading = true;
        this.send();
      } else if (this.status === "register-setPassword") {
        this.loading = true;
        this.register();
      }
    },
    unknownError(message) {
      const alert = Alert.create({
        enter: "bounceInRight",
        leave: "bounceOutRight",
        color: "negative",
        icon: "error",
        html: `${message}`,
        position: "top-right"
      });

      setTimeout(function() {
        alert.dismiss();
      }, 2000);
    },
    checkUni(callback) {
      this.loading = true;
      const type = this.usernameType === "user" ? "name" : this.usernameType;
      let params = {};
      params[type] = this.username;

      this.$http
        .get("/user/exists", {
          params: params
        })
        .then(r => {
          if (r.data.value) {
            this.pushStatus("login-password");
          } else {
            if (this.usernameType === "user") {
              this.usernameError = true;
            } else {
              this.pushStatus("register-presend");
            }
          }
          this.loading = false;
          this.usernameChangedSinceHead = false;
          if (typeof callback === "function") {
            callback();
          }
        })
        .catch(e => {
          if (
            e.response &&
            e.response.status >= 400 &&
            e.response.status < 500
          ) {
            this.usernameError = true;
          } else {
            // this.unknownError("checkUni: " + e.response.status);
          }
          this.loading = false;
        });
    },
    pushStatus(status) {
      if (status !== this.status) {
        this.statusList.push(status);
      }
      let focus = this.passwordShown
        ? "password"
        : this.verificationShown ? "verification" : "username";
      setTimeout(
        () =>
          typeof this.$refs[focus] !== "undefined" && this.$refs[focus].focus(),
        100
      );
    },
    popStatus() {
      this.undoed = true;
      this.statusList.pop();
    },
    login(e, done) {
      let auth;

      if (this.usernameType === "user" && isChinese(this.username)) {
        auth = "Basic " + Base64.encode(this.username + ":" + this.password);
        this.$http
          .get("/user", {
            headers: { Authorization: auth }
          })
          .then(r => {
            this.afterLogin();
            const self = this;
            setTimeout(function() {
              self.loading = false;
            }, 15000);
            // this.loading = false;
          })
          .catch(e => {
            console.log(e.response);
            if (e.response && e.response.status === 401) {
              this.passwordError = true;
            } else {
              this.unknownError("登录失败");
            }
            this.loading = false;
          });
      } else {
        if (this.usernameType === "user") {
          auth = "name " + this.username + ":" + md5(this.password);
        } else {
          auth =
            this.usernameType + " " + this.username + ":" + md5(this.password);
        }
        this.$http
          .get("/user", {
            headers: { "X-Authorization": auth }
          })
          .then(r => {
            this.afterLogin();
            const self = this;
            setTimeout(function() {
              self.loading = false;
            }, 15000);
          })
          .catch(e => {
            if (e.response && e.response.status === 401) {
              this.passwordError = true;
            } else {
              this.unknownError("登录失败");
            }
            this.loading = false;
          });
      }
    },
    send() {
      if (this.usernameChangedSinceHead) {
        this.checkUni(r => {
          this.send();
        });
        return;
      }

      if (this.username && this.usernameType && this.usernameType !== "user") {
        this.$http
          .post("user/verification/fetch/", {
            key: this.usernameType,
            value: this.username
          })
          .then(r => {
            if (!this.status.includes("verification")) {
              this.pushStatus(this.status.split("-")[0] + "-verification");
            }
            this.startVerificationTimer();
            this.loading = false;
          })
          .catch(err => {
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500
            ) {
              this.usernameError = true;
            } else {
            }
            this.unknownError("验证码发送失败");
            this.loading = false;
          });
      } else if (this.username && this.usernameType === "user") {
        this.unknownError("验证码需发送至手机或邮箱");
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    verify() {
      this.$http
        .post("/user/verification/exchange/", null, {
          headers: { "X-Verification": this.username + ":" + this.verification }
        })
        .then(r => {
          this.verificationExchanged = r.data.value;
          this.verification = "";
          this.pushStatus(this.status.split("-")[0] + "-setPassword");
          this.loading = false;
        })
        .catch(e => {
          if (
            e.response &&
            e.response.status >= 400 &&
            e.response.status < 500
          ) {
            this.verificationError = true;
          } else {
          }
          this.loading = false;
        });
    },
    loginByVcode() {
      let params = {};
      params[this.usernameType] = this.username;
      this.$http
        .post("/user/verify", null, {
          headers: {
            "X-Verification": this.username + ":" + this.verificationExchanged
          },
          params: params
        })
        .then(r => {
          this.afterLogin();
          const that = this;
          setTimeout(function() {
            that.loading = false;
          }, 15000);
          // this.loading = false;
        })
        .catch(e => {
          console.log("error");
          this.unknownError("验证码错误，登录失败");
          this.loading = false;
        });
    },
    update() {
      let body = {};
      if (this.password.length > 0) {
        if (this.password.length < 6) {
          this.passwordError = true;
        }
        body.value = md5(this.password);
      }
      let params = {};
      params[this.usernameType] = this.username;

      this.$http
        .put("/user/authentication/password", body, {
          headers: {
            "X-Verification": this.username + ":" + this.verificationExchanged
          },
          params: params
        })
        .then(r => {
          this.afterLogin();
          const that = this;
          setTimeout(function() {
            that.loading = false;
          }, 15000);
          // this.loading = false;
        })
        .catch(e => {
          if (
            e.response &&
            e.response.status >= 400 &&
            e.response.status < 500
          ) {
            // this.unknownError("authentication: " + e.response.data.message);
          } else {
            // this.unknownError("authentication: " + e.response.status);
          }
          this.unknownError("修改密码登录失败");
          this.loading = false;
        });
    },
    register() {
      if (this.password.length !== 0 && this.password.length < 6) {
        this.passwordError = true;
      } else {
        let body = {};
        body.password = md5(this.password);
        body[this.usernameType] = this.username;
        this.$http
          .post("/user/register", body, {
            headers: {
              "X-Verification": this.username + ":" + this.verificationExchanged
            }
          })
          .then(r => {
            this.afterLogin();
            const that = this;
            setTimeout(function() {
              that.loading = false;
            }, 15000);
            // this.loading = true;
          })
          .catch(e => {
            if (e.response && e.response.status === 409) {
              this.unknownError("该账号已被注册");
            } else if (e.response && e.response.status === 406) {
              this.unknownError("上传信息不合法");
            }
            this.loading = false;
          });
      }
    },
    startVerificationTimer() {
      this.verificationPercentage = 0;
      this.verificationProcessing = true;
      clearInterval(this.verificationInterval);
      let iim = 100;
      this.verificationInterval = setInterval(() => {
        this.verificationPercentage += 100 * iim / 60000;
        if (this.verificationPercentage >= 100) {
          this.cancelVerificationTimer();
        }
      }, iim);
    },
    cancelVerificationTimer() {
      this.verificationProcessing = false;
      this.verificationPercentage = 0;
      clearInterval(this.verificationInterval);
    },
    afterLogin() {
      console.log("login succeed!");
      this.$router.push("/main/map");
    }
  },
  watch: {},
  beforeCreate() {
    userService
      .getUser()
      .then(r => {
        this.$router.replace("/main/map");
      })
      .catch(e => {});
  },
  beforeMount() {
    if (this.statusList !== []) {
      this.statusList = ["username"];
    }
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.verificationInterval);
  }
};
</script>

<style lang="stylus" scoped>
.login-wrapper
  background-image: url('../assets/login-bg.jpg');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  margin 0
  width 100vw
  min-width 300px
  height 100vh
  .login-content
    width 500px
    position absolute
    right 100px
    top 20%
    padding 50px 0 50px
    border-radius 4px
    .field, .buttons
      width 80%
      min-width 250px
      margin-left 10%
      margin-top 30px
    .btn
      margin-top 20px
</style>
