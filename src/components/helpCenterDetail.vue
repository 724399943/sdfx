<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">详情</h1>
		</header>
		<div class="main">
			<div class="busiInt_cont posit">
				<div class="inforDetail_img">
					<img :src="detail.image">
				</div>
				<div class="inforCont" v-html="detail.content">
					
				</div>	
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      detail : {}
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
    	this.$http.post('/Shop/Article/getArtData', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.detail = response.data.data.detail;      		
        	}	   
        });
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

