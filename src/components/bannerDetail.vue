<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">详情</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="busiInt_cont posit">
				<div class="inforDetail_img">
					<img :src="list.image">
				</div>
				<div class="inforCont" v-html="list.content">
					
				</div>	
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : []
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getdata();
    this.getSign();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getdata(){
  		this.$http.post('/Shop/Public/getAdData', {id:this.$route.query.id,sign:this.$route.query.sign,isGroup:0},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.list = response.data.data.array;          	        
        	}	   
        });
  	},
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

