<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">意见反馈</h1>
		</header>
		<div class="main">
			<div class="releaseNews">
				<ul>
					<li>
						<div class="rel_text">
							<textarea placeholder="内容：您合理的建议有助于我们改善用户体验。" class="fkui" v-model="contents"></textarea>
						</div>
					</li>
				</ul>
				<a href="javascript:;" class="widup" @click="commitFun">提交</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      contents : ''
    }
  },  
  methods: {
    commitFun(){
    	this.$http.post('/Shop/User/feedback', {contents:this.contents},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.$store.commit('alert',{show:true,text:response.data.message});
              this.contents = "";
        	}else{
              this.$store.commit('alert',{show:true,text:response.data.message});
          }	   
        });
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

