<template>
  	<div class="content">
  		<header class="head">
			<router-link class="back" to="/" ></router-link>
			<h1 class="y-confirm-order-h1">支付成功</h1>
		</header>
		<div class="main">
			<p class="order_num">订单号：{{$route.query.order_sn}}</p>
			<div class="paywrap">
				<div class="psuccess_m">
					<div class="p_imgbox">
						<img src="../assets/images/paySuccess_ico.png">
					</div>
					<p class="p_ptt">订单支付成功！正在安排发货...</p>
					<div class="p_suessbtn">
						<router-link :to="'/orderDetail?order_sn='+$route.query.order_sn" class="btn">查看订单</router-link>
						<router-link class="btn" to="/" >返回商城</router-link>
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
      
    }
  },
  created(){
    
  },
  computed: {
    
  },
  methods: {

    
  }

}
</script>

