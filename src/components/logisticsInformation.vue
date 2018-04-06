<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">物流信息</h1>
			<router-link to="messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="y-trace-express">
				<p>订单编号：{{order_sn}}</p>
				<p>快递公司：{{express}}</p>
				<p>快递单号：{{express_sn}}</p>
			</div>
			<div class="y-traceexpress-li">
				<div class="paddingli">
					<ul class="yt-ul">
						<li v-for="(item,index) in list" :class="{on:index == 0}">
							<i class="point"></i>
							<p class="pl">{{item.context}}</p>
							<p class="time">{{item.ftime}}</p>
						</li>						
					</ul>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      order_sn : this.$route.query.order_sn,
      express_sn : this.$route.query.express_sn,
      express : this.$route.query.express,
      list : []
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
    this.getSign();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
    	this.$http.post('/Shop/Order/getShipping',{order_sn:this.order_sn},{emulateJSON:true}).then(function(response){
  			this.list = response.data.data.shippingDetail;			
  		})
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

