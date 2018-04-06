<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">详情</h1>
		</header>
		<div class="main">
			<div class="news_detail" v-html="messageInfo.content">
				<!-- <div class="imgbox">
					<img :src="messageInfo.image">
				</div>
				<p>{{messageInfo.content}}</p> -->
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      messageInfo : {}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Message/messageInfo', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){
          if( response.data.status == "200000" ){
              this.messageInfo = response.data.data.messageInfo;             
          }    
        });
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

