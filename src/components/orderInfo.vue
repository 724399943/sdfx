<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">确认订单</h1>
		</header>
		<div class="main">
			<div class="order_balance">
				<!-- 暂无地址 -->
	        	<router-link to="/consigneeList" class="y-consignee-imfo" v-if="consigneeList == ''">
	        		<p class="y-pt">请补充详细地址</p>
	        		<i class="y-icon2"></i>
	        	</router-link>
				<router-link to="/consigneeList" class="y-consignee-imfo" v-else>
	        		<div class="y-line1 clearfix">
	        			<div class="y-name">收货人：<em>{{consigneeList.consignee}}</em></div>   
	        			<div class="y-phone">{{consigneeList.telephone}}</div>
	        		</div>
		        	<p class="y-address">收货地址：{{consigneeList.province_name}}{{consigneeList.city_name}}{{consigneeList.county_name}}{{consigneeList.address}}</p>
		        	<i class="y-icon2"></i>
	        	</router-link>	        	
	        	<div class="y-order-pro">
	        		<a href="javascript:;" class="y-kein" v-for="(item,index) in list">	 
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
					        	<span v-for="(it,index) in item.attrList">{{it.attr_name}}:{{it.attr_value}}</span>
					        </div>
					        <div class="y_name_t">
				        		<p class="y-price">￥{{item.goods_price}}</p>
				        		<em>x{{item.goods_number}}</em>
				        	</div>
			        	</div>
		        	</a>
		        	<div class="y-detail">
			        	<div class="t-1">
			        		<em class="y-gray">共 {{count}}件商品</em>
			        		<em class="to-to-price">合计：<span>￥{{total}}</span></em>
			        	</div>
			        	<div class="t-1">
			        		<div class="dt_bg">
			        			<input type="" name="" placeholder="选填：给卖家留言(45字以内)" v-model="note">
			        		</div>	        		
			        	</div>
		        	</div>
	        	</div>
	        	<div class="y-ems">
	        		<a href="javascript:;" class="t-1">
		        		<em class="t-text">配送方式</em> <span> 快递包邮</span>
		        	</a>
	        	</div>
			</div>
			 <footer class="y-foot-45px">
			    <div class="padding-l-120">
			    	<div class="total">
			    		<em class="em1">合计 </em>
			    		<em class="em-price">￥{{total}}</em>
			    	</div>
				   	<a href="javascript:;" class="gotopay" @click="commitOrderInfo">立即下单</a>
			   	</div>
		   </footer>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : [],
      count : '',
      total : '',
      consigneeList : {},
      note : '',
      cid : ''
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
    	this.$http.post('/Shop/Shop/orderInfo', {ids:this.$route.query.id},{emulateJSON:true}).then(function(response){        
    		if( response.data.status == "200000" ){
	    		this.list = response.data.data.shoppingList;    
	    		this.count = response.data.data.count;
	    		this.total = response.data.data.total;	 
	    		this.consigneeList = response.data.data.consigneeList;  
	    		this.cid = response.data.data.consigneeList.id;     		
    		}else{
    			this.$store.commit('alert',{show:true,text:response.data.message});
    		}	
        });
    },
    commitOrderInfo : function(){
    	this.$http.post('/Shop/Shop/commitOrderInfo', {ids:this.$route.query.id,note:this.note,cid:this.cid}).then(function(response){    		
    		if( response.data.status == 200000 ){	    		     
	        	this.$router.push({path:'/payment',query:{order_sn:response.data.data.order_sn}});   			
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

