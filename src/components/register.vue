<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">注册</h1>
		</header>
		<div class="main">
			<div class="enr_input all">
				<form>
					<ul>
						<li class="line">
							<div class="einput">
								<span>手机号</span>
								<input type="text" name="" value="" placeholder="请输入手机号码" v-model="dataJson.params">
							</div>
						</li>
						<li class="line">
							<div class="einput">
								<span>密码</span>
								<input type="password" name="" placeholder="(英文数字6-12位)" class="pmr" v-model="dataJson.password">
							</div>
						</li>
						<li class="line">
							<div class="einput">
								<input type="text" name="" placeholder="验证码" class="code" v-model="dataJson.code">
								<a href="javascript:;" class="getCode_btn" id="getCode" @click="getCode" v-if="noget">获取验证码</a>
								<a href="javascript:;" class="getCode_btn res" v-else>重新发送({{settimes}})</a>
							</div>
						</li>
						<li class="line">
							<div class="einput">
								<span>邀请码</span>
								<input type="text" name="" value="" v-model="dataJson.invite">
							</div>
						</li>
						<li>
							<div class="einput">
								<span class="res">注册我视为同意</span>
								<router-link to="/registrationProtocol" class="eag">《注册协议》</router-link>
							</div>
						</li>
					</ul>
				</form>
				<a href="javascript:;" class="register_btn" @click="registerFun">注册</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
	    return {
	      	dataJson : {},
	      	noget : 1,
          	settimes : 60
	    }
	},
	created(){
	    
	},
	methods: {
	    registerFun : function(){
	    	this.$http.post('/Shop/Login/register', this.dataJson,{emulateJSON:true}).then(function(response){	
				if( response.data.status == '200000' ){
					window.history.back();		
				}else{
					this.$store.commit('alert',{show:true,text:response.data.message});
				}    	
		    });
	    },
	    getCode : function () { //获取短信验证码
            this.$http.post('/Shop/Login/getPhoneOrEmailVerify', {phone_or_email:this.dataJson.params,type:0},{emulateJSON:true}).then(function(response){	
				if( response.data.status == '200000' ){
					var GetCode = document.getElementById('getCode');
					this.settime(GetCode);				
				}else{
					this.$store.commit('alert',{show:true,text:response.data.message});
				}    	
		    });            
        },
	    settime : function (_this) {
            var that = this;
            if (that.settimes == 0) { 
                _this.innerText = "获取短信校验码";
                that.noget = 1;
                that.settimes = 60; 
                return;
            } else { 
                _this.innerText = "重新发送("+ that.settimes +")";
                that.noget = 0;
                that.settimes--;
            } 
            setTimeout(function() { that.settime(_this) } ,1000) 
        },
	    routeBack : function(){
	      this.$router.go(-1);
	    }
	}

}
</script>

