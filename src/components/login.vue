<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<router-link to="/register" class="mail la">注册</router-link>
		</header>
		<div class="main">
			<div class="login_wrap all">
				<div class="login-box-s" style="min-height: 400px;">
					<h1>欢迎</h1>
					<form>
						<div class="login_box">
							<div class="login_input">
								<input type="text" name="" placeholder="请输入手机号" @blur="blurFun" @focus="focusFun" v-model="dataJson.params">
								<em @click="clearVal"></em>
							</div>
							<div class="login_input">
								<input type="password" name="" placeholder="请输入密码" @blur="blurFun" @focus="focusFun" v-model="dataJson.password">
							</div>
						</div>
					</form>
					<a href="javascript:;" class="login_btn" @click="loginFun">登录</a>
					<router-link to="/forgotPassword" class="forgetBtn">忘记密码?</router-link>
				</div>
				<div class="cooperative-login" id="Jshare-box">	     
		            <div class="box">
		                <a href="mitchell://wxlogin" class="l-g-b">
		                    <img src="../assets/images/wechat_ico.png">
		                    <p>微信</p>
		                </a>
		                <a href="mitchell://qqlogin" class="l-g-b">
		                    <img src="../assets/images/QQchat_ico.png">
		                    <p>QQ</p>
		                </a>
		                <a href="mitchell://wblogin" class="l-g-b">
		                    <img src="../assets/images/weibo_ico.png">
		                    <p>微博</p>
		                </a>
		            </div>
		        </div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      dataJson : {}
    }
  },
  mounted(){

  },
  methods: {
    loginFun : function(){
    	this.$http.post('/Shop/Login/Login', this.dataJson,{emulateJSON:true}).then(function(response){	
			if( response.data.status == '200000' ){
				localStorage.session_id = response.data.data.session_id;
				window.location.href="mitchell://login?user_id="+response.data.user.id+'&session_id='+response.data.data.session_id;				
				this.$router.push('/');				
			}else{
				this.$store.commit('alert',{show:true,text:response.data.message});
				this.dataJson = {};
			}    	
	    });
    },
    clearVal : function(){
    	this.dataJson = {};
    },blurFun(){
    	document.getElementById('Jshare-box').style.position="absolute";
    },focusFun(){
    	document.getElementById('Jshare-box').style.position="relative";
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

