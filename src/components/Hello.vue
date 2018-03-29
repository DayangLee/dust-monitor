<template>
<!-- <q-transition appear enter="fadeIn" leave="fadeOut" duration="250"> -->
  <div class="user-content">
    <div class="user-detail no-wrap">
      <div class="main" v-if="status === 'main'">
        <div class="head">
          <div class="x-center y-end" style="height:27vw">
            <img :src="userInfo.customize.avatar" />
          </div>
          <div class="x-center y-center name" style="height:10vw">{{userInfo.customize.nickname}}</div>  
        </div>
        <div class="main-list">
          <div class="list">
            <div class="item x-between y-center borderB" @click="changeStatus('name')"><div class="left">用户名</div><div class="right">{{userInfo.authentication.name || '去添加'}}</div></div>
            <div class="item x-between y-center borderB" @click="changeStatus('nickname')"><div class="left">昵称</div><div class="right">{{userInfo.customize.nickname || '去添加'}}</div></div>
            <div class="item x-between y-center borderB" @click="changeStatus('phone')"><div class="left">手机</div><div class="right">{{userInfo.authentication.phone || '去添加'}}<span v-if="userInfo.authentication.phone && userInfo.authentication.phone === userInfo.verified.phone" class="verified" style="margin-left: 2vw;">已验证</span><span v-if="userInfo.authentication.phone && userInfo.authentication.phone !== userInfo.verified.phone" class="unverified" style="margin-left: 2vw;">未验证</span></div></div>
            <div class="item x-between y-center borderB" @click="changeStatus('email')"><div class="left">邮箱</div><div class="right">{{userInfo.authentication.email || '去添加'}}<span v-if="userInfo.authentication.email && userInfo.authentication.email === userInfo.verified.email" class="verified" style="margin-left: 2vw;">已验证</span><span v-if="userInfo.authentication.email && userInfo.authentication.email !== userInfo.verified.email" class="unverified" style="margin-left: 2vw;">未验证</span></div></div>
            <div class="item x-between y-center" @click="changeStatus('password')"><div class="left">密码</div><div class="right">去修改</div></div>
          </div>

          <div class="blank"></div>
          <div class="list">  
            <div class="item x-between y-center" @click="goMall"><div class="left">官方商城</div><div class="right">
              <!-- <img src="../assets/images/userCenter/arrow.png" /> -->
              </div></div>
          </div>
          <div class="blank"></div>
          <div class="list">
            <div class="item x-between y-center" @click="logout"><div class="left" style="color:#f62254">退出登录</div></div>
          </div>
        </div>
      
        <div class="bottomBack">
          <div class="back_btn x-center y-center" @click="goback">
          返回上一页
          </div>
        </div>
      </div>

      <div class="detail" v-else>
        <div v-if="status === 'nickname'"> <!-- 昵称 -->
          <!-- <div class="blank1"></div>      -->
          <div class="list">
            <div class="item x-between y-center"><div class="left">昵称</div><q-input autofocus class="userInput" v-model="newNickName" type="text" /></div>
          </div>
        </div>
        <div v-else> <!-- 除昵称之外所有修改项 -->
          <!-- <div class="blank" v-show="status !=='name'"></div> -->
          <div class="list" v-if="verifiedList.length === 0"> <!-- 无任何验证信息 -->
            <div class="tip x-center y-center" v-show="status === 'name'">修改用户名请先验证手机或邮箱</div>
          
            <!-- <div class="item x-between y-center borderB" v-show="status === 'name'">
              <div class="left">用户名</div>
              <q-input autofocus class="userInput" v-model="newName" type="text" />
            </div> -->

            <div class="item x-between y-center borderB" v-show="status === 'phone'">
              <div class="left">手机号</div>
              <q-input autofocus class="userInput" v-model="newPhone" type="number" />
            </div>

            <div class="item x-between y-center borderB" v-show="status === 'email'">
              <div class="left">邮箱</div>
              <q-input autofocus class="userInput" v-model="newEmail" type="text" />
            </div>

            <div class="item x-between y-center" v-show="status === 'phone' || status === 'email'">
              <div class="left">验证码</div>
              <q-input class="userInput" v-model="vcode" type="text" />
            </div>

            <div class="tip x-center y-center" v-show="status === 'password'">修改密码请先验证手机或邮箱</div>
          </div>

          <div class="list" v-else> <!-- 存在验证过的手机或邮箱 -->  
            <div class="tip x-center y-center" v-show="status === 'name'">用户名由字母、数字或下划线组成，长度至少为6位</div>
            <div class="item x-between y-center borderB" v-show="status === 'name'">
              <div class="left">用户名</div>
              <q-input autofocus class="userInput" v-model="newName" type="text" />
            </div>
            <div class="item x-between y-center borderB" v-show="status === 'phone'">
              <div class="left">手机号</div>
              <q-input autofocus class="userInput" v-model="newPhone" type="number" />
            </div>
            <div class="item x-between y-center borderB" v-show="status === 'email'">
              <div class="left">邮箱</div>
              <q-input autofocus class="userInput" v-model="newEmail" type="text" />
            </div>
            <div class="tip x-center y-center" v-show="status === 'password'">密码长度至少为6位</div>
            <div class="item x-between y-center borderB" v-show="status === 'password'">
              <div class="left">密码</div>
              <q-input autofocus class="userInput" v-model="newPassword" type="password" />
            </div>
            <div class="item x-between y-center borderB" v-show="status === 'password'">
              <div class="left">确认密码</div>
              <q-input class="userInput" v-model="newPasswordConfig" type="password" />
            </div>
            <div class="item x-between y-center">
              <div class="left">验证码</div>
              <q-input class="userInput" v-model="vcode" type="text" />
            </div>
          </div>
        </div>

        <div class="blank" v-show="verifiedList.length === 0 || status === 'nickname'"></div>
        <div class="blank" v-show="verifiedList.length === 0 || status === 'nickname'"></div>
        <div class="tip x-center y-center" v-show="verifiedList.length !== 0 && this.status !== 'nickname'">为了您的账户安全，请使用已绑定的手机或邮箱接收验证码</div>

        <div class="send y-center" :class="[verifiedList.length === 1 ?'x-center':'x-between']" v-if="vcodebtnShow">
          <q-btn class="full-width userBtn" v-show="(verifiedList.length === 1 || verifiedList.length === 0) && hasNocode" @click="sendVcode">发送验证码</q-btn>
          <q-btn class="userBtn" v-show="(verifiedList.length === 1 || verifiedList.length ===0) && !hasNocode" loader :percentage="verificationPercentage" v-model="verificationProcessing" @click="sendVcode">
          再次发送验证码
            <span v-if="verificationProcessing" slot="loading">
              <q-spinner-facebook class="on-left" />
              再次发送验证码
            </span>
          </q-btn>

          <q-btn class="userBtn small_userBtn" v-show="verifiedList.length === 2 && hasNocode1" @click="sendVcode('phone')">手机接收</q-btn>
          <q-btn class="userBtn small_userBtn" v-show="verifiedList.length === 2 && !hasNocode1" loader :percentage="verificationPercentage1" v-model="verificationProcessing1" @click="sendVcode('phone')">
          手机接收
            <span v-if="verificationProcessing1" slot="loading">
              <q-spinner-facebook class="on-left" />
              再次发送
            </span>
          </q-btn>

          <q-btn class="userBtn small_userBtn" v-show="verifiedList.length === 2 && hasNocode2" @click="sendVcode('email')">邮箱接收</q-btn>
          <q-btn class="userBtn small_userBtn" v-show="verifiedList.length === 2 && !hasNocode2" loader :percentage="verificationPercentage2" v-model="verificationProcessing2" @click="sendVcode('email')">
          邮箱接收
            <span v-if="verificationProcessing2" slot="loading">
              <q-spinner-facebook class="on-left" />
              再次发送
            </span>
          </q-btn>
        </div>

        <div class="change x-center y-center" v-show="changebtnShow">
          <q-btn class="userBtn" :disable="disabled" @click="change">修改</q-btn>
        </div>
        <div class="change x-center y-center" v-show="(this.status === 'phone' && !this.userInfo.verified.phone) || (this.status === 'email' && !this.userInfo.verified.email)">
          <q-btn class="userBtn" :disable="disabled" @click="change">完成</q-btn>
        </div>
        <div class="cancel x-center y-center" @click="status = 'main'">
          <q-btn class="userBtn" @click="changeStatus('main')">取消</q-btn>
        </div>
      </div>
    </div> 
  </div>
<!-- </q-transition> -->
</template>

<script>
import { Dialog, LocalStorage } from "quasar";
import { userService } from "api/index";
import md5 from "js-md5";
export default {
  computed: {
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
        a = this.verified.indexOf("phone") === -1 ? false : true;
      } else if (this.status === "email") {
        a = this.verified.indexOf("email") === -1 ? false : true;
      }
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
  data: () => ({
    status: "main",
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
        // avatar: require("assets/images/logo.jpg"),
        nickname: null
      }
    },
    verified: [],
    hasNocode: true,
    hasNocode1: true,
    hasNocode2: true,
    verificationPercentage: 0,
    verificationProcessing: false,
    verificationPercentage1: 0,
    verificationProcessing1: false,
    verificationPercentage2: 0,
    verificationProcessing2: false,
    verificationInterval: null,
    verificationInterval1: null,
    verificationInterval2: null,
    vcode: null,
    vcodeSendTo: null,
    newName: null,
    newNickName: null,
    newPhone: null,
    newEmail: null,
    newPassword: null,
    newPasswordConfig: null
  }),
  methods: {
    changeStatus(e) {
      this.status = e;
      console.log(e);
      console.log(this.vcodeSendTo);
      this.hasNocode = true;
      this.hasNocode1 = true;
      this.hasNocode2 = true;
      // this.vcodeSendTo = null;
      this.vcode = null;
      this.newName = null;
      this.newNickName = null;
      this.newPassword = null;
      this.newPasswordConfig = null;
      this.newPhone = this.userInfo.authentication.phone;
      this.newEmail = this.userInfo.authentication.email;
      this.cancelVerificationTimer();
      this.cancelVerificationTimer(1);
      this.cancelVerificationTimer(2);
    },
    sendVcode(e) {
      let key = "phone";
      let value;
      let text = "手机";
      this.vcodeSendTo = "phone";

      if (e === "phone") {
        // 手机邮箱都验证过，用户选择发送至手机
        value = this.userInfo.verified.phone;
        this.send(key, value, text, "phone");
      } else if (e === "email") {
        // 手机邮箱都验证过，用户选择发送至邮箱
        key = "email";
        value = this.userInfo.verified.email;
        text = "邮箱";
        this.vcodeSendTo = "email";
        this.send(key, value, text, "email");
      } else if (this.verifiedList.length === 0) {
        // 手机邮箱都没验证过
        console.log("newPhone");
        if (this.status === "phone") {
          value = this.newPhone;
          this.vcodeSendTo = "newPhone";
          if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
            this.send(key, value, text);
          } else {
            this.pop("请输入正确的手机号码");
          }
        } else if (this.status === "email") {
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
      } else {
        // 手机邮箱有一个验证过
        if (this.status === "phone") {
          // 手机页面
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
        } else if (this.status === "email") {
          // 邮箱页面
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
        } else {
          let key = this.verifiedObj.phone ? "phone" : "email";
          value = this.verifiedObj[key];
          text = key === "phone" ? "手机" : "邮箱";
          this.vcodeSendTo = key;
          this.send(key, value, text);
        }
      }
    },
    send(key, value, text, type) {
      if (key === "phone") {
        if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
          userService
            .sendVerification(key, value)
            .then(r => {
              if (type && type === "phone") {
                this.hasNocode1 = false;
                this.startVerificationTimer(1);
              } else if (type && type === "email") {
                this.hasNocode2 = false;
                this.startVerificationTimer(2);
              } else {
                this.hasNocode = false;
                this.startVerificationTimer();
              }
              this.pop("验证码已发送至" + text + value);
            })
            .catch(e => {
              this.pop("验证码发送失败");
            });
        } else {
          this.pop("请输入正确的手机号");
        }
      } else {
        if (value.includes("@")) {
          userService
            .sendVerification(key, value)
            .then(r => {
              if (type && type === "phone") {
                this.hasNocode1 = false;
                this.startVerificationTimer(1);
              } else if (type && type === "email") {
                this.hasNocode2 = false;
                this.startVerificationTimer(2);
              } else {
                this.hasNocode = false;
                this.startVerificationTimer();
              }
              this.pop("验证码已发送至" + text + value);
            })
            .catch(e => {
              this.pop("验证码发送失败");
            });
        } else {
          this.pop("请输入正确的邮箱");
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
            this.status = "main";
            Dialog.create({
              title: "昵称修改成功",
              buttons: ["确定"]
            });
          })
          .catch(e => {
            Dialog.create({
              title: "昵称修改失败",
              buttons: ["确定"]
            });
          });
      } else if (this.status === "name" && this.newName && this.vcode) {
        const username = this.userInfo.verified[this.vcodeSendTo];

        userService
          .changeAuthentication("name", this.newName, username, this.vcode)
          .then(r => {
            this.pop("用户名修改成功");
            this.userInfo.authentication.name = this.newName.trim();
            this.status = "main";
          })
          .catch(e => {
            if (e.response && e.response.status === 403) {
              this.pop("验证码错误");
            } else if (e.response && e.response.status === 409) {
              this.pop("该用户名已被注册");
            } else {
              this.pop("用户名修改失败");
            }
          });
      } else if (this.status === "phone" && this.newPhone && this.vcode) {
        if (this.newPhone === this.userInfo.authentication.phone) {
          // 验证手机号
          userService
            .verified(this.newPhone, this.vcode)
            .then(r => {
              this.pop("手机验证成功");
              this.userInfo.verified.phone = this.newPhone;
              this.status = "main";
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.pop("验证码错误");
              } else {
                this.pop("手机验证失败");
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
                  this.pop("手机号修改成功");
                  this.userInfo.authentication.phone = this.newPhone;
                  this.status = "main";
                })
                .catch(e => {
                  if (e.response && e.response.status === 409) {
                    this.pop("该手机号已被注册");
                  } else if (e.response && e.response.status === 403) {
                    this.pop("验证码错误");
                  } else {
                    this.pop("手机号修改失败");
                  }
                });
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.pop("验证码错误");
              } else {
                this.pop("出错了");
              }
            });
          // userService
          //   .changeAuthentication("phone", this.newPhone, username, this.vcode)
          //   .then(r => {
          //     this.pop("手机号修改成功");
          //     this.userInfo.authentication.phone = this.newPhone;
          //     this.status = "main";
          //   })
          //   .catch(e => {
          //     if (e.response && e.response.status === 409) {
          //       this.pop("该手机号已被注册");
          //     } else if (e.response && e.response.status === 403) {
          //       this.pop("验证码错误");
          //     } else {
          //       this.pop("手机号修改失败");
          //     }
          //   });
        }
      } else if (this.status === "email" && this.newEmail && this.vcode) {
        if (this.newEmail === this.userInfo.authentication.email) {
          // 验证邮箱
          userService
            .verified(this.newEmail, this.vcode)
            .then(r => {
              this.pop("邮箱验证成功");
              this.userInfo.verified.email = this.newEmail;
              this.status = "main";
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.pop("验证码错误");
              } else {
                this.pop("邮箱验证失败");
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
                  this.pop("邮箱修改成功");
                  this.userInfo.authentication.email = this.newEmail;
                  this.status = "main";
                })
                .catch(e => {
                  if (e.response && e.response.status === 409) {
                    this.pop("该邮箱已被注册");
                  } else if (e.response && e.response.status === 403) {
                    this.pop("验证码错误");
                  } else {
                    this.pop("邮箱修改失败");
                  }
                });
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.pop("验证码错误");
              } else {
                this.pop("出错了");
              }
            });

          // userService
          //   .changeAuthentication("email", this.newEmail, username, this.vcode)
          //   .then(r => {
          //     this.pop("邮箱修改成功");
          //     this.userInfo.authentication.email = this.newEmail;
          //     this.status = "main";
          //   })
          //   .catch(e => {
          //     if (e.response && e.response.status === 409) {
          //       this.pop("该邮箱已被注册");
          //     } else if (e.response && e.response.status === 403) {
          //       this.pop("验证码错误");
          //     } else {
          //       this.pop("邮箱修改失败");
          //     }
          //   });
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
              this.pop("密码修改成功");
              this.status = "main";
            })
            .catch(e => {
              if (e.response && e.response.status === 403) {
                this.pop("验证码错误");
              } else {
                this.pop("密码修改失败");
              }
            });
        } else if (this.newPassword.length < 6) {
          this.pop("密码至少为6位");
        } else if (this.newPassword !== this.newPasswordConfig) {
          this.pop("两次输入的密码不相同");
        }
      }
    },
    goMall() {
      window.location.href =
        "http://55764158.m.weimob.com/vshop/55764158/Index?PageId=452950&IsPre=1";
    },
    logout() {
      this.$http.post("/user/logout").then(r => {
        LocalStorage.clear();
      });
      this.$router.replace("/login");
    },
    goback() {
      this.$router.go(-1);
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
    startVerificationTimer(e) {
      let iim = 100;
      if (e === 1) {
        this.verificationPercentage1 = 0;
        this.verificationProcessing1 = true;
        clearInterval(this.verificationInterval1);
        this.verificationInterval1 = setInterval(() => {
          this.verificationPercentage1 += 100 * iim / 60000;
          if (this.verificationPercentage1 >= 100) {
            this.cancelVerificationTimer(1);
          }
        }, iim);
      } else if (e === 2) {
        this.verificationPercentage2 = 0;
        this.verificationProcessing2 = true;
        clearInterval(this.verificationInterval2);
        this.verificationInterval2 = setInterval(() => {
          this.verificationPercentage2 += 100 * iim / 60000;
          if (this.verificationPercentage2 >= 100) {
            this.cancelVerificationTimer(2);
          }
        }, iim);
      } else {
        this.verificationPercentage = 0;
        this.verificationProcessing = true;
        clearInterval(this.verificationInterval);
        this.verificationInterval = setInterval(() => {
          this.verificationPercentage += 100 * iim / 60000;
          if (this.verificationPercentage >= 100) {
            this.cancelVerificationTimer();
          }
        }, iim);
      }
    },
    cancelVerificationTimer(e) {
      if (e === 1) {
        this.verificationProcessing1 = false;
        this.verificationPercentage1 = 0;
        clearInterval(this.verificationInterval1);
      } else if (e === 2) {
        this.verificationProcessing2 = false;
        this.verificationPercentage2 = 0;
        clearInterval(this.verificationInterval2);
      } else {
        this.verificationProcessing = false;
        this.verificationPercentage = 0;
        clearInterval(this.verificationInterval);
      }
    }
  },
  beforeMount() {
    userService
      .getUser()
      .then(r => {
        this.userInfo.id = r.data.id;
        this.userInfo.authentication.name = r.data.authentication.name || null;
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

        if (r.data && r.data.customize && r.data.customize.avatar) {
          this.userInfo.customize.avatar = r.data.customize.avatar;
        } else {
          // this.userInfo.customize.avatar = require("assets/images/logo.jpg");
        }

        this.newPhone = this.userInfo.authentication.phone;
        this.newEmail = this.userInfo.authentication.email;
      })
      .catch(e => {
        if (e.response && e.response.status === 401) {
          this.$router.replace("login");
        }
      });
  },
  beforeDestroy() {
    clearInterval(this.verificationInterval);
    clearInterval(this.verificationInterval1);
    clearInterval(this.verificationInterval2);
  }
};
</script>
<style lang="stylus">
.user-content {
  width: 100vw;
  height: 100vh;
  background-color: rgb(244, 244, 244);

  .user-detail {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
  }

  .head {
    width: 100vw;
    // height: 25vh;
    height: 40vw;
    // background-image: url('../assets/images/userCenter/bg.png');
    background-size: cover;

    img {
      // width: 11vh;
      // height: 11vh;
      // margin-top: 3vh;
      width: 20vw;
      height: 20vw;
      margin-top: 3vw;
      border-radius: 50%;
      border: 0.9vw solid white;
    }

    .name {
      color: white;
      font-size: 4vw;
    }
  }

  .main-list {
    height: 65vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list {
    background-color: white;

    .item {
      // height: 8vh;
      height: 14vw;
      width: 90vw;
      margin-left: 5vw;

      img {
        width: 2.5vw;
      }
    }

    .left {
      font-size: 4.5vw;
      color: #444444;
    }

    .right {
      font-size: 3.8vw;
      color: #888888;

      span {
        background-color: #2be192;
        color: white;
        font-size: 2.5vw;
        padding: 2vw 2.5vw;
        border-radius: 4px;
      }

      .unverified {
        background-color: #f62254;
      }
    }

    .borderB {
      border-bottom: 1px solid #e8e8e8;
    }
  }

  .blank {
    height: 2vh;
  }

  .blank1 {
    height: 5vh;
  }

  .detail {
    .userInput {
      margin-left: 3vw;
      height: 10vw;
      width: 65vw;
      font-size: 5vw;
      border: none;
      outline: none;
      background: none;

      input.q-input-target {
        height: 10vw;
        outline: 0;
      }
    }

    .q-if:before, .q-if:after {
      background: none;
      border: none;
    }

    .q-btn {
      transition: none;
    }

    .userBtn {
      width: 94vw;
      height: 13vw;
      // height: 7vh;
      background-color: rgb(16, 164, 228);
      color: white;
      font-size: 4.5vw;
      border-radius: 4px;
      box-shadow: none;
      transition: none;
      opacity: 1;

      &:active {
        box-shadow: none;
      }

      &.disabled {
        opacity: 0.4 !important;
      }
    }

    .small_userBtn {
      width: 46vw;
    }

    .left {
      color: #888;
    }

    .right {
      color: #444;
    }

    .tip {
      height: 14vw;
      color: #888;
      font-size: 3.5vw;
      background-color: rgb(244, 244, 244);
    }

    .send {
      width: 94vw;
      margin-left: 3vw;
      min-height: 18vw;

      .btn {
        width: 94vw;
        height: 13vw;
        background-color: rgb(16, 164, 228);
        color: white;
        font-size: 4.5vw;
        border-radius: 4px;
      }

      .btn_small {
        width: 46vw;
        height: 13vw;
        background-color: rgb(16, 164, 228);
        color: white;
        font-size: 4.5vw;
        border-radius: 4px;
      }
    }

    .change {
      width: 100vw;
      // height: 10vh;
      height: 18vw;
    }

    .cancel {
      width: 100vw;
      // height: 10vh;
      height: 18vw;

      .userBtn {
        background-color: #ccc;
      }
    }
  }
}
</style>
