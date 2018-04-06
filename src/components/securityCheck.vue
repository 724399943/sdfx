<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">防伪查询</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="busiInt_cont posit">
				<a href="javascript:;">
					<div class="inforDetail_img">
						<img src="http://placehold.it/350x150">
					</div>
				</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      
    }
  },
  created(){
  	this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getSign();
  },
  mounted(){
    this.$store.commit('loading',{show:false});	  	
  },
  methods: {
    getSign : function(){
     this.$http.post('/Shop/User/getSign', {},{emulateJSON:true}).then(function(response){
        if( response.data.status == 200000 ){
            this.$store.state.messageCount = response.data.data.count;
        }   
      });
  	},
    routeBack : function(){
      this.$router.go(-1);
    }
    
  }

}
</script>

