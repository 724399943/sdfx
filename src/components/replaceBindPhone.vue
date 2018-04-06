<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">更换绑定手机</h1>
		</header>
		<div class="main">
			<div class="replace_wrap">
				<div class="rbinput">
					<p class="pt">请输入 {{phoneShow}} 收到的验证码</p>
				</div>
				<div class="rbinput">
					<input type="text" name="" placeholder="验证码" class="codet" v-model="code">
					<a href="javascript:;" class="fpcode_btn" id="getCode" @click="getCode" v-if="noget">获取验证码</a>
					<a href="javascript:;" class="fpcode_btn res" v-else>重新发送({{settimes}})</a>
				</div>
				<a href="javascript:;" class="nextBtn" @click="unbindPhone">下一步</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      phone : this.$route.query.phone,
      phoneShow : '',
      code : '',
      noget : 1,
      settimes : 60
    }
  },
  created(){
    this.encryptPhone();
  },
  methods: {
    unbindPhone : function(){
    	this.$http.post('/Shop/User/unbindPhone', {code:this.code},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){            
        		this.$router.push({path:'/bindNewPhone?type='+ response.data.data.type});   		
        	}else{
        		this.$store.commit("alert",{show:true,text:response.data.message});
        	}	   
        });
    },
    getCode : function () { //获取短信验证码
        this.$http.post('/Shop/Login/getPhoneOrEmailVerify', {phone_or_email:this.phone,type:3},{emulateJSON:true}).then(function(response){
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
    encryptPhone : function(){
    	var str = this.phone.substring(3,7);
    	this.phoneShow = this.phone.replace(str,'****');
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

