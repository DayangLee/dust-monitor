<template>
  <div class="layout-padding map">
    <div class="title">
        <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
        <q-btn flat>个人中心</q-btn>
    </div>

    <q-list separator>
        <q-list-header>
          <h5>用户信息</h5>
        </q-list-header>
        <q-item-separator />
        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>用户名</div><div style='margin-left:50px'>${userInfo.authentication.name}</div></div>`" :sparse="true" @open="open('username')" @close="close('username')">
          <div>
            <div v-if="verifiedList.length === 0" class="row">
              <div class="offset-lg-2 offset-md-2 offset-sm-2 row" style="margin-bottom:20px;">
                <q-icon name="warning" color="warning" /><div class="text-warning">更改用户名请先验证手机或邮箱</div>
              </div>
            </div>
            <div v-else>              
              <div class="item row justify-around items-center">
                <div class="name">用户名</div>
                <div class="input">
                  <q-input autofocus class="userInput" placeholder="用户名由字母、数字或下划线组成，长度至少为6位" v-model="newName" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="number" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-3 offset-md-3 offset-sm-3 offser-xs-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('username')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('username')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary">修改</q-btn>
                </div>
              </div>

            </div>
          </div>
        </q-collapsible>

        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>昵称</div><div style='margin-left:50px'>${userInfo.customize.nickname}</div></div>`" :sparse="true" @open="open('nickname')" @close="close('nickname')">
          <div>
            <div class="item row justify-around items-center">
              <div class="name">昵称</div>
              <div class="input">
                <q-input autofocus class="userInput" v-model="newNickName" type="text" />
              </div>
            </div>

            <div class="btn-item row">
              <div class="offset-lg-3 offset-md-3 offset-sm-3 offser-xs-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                <q-btn class="full-width" @click="clear('nickname')">取消</q-btn>
              </div>
              <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                <q-btn class="full-width" color="primary">修改</q-btn>
              </div>
            </div>
          </div>
        </q-collapsible>

        <q-collapsible group="group" :label="phoneString" :sparse="true" @open="open('phone')" @close="close('phone')">
          <div>
            <div v-if="verifiedList.length === 0">
              <div class="item row justify-around items-center">
                <div class="name">手机</div>
                <div class="input">
                  <q-input autofocus class="userInput" placeholder="用户名由字母、数字或下划线组成，长度至少为6位" v-model="newName" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="number" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-3 offset-md-3 offset-sm-3 offser-xs-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('username')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('username')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary">完成</q-btn>
                </div>
              </div>
            </div>

            <div v-else>       
              <div class="item row justify-around items-center">
                <div class="name">手机</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="newName" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="number" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-3 offset-md-3 offset-sm-3 offser-xs-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('username')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('username')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary" v-if="this.userInfo.verified.phone">修改</q-btn>
                  <q-btn class="full-width" color="primary" v-else>完成</q-btn>
                </div>
              </div>

            </div>
          </div>
        </q-collapsible>
        
        <q-collapsible group="group" :label="emailString" :sparse="true" @open="open('email')" @close="close('email')">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </q-collapsible>
        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>密码</div><div style='margin-left:50px'>******</div></div>`" :sparse="true" @open="open('password')" @close="close('password')">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </q-collapsible>
      </q-list>


      <q-modal ref="minimizedModal" minimized :content-css="{padding: '50px'}">
        <h5>请选择验证码发送地址</h5>
        <div class="row justify-around">
          <q-btn big color="primary" @click="chooseVcodeToWhere('phone')">手机</q-btn>
          <q-btn big color="primary" @click="chooseVcodeToWhere('email')">邮箱</q-btn>
        </div>
      </q-modal>
  </div>
</template>

<script>
import { userService } from "api/index";
import { Dialog, Toast } from "quasar";
export default {
  data: () => ({
    status: "username",
    username: null,
    userInfo: {
      id: null,
      authentication: {
        name: null,
        phone: null,
        email: null
      },
      verified: {
        phone: null,
        email: null
      },
      customize: {
        nickname: null
      }
    },
    verified: [],
    hasNocode: true,
    hasNocode1: true,
    hasNocode2: true,
    verificationPercentage: 0,
    verificationProcessing: false,
    verificationInterval: null,
    vcode: null,
    vcodeSendTo: null,
    newName: null,
    newNickName: null,
    newPhone: null,
    newEmail: null,
    newPassword: null,
    newPasswordConfig: null
  }),
  computed: {
    phoneString: function() {
      if (
        this.userInfo.authentication.phone &&
        this.userInfo.verified.phone &&
        this.userInfo.authentication.phone === this.userInfo.verified.phone
      ) {
        return `<div class='row justify-start'><div style='width:50px;'>手机</div><div style='margin-left:50px'>${
          this.userInfo.authentication.phone
        } <span style='color:green'>已验证</span></div></div>`;
      } else {
        return `<div class='row justify-start'><div style='width:50px;'>手机</div><div style='margin-left:50px'>${
          this.userInfo.authentication.phone
        } <span style='color:red'>未验证</span></div></div>`;
      }
    },
    emailString: function() {
      if (
        this.userInfo.authentication.email &&
        this.userInfo.verified.email &&
        this.userInfo.authentication.email === this.userInfo.verified.email
      ) {
        return `<div class='row justify-start'><div style='width:50px;'>邮箱</div><div style='margin-left:50px'>${
          this.userInfo.authentication.email
        } <span style='color:green'>已验证</span></div></div>`;
      } else {
        return `<div class='row justify-start'><div style='width:50px;'>邮箱</div><div style='margin-left:50px'>${
          this.userInfo.authentication.email
        } <span style='color:red'>未验证</span></div></div>`;
      }
    },
    disabled: function() {
      if (this.status === "nickname") {
        if (this.newNickName) {
          return false;
        } else {
          return true;
        }
      } else if (this.status === "name") {
        if (
          this.newName &&
          this.vcode &&
          this.newName.length >= 6 &&
          this.vcode.length === 6
        ) {
          return false;
        } else {
          return true;
        }
      } else if (this.status === "phone") {
        if (
          this.newPhone &&
          this.vcode &&
          this.newPhone.toString().length === 11 &&
          this.vcode.length === 6
        ) {
          return false;
        } else {
          return true;
        }
      } else if (this.status === "email") {
        if (
          this.newEmail &&
          this.vcode &&
          this.newEmail.includes("@") &&
          this.vcode.length === 6
        ) {
          return false;
        } else {
          return true;
        }
      } else if (this.status === "password") {
        if (
          this.newPassword &&
          this.newPasswordConfig &&
          this.vcode &&
          this.vcode.length === 6
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    vcodebtnShow: function() {
      let a;
      if (this.status === "nickname") {
        a = false;
      } else if (this.status === "name" || this.status === "password") {
        a = this.verifiedList.length === 0 ? false : true;
      } else if (this.status === "phone" || this.status === "email") {
        a = true;
      }
      return a;
    },
    changebtnShow: function() {
      let a;
      if (this.status === "nickname") {
        a = true;
      } else if (this.status === "name" || this.status === "password") {
        a = this.verifiedList.length === 0 ? false : true;
      } else if (this.status === "phone") {
        a = this.userInfo.verified.indexOf("phone") === -1 ? false : true;
      } else if (this.status === "email") {
        a = this.userInfo.verified.indexOf("email") === -1 ? false : true;
      }
      console.log(a);
      return a;
    },
    verifiedList: function() {
      let list = [];
      if (
        this.userInfo.authentication.phone &&
        this.userInfo.verified.phone &&
        this.userInfo.authentication.phone === this.userInfo.verified.phone
      ) {
        list.push({
          phone: this.userInfo.verified.phone
        });
      }
      if (
        this.userInfo.authentication.email &&
        this.userInfo.verified.email &&
        this.userInfo.authentication.email === this.userInfo.verified.email
      ) {
        list.push({
          email: this.userInfo.verified.email
        });
      }
      return list;
    },
    verifiedObj: function() {
      let obj = {
        phone: null,
        email: null
      };
      if (
        this.userInfo.authentication.phone &&
        this.userInfo.verified.phone &&
        this.userInfo.authentication.phone === this.userInfo.verified.phone
      ) {
        obj.phone = this.userInfo.verified.phone;
      }
      if (
        this.userInfo.authentication.email &&
        this.userInfo.verified.email &&
        this.userInfo.authentication.email === this.userInfo.verified.email
      ) {
        obj.email = this.userInfo.verified.email;
      }
      return obj;
    }
  },
  methods: {
    open(e) {
      console.log(e);
      this.status === "username";
    },
    close(e) {
      console.log(e);
      this.verificationPercentage = 0;
      this.verificationProcessing = false;
      this.verificationInterval = null;
    },
    pop(title) {
      const dialog = Dialog.create({
        title: title,
        buttons: [
          {
            label: "确定",
            handler() {
              clearTimeout(timeout);
            }
          }
        ]
      });
      const timeout = setTimeout(() => {
        clearInterval(timeout);
        dialog.close();
      }, 3000);
    },
    clear(e) {
      if (e === "nickname") {
        this.newNickName = null;
      }
    },
    sendVcode(e) {
      let key = "phone";
      let value;
      let text = "手机";
      this.vcodeSendTo = "phone";
      if (this.verifiedList.length === 0) {
        // 手机邮箱都没验证过
        if (e === "phone" && this.newPhone) {
          if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
            value = this.newPhone;
            this.vcodeSendTo = "newPhone";
            this.send(key, value, text);
          } else {
            this.pop("请输入正确的手机号码");
          }
        } else if (e === "email" && this.newEmail) {
          key = "email";
          value = this.newEmail;
          text = "邮箱";
          this.vcodeSendTo = "newEmail";
          if (value.includes("@")) {
            this.send(key, value, text);
          } else {
            this.pop("请输入正确的邮箱地址");
          }
        }
      } else if (this.verifiedList.length === 1) {
        // 手机邮箱有一个验证过
        if (e === "phone") {
          if (
            this.userInfo.authentication.phone &&
            this.newPhone === this.userInfo.authentication.phone
          ) {
            // 输入框的手机和添加的手机相同，则为验证手机操作
            key = "phone";
            value = this.userInfo.authentication.phone;
            text = "手机";
            this.vcodeSendTo = "phone";
            this.send(key, value, text);
          } else {
            // 若输入的手机与已添加的手机不同，或尚无已添加手机，则为修改手机操作
            if (
              this.userInfo.verified.phone &&
              this.userInfo.authentication.phone ===
                this.userInfo.verified.phone
            ) {
              // 手机已验证
              key = "phone";
              value = this.verifiedObj.phone;
              text = "手机";
              this.vcodeSendTo = "phone";
              this.send(key, value, text);
            } else {
              // 手机未验证
              key = "email";
              value = this.verifiedObj.email;
              text = "邮箱";
              this.vcodeSendTo = "email";
              this.send(key, value, text);
            }
          }
        } else if (e === "email") {
          if (
            this.userInfo.authentication.email &&
            this.newEmail === this.userInfo.authentication.email
          ) {
            // 输入框的邮箱和添加的邮箱相同，则为验证邮箱操作
            key = "email";
            value = this.userInfo.authentication.email;
            text = "邮箱";
            this.vcodeSendTo = "email";
            this.send(key, value, text);
          } else {
            // 若输入的邮箱与已添加的邮箱不同，或尚无已添加邮箱，则为修改邮箱操作
            if (
              this.userInfo.verified.email &&
              this.userInfo.authentication.email ===
                this.userInfo.verified.email
            ) {
              // 邮箱已验证
              key = "email";
              value = this.verifiedObj.email;
              text = "邮箱";
              this.vcodeSendTo = "email";
              this.send(key, value, text);
            } else {
              // 邮箱未验证
              key = "phone";
              value = this.verifiedObj.phone;
              text = "手机";
              this.vcodeSendTo = "phone";
              this.send(key, value, text);
            }
          }
        } else if (e === "username") {
          key = this.verifiedObj.phone ? "phone" : "email";
          value = this.verifiedObj[key];
          text = key === "phone" ? "手机" : "邮箱";
          this.vcodeSendTo = key;
          this.send(key, value, text);
        }
      } else {
        // 手机和邮箱都验证过
        this.$refs.minimizedModal.open();
      }
    },
    chooseVcodeToWhere(e) {
      if (e === "phone") {
        let key = "phone";
        let value = this.userInfo.verified.phone;
        let text = "手机";
        this.vcodeSendTo = "phone";
        this.send(key, value, text);
        this.$refs.minimizedModal.close();
      } else {
        let key = "email";
        let value = this.userInfo.verified.email;
        let text = "邮箱";
        this.vcodeSendTo = "email";
        this.send(key, value, text);
        this.$refs.minimizedModal.close();
      }
    },
    send(key, value, text, type) {
      console.log(key);
      console.log(value);
      console.log(text);
      // Toast.create.positive("更改室外数据源成功");

      if (key === "phone") {
        if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
          userService
            .sendVerification(key, value)
            .then(r => {
              this.hasNocode = false;
              this.startVerificationTimer();
              Toast.create.positive("验证码已发送至" + text + value);
            })
            .catch(e => {
              Toast.create.negative("验证码发送失败");
            });
        } else {
          Toast.create.negative("请输入正确的手机号");
        }
      } else {
        if (value.includes("@")) {
          userService
            .sendVerification(key, value)
            .then(r => {
              this.hasNocode = false;
              this.startVerificationTimer();
              Toast.create.positive("验证码已发送至" + text + value);
            })
            .catch(e => {
              Toast.create.negative("验证码发送失败");
            });
        } else {
          Toast.create.negative("请输入正确的邮箱");
        }
      }
    },
    startVerificationTimer() {
      let iim = 100;
      this.verificationPercentage = 0;
      this.verificationProcessing = true;
      clearInterval(this.verificationInterval);
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
    }
  },
  mounted() {
    userService
      .getUser()
      .then(r => {
        if (r.data) {
          console.log(r.data);
          this.userInfo.id = r.data.id;
          this.userInfo.authentication.name =
            r.data.authentication.name || null;
          this.userInfo.authentication.phone =
            r.data.authentication.phone || null;
          this.userInfo.authentication.email =
            r.data.authentication.email || null;
          this.userInfo.verified.phone = r.data.verified.phone || null;
          this.userInfo.verified.email = r.data.verified.email || null;

          this.userInfo.customize.nickname = r.data.customize.nickname;
          if (r.data.verified.phone) {
            this.verified.push("phone");
          }
          if (r.data.verified.email) {
            this.verified.push("email");
          }

          this.newPhone = this.userInfo.authentication.phone;
          this.newEmail = this.userInfo.authentication.email;
        }
      })
      .catch(e => {
        if (e.response && e.response.status === 401) {
          this.$router.push("/login");
        }
      });
  },
  beforeDestroy() {
    clearInterval(this.verificationInterval);
  }
};
</script>

<style lang="stylus" scoped>
.title
  margin-bottom 20px
.row
  margin-top 10px
.btn-item
  margin-bottom 20px
  .btn
    margin-top 10px
.name
  width 18%
  text-align right
  font-size 16px
.input
  width 70%
  .q-input
    width 60%
    min-width 200px
</style>
