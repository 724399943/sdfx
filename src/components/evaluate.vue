<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">评价</h1>
			<span class="mail" @click="commitFun">发布</span>
		</header>
		<div class="main">
			<div class="evaluate_m">
				<div class="goods_assess pdv">
					<p class="eept">请选择星数</p>
					<div class="eva_top pdv">
						<div class="eva_star_cont">
							<div class="eva_star_box" :class="{'on':star>0}" @click="onstarFun(1)"></div> 
							<div class="eva_star_box" :class="{'on':star>1}" @click="onstarFun(2)"></div> 
							<div class="eva_star_box" :class="{'on':star>2}" @click="onstarFun(3)"></div> 
							<div class="eva_star_box" :class="{'on':star>3}" @click="onstarFun(4)"></div> 
							<div class="eva_star_box" :class="{'on':star==5}" @click="onstarFun(5)"></div>
						</div>
					</div>
				</div>
				<div class="msgbox">
					<textarea placeholder="宝宝满足你的期待吗？说说它的优点和美中不足的地方吧(150字以内)" v-model="contain"></textarea>
					<div class="add_g_de">
						<div class="g_imgm">
							<ul>
								<li v-for="(pic,index) in url">
									<div class="imgbox">
										<img :src="pic"> 
										<em @click="removeImg(index)"></em>
									</div>
								</li> 
								<li id="filePicker">
									<div class="upload_input">
										<div class="upfile-box">
											<input type="file" name="" @change="imageuploaded" v-if="iphone == true">
											<input type="button" @click="choose" v-else-if="android == true">
							            </div>
									</div>
								</li>
							</ul>
						</div>
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
      contain : '',
      url : [],
      image : '',
      star : 0,
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
  },
  components: {
    
  },
  methods: {
  	commitFun : function(){
    	this.$http.post('/Shop/Comment/addComment', {id:this.$route.query.id,order_sn:this.$route.query.order_sn,contain:this.contain,images:this.url,star:this.star},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.$store.commit('alert',{show:true,text:response.data.message});  
            	window.history.go(-1);
        	}else{
        		this.$store.commit('alert',{show:true,text:response.data.message});
        	}
        })
  	},
    removeImg : function(index){
    	this.url.splice(index,1);
    },
    onstarFun(num){
    	this.star = num;
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
	            	that.url.push(response.data.data.url);
	        	}
	        })
    	}
    },
    choose(){
    	//点击选择图片，js调用Android打开相册
        JSInterface.choose();
    },
    onChooseResult(images){
    	var imagesData = new Array();
    	imagesData = images.split(',');
    	for ( var i in imagesData) {	    	
			this.url.push(imagesData[i]);
    	}
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

