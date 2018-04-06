<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1 sh">{{list.title}}</h1>
			<router-link to="/messageIndex"><i class="ntop"><span class="dot nt" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span></i></router-link>
			<router-link to="/search"><span class="gsearch stop"></span></router-link>
			<router-link to="/shoppingCart"><span class="gscar cartop"></span></router-link>
		</header>
		<div class="main">
			<div class="special_wrap">
				<!-- <div class="sptopImg">
					<img :src="list.image">
				</div> -->
				<div class="special_allImg">					
						<div v-html="list.content"></div>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : {}
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
  		this.$http.post('/Shop/Public/getShowData', {sign:this.$route.query.sign,isGroup:0},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.list = response.data.data.showInfo;	        		
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

