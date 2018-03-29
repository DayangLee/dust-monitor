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
        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>用户名</div><div style='margin-left:50px'>${userInfo.authentication.name}</div></div>`" :sparse="true" @open="open('username')" @close="cancelVerificationTimer">
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
                  <q-input autofocus class="userInput" placeholder="由字母、数字或下划线组成，长度至少6位" v-model="newName" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="text" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-3 col-md-3 col-sm-3 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('username')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader dark-percentage :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('username')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary" :disable="disabled" @click="change">修改</q-btn>
                </div>
              </div>

            </div>
          </div>
        </q-collapsible>

        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>昵称</div><div style='margin-left:50px'>${userInfo.customize.nickname}</div></div>`" :sparse="true" @open="open('nickname')" @close="cancelVerificationTimer">
          <div>
            <div class="item row justify-around items-center">
              <div class="name">昵称</div>
              <div class="input">
                <q-input autofocus class="userInput" v-model="newNickName" type="text" @keyup.enter="change" />
              </div>
            </div>

            <div class="btn-item row">
              <div class="offset-lg-3 offset-md-3 offset-sm-3 offser-xs-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                <q-btn class="full-width" @click="newNickName = null">取消</q-btn>
              </div>
              <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                <q-btn class="full-width" color="primary" :disable="disabled" @click="change">修改</q-btn>
              </div>
            </div>
          </div>
        </q-collapsible>

        <q-collapsible group="group" :label="phoneString" :sparse="true" @open="open('phone')" @close="cancelVerificationTimer">
          <div>
              <div class="item row justify-around items-center">
                <div class="name">手机</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="newPhone" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="text" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-3 col-md-3 col-sm-3 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('phone')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader dark-percentage  :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('phone')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary" :disable="disabled" @click="change">{{ this.userInfo.verified.phone ? '修改' : '完成'}}</q-btn>
                </div>
              </div>
          </div>
        </q-collapsible>
        
        <q-collapsible group="group" :label="emailString" :sparse="true" @open="open('email')" @close="cancelVerificationTimer">
          <div>
              <div class="item row justify-around items-center">
                <div class="name">邮箱</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="newEmail" type="text" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="text" />
                </div>
              </div>
              
              <div class="btn-item row">
                <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-3 col-md-3 col-sm-3 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('email')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader dark-percentage  :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('email')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary" :disable="disabled" @click="change">{{ this.userInfo.verified.email ? '修改' : '完成'}}</q-btn>
                </div>
              </div>
          </div>
        </q-collapsible>

        <q-collapsible group="group" :label="`<div class='row justify-start'><div style='width:50px;'>密码</div><div style='margin-left:50px'>******</div></div>`" :sparse="true" @open="open('password')" @close="cancelVerificationTimer">
          <div>
            <div v-if="verifiedList.length === 0" class="row">
              <div class="offset-lg-2 offset-md-2 offset-sm-2 row" style="margin-bottom:20px;">
                <q-icon name="warning" color="warning" /><div class="text-warning">更改密码请先验证手机或邮箱</div>
              </div>
            </div>

            <div v-else>
              <div class="item row justify-around items-center">
                <div class="name">新密码</div>
                <div class="input">
                  <q-input autofocus class="userInput" placeholder="由字母、数字组成，长度至少6位"  v-model="newPassword" type="password" />
                </div>
              </div>

            <div class="item row justify-around items-center">
                <div class="name">确认密码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="newPasswordConfig" type="password" />
                </div>
              </div>

              <div class="item row justify-around items-center">
                <div class="name">验证码</div>
                <div class="input">
                  <q-input autofocus class="userInput" v-model="vcode" type="text" />
                </div>
              </div>
              

              <div class="btn-item row">
                <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-3 col-md-3 col-sm-3 col-xs-12 btn">
                  <q-btn class="full-width" v-show="hasNocode" @click="sendVcode('password')">发送验证码</q-btn>
                  <q-btn class="full-width" v-show="!hasNocode" loader dark-percentage  :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode('password')">
                    再次发送验证码
                    <span v-if="verificationProcessing" slot="loading">
                      <q-spinner-facebook class="on-left" />
                        再次发送验证码
                    </span>
                  </q-btn>
                </div>
                <div class="offset-lg-1 offset-md-1 offset-sm-1 col-lg-2 col-md-2 col-sm-2 col-xs-12 btn">
                  <q-btn class="full-width" color="primary" :disable="disabled" @click="change">修改</q-btn>
                </div>
              </div>
            </div>
            
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
import { Dialog, Toast, Alert } from "quasar";
import "quasar-extras/animate/bounceInRight.css";
import "quasar-extras/animate/bounceOutRight.css";
import md5 from "js-md5";
export default {
  data: () => ({
    status: "username",
    username: null,
    userInfo: {
      id: null,
      authentication: {
        name: "",
        phone: "",
        email: ""
      },
      verified: {
        phone: null,
        email: null
      },
      customize: {
        nickname: ""
      }
    },
    verified: [],
    hasNocode: true,
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
      } else if (this.status === "username") {
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
          this.newPassword.length >= 6 &&
          this.newPasswordConfig.length >= 6 &&
          this.vcode.length === 6
        ) {
          return false;
        } else {
          return true;
        }
      }
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
      this.status = e;
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
    successAlert(e) {
      const alert = Alert.create({
        html: e,
        color: "positive",
        icon: "done",
        position: "top-center",
        duration: 3000,
        enter: "bounceInDown",
        leave: "bounceOutUp"
      });
      setTimeout(function() {
        if (alert) {
          alert.dismiss();
          return;
        }
      }, 3000);
    },
    errorAlert(e) {
      const alert = Alert.create({
        html: e,
        color: "negative",
        icon: "error_outline",
        position: "top-center",
        duration: 3000,
        enter: "bounceInDown",
        leave: "bounceOutUp"
      });
      setTimeout(function() {
        if (alert) {
          alert.dismiss();
          return;
        }
      }, 3000);
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
        } else if (e === "username" || e === "password") {
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
      if (key === "phone") {
        if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
          userService
            .sendVerification(key, value)
            .then(r => {
              this.hasNocode = false;
              this.startVerificationTimer();
              this.successAlert("验证码已发送至" + text + value);
            })
            .catch(e => {
              this.errorAlert("验证码发送失败");
            });
        } else {
          this.errorAlert("请输入正确的手机号");
        }
      } else {
        if (value.includes("@")) {
          userService
            .sendVerification(key, value)
            .then(r => {
              this.hasNocode = false;
              this.startVerificationTimer();
              this.successAlert("验证码已发送至" + text + value);
            })
            .catch(e => {
              this.errorAlert("验证码发送失败");
            });
        } else {
          this.errorAlert("请输入正确的邮箱");
        }
      }
    },
    change() {
      console.log(this.status);
      if (this.status === "nickname" && this.newNickName) {
        userService
          .changeCustomize("nickname", this.newNickName)
          .then(r => {
            this.userInfo.customize.nickname = this.newNickName.trim();
            this.successAlert("昵称修改成功");
          })
          .catch(e => {
            this.errorAlert("昵称修改成功");
          });
      } else if (this.status === "username" && this.newName && this.vcode) {
        const username = this.userInfo.verified[this.vcodeSendTo];

        userService
          .changeAuthentication("name", this.newName, username, this.vcode)
          .then(r => {
            this.successAlert("用户名修改成功");
            this.userInfo.authentication.name = this.newName.trim();
            this.cancelVerificationTimer();
          })
          .catch(e => {
            if (e.response && e.response.status === 403) {
              this.errorAlert("验证码错误");
            } else if (e.response && e.response.status === 409) {
              this.errorAlert("该用户名已被注册");
            } else {
              this.errorAlert("用户名修改失败");
            }
          });
      } else if (this.status === "phone" && this.newPhone && this.vcode) {
        if (this.newPhone === this.userInfo.authentication.phone) {
          // 验证手机号
          userService
            .verified(this.newPhone, this.vcode)
            .then(r => {
              this.successAlert("手机验证成功");
              this.userInfo.verified.phone = this.newPhone;
              this.cancelVerificationTimer();
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.errorAlert("验证码错误");
              } else {
                this.errorAlert("手机验证失败");
              }
            });
        } else if (this.newPhone !== this.userInfo.authentication.phone) {
          let username;

          if (this.userInfo.verified.phone) {
            // 修改验证过的手机号
            username = this.userInfo.verified[this.vcodeSendTo];
          } else {
            // 添加手机号
            if (this.verifiedList.length === 0) {
              username = this.newPhone;
            } else {
              username = this.userInfo.authentication[this.vcodeSendTo];
            }
          }

          userService
            .exchangeVerification(username, this.vcode)
            .then(r => {
              const codeExchanged = r.data.value;
              userService
                .changeAuthentication(
                  "phone",
                  this.newPhone,
                  username,
                  codeExchanged
                )
                .then(r => {
                  this.successAlert("手机号修改成功");
                  this.userInfo.authentication.phone = this.newPhone;
                  this.cancelVerificationTimer();
                })
                .catch(e => {
                  if (e.response && e.response.status === 409) {
                    this.errorAlert("该手机号已被注册");
                  } else if (e.response && e.response.status === 403) {
                    this.errorAlert("验证码错误");
                  } else {
                    this.errorAlert("手机号修改失败");
                  }
                });
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.errorAlert("验证码错误");
              } else {
                this.errorAlert("出错了");
              }
            });
        }
      } else if (this.status === "email" && this.newEmail && this.vcode) {
        if (this.newEmail === this.userInfo.authentication.email) {
          // 验证邮箱
          userService
            .verified(this.newEmail, this.vcode)
            .then(r => {
              this.successAlert("邮箱验证成功");
              this.userInfo.verified.email = this.newEmail;
              this.cancelVerificationTimer();
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.errorAlert("验证码错误");
              } else {
                this.errorAlert("邮箱验证失败");
              }
            });
        } else if (this.newEmail !== this.userInfo.authentication.email) {
          let username;

          if (this.userInfo.verified.email) {
            // 修改验证过的邮箱
            username = this.userInfo.authentication[this.vcodeSendTo];
          } else {
            // 添加邮箱
            if (this.verifiedList.length === 0) {
              username = this.newEmail;
            } else {
              username = this.userInfo.authentication[this.vcodeSendTo];
            }
          }

          userService
            .exchangeVerification(username, this.vcode)
            .then(r => {
              const codeExchanged = r.data.value;
              userService
                .changeAuthentication(
                  "email",
                  this.newEmail,
                  username,
                  codeExchanged
                )
                .then(r => {
                  this.successAlert("邮箱修改成功");
                  this.userInfo.authentication.email = this.newEmail;
                  this.cancelVerificationTimer();
                })
                .catch(e => {
                  if (e.response && e.response.status === 409) {
                    this.errorAlert("该邮箱已被注册");
                  } else if (e.response && e.response.status === 403) {
                    this.errorAlert("验证码错误");
                  } else {
                    this.errorAlert("邮箱修改失败");
                  }
                });
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.errorAlert("验证码错误");
              } else {
                this.errorAlert("出错了");
              }
            });
        }
      } else if (this.status === "password") {
        if (
          this.newPassword === this.newPasswordConfig &&
          this.newPassword.length >= 6
        ) {
          userService
            .changeAuthentication(
              "password",
              md5(this.newPassword),
              this.userInfo.verified[this.vcodeSendTo],
              this.vcode
            )
            .then(r => {
              this.successAlert("密码修改成功");
              this.cancelVerificationTimer();
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.errorAlert("验证码错误");
              } else {
                this.errorAlert("密码修改失败");
              }
            });
        } else if (this.newPassword.length < 6) {
          this.errorAlert("密码至少为6位");
        } else if (this.newPassword !== this.newPasswordConfig) {
          this.errorAlert("两次输入的密码不相同");
        }
      }
    },
    startVerificationTimer() {
      this.hasNocode = false
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
      this.hasNocode = true
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
