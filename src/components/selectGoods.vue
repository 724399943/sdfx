<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">选择商品</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="orderList_wrap">
				<div class="my_order_wrap">
					<ul class="yy-myorder-list">
						<li>
							<div class="y-order-pro">
					        	<a href="javascript:;" class="y-kein" v-for="(item,index) in orderList">	 
					        		<div class="y-imgbox">
							        	<div class="y-img">
								        	<div class="ab">
								        		<img :src="item.goods_image">
								        	</div>
							        	</div>
					        		</div>       		
						        	<div class="y-jnjcn">
							        	<p class="y-njcn db-overflow">{{item.goods_name}}</p>
							        	<div class="y-ws5d">
								        	<p class="y-price">￥{{item.price}}</p>
								        </div>
								        <div class="y_name_t">
								        	<span>{{item.specifications}}</span>
							        		<router-link :to="{path:'/evaluate',query:{order_sn:item.order_sn,id:item.id}}" class="aos" v-if="item.is_comment == 0">评价</router-link>
							        		<router-link :to="{path:'/viewEvaluation',query:{id:item.comment_id}}" class="aos grey" v-else>查看评价</router-link>
							        	</div>
						        	</div>
					        	</a>
				        	</div>				   
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
      orderList : []
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
    this.getSign();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
    	this.$http.post('/Shop/Comment/commentDetail', {order_sn:this.$route.query.order_sn},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.orderList = response.data.data.orderList;	  
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

