<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">修改个人资料</h1>
			<a href="javascript:window.history.go(-1);"><span class="mail">完成</span></a>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li>
						<span>头像</span>
						<div class="imgbox">
							<img :src="userInfo.headimgurl">
							<div class="upfile-box">
                <input type="file" name="" @change="imageuploaded" v-if="iphone == true">
                <input type="button" @click="choose" v-else-if="android == true">
              </div>
						</div>
					</li>
					<li class="editpsw">
						<span>登录账号</span>
						<p>{{userInfo.phone}}</p>
					</li>
					<li>
						<span>昵称</span>
						<input type="text" name="" class="name" v-model="userInfo.nickname" @change="ChangeNickname">
					</li>
					<li @click="ChangeSex">
						<span>性别</span>
						<p v-if="userInfo.sex == 0">保密</p>
						<p v-else-if="userInfo.sex == 1">男</p>
						<p v-else>女</p>
					</li>
					<li class="editpsw">
						<router-link to="/forgotPassword">
							<span>修改密码</span>
							<i></i>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/replaceBindPhone',query:{phone:userInfo.phone}}">
							<span>更换绑定手机</span>
							<i></i>
						</router-link>
					</li>
				</ul>
			</div>
			<!-- 弹窗 -->
			<div class="mask" :class="{fadeIn : sexshow == true,fadeOut : sexshow == false}"></div>
			<div class="sexbox" v-if="sexshow == true">
				<p class="line" @click="selSex('1')">男</p>
				<p @click="selSex('2')">女</p>
			</div>
		</div>
  	</div>
</template>
<script>
export default {
  data () {
    return {
      userInfo : {},
      sexshow : false,
      iphone : false,
      android : false
    }
  },
  created(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') == -1) {
      if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
            this.iphone = true;
            this.android = false;
        } else {
            this.iphone = false;
            this.android = true;
        }
    }
    window.onChooseResult = this.onChooseResult;
    this.$store.commit('loading',{show:true,text:"加载中..."})
    this.getData();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
  },
  components: {
    
  },
  methods: {
    getData(){
    	this.$http.post('/Shop/User/userInfo', {},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
        		this.userInfo = response.data.data.userInfo;            	
        	}	   
        });
    },
    ChangeNickname(){
    	this.$http.post('/Shop/User/ajaxChangeNickname', {nickname:this.userInfo.nickname},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
        		this.$store.commit('alert',{show:true,text:response.data.message});    		
        	}	   
        });    	
    },
    ChangeSex : function(){
    	if( this.sexshow == false ){
    		this.sexshow = true;
    	}else{
    		this.sexshow = false;    		
    	}
    },
    selSex : function(state){
    	this.userInfo['sex'] = state;
		  this.$http.post('/Shop/User/ajaxChangeSex', {sex:this.userInfo.sex},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
        		this.$store.commit('alert',{show:true,text:response.data.message}); 
        		this.sexshow = false;   		
        	}	   
        });
    },
    imageuploaded(e){
      var that = this;
      var files = e.target.files || e.dataTransfer.files
      var reader = null;
      reader = new window.FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function(e){
        that.$http.post('/Shop/Comment/photoSave', {image:e.target.result},{emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
                that.userInfo["headimgurl"] = response.data.data.url;
                that.changeHeadimg();
            }
          })
      }
    },
    changeHeadimg : function(){
      this.$http.post('/Shop/User/ajaxChangeHeadimg', {headimgurl:this.userInfo.headimgurl},{emulateJSON:true}).then(function(response){
          if( response.data.status == "200000" ){
            this.$store.commit('alert',{show:true,text:response.data.message});       
          }    
        });
    },
    choose(){
      //点击选择图片，js调用Android打开相册
        JSInterface.choose(1);
    },
    onChooseResult(images){
      this.userInfo["headimgurl"] = images;  
      this.changeHeadimg();    
    },
    routeBack : function(){
      this.$router.go(-1);
    }  

  }

}
</script>

