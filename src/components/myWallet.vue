<template>
  	<div class="content">
  		<div class="integral_wrap">
			<div class="s_man_top jibg">
				<h1>我的钱包</h1>
				<a class="back" href="javascript:;" @click="routeBack"></a>
				<p class="money">{{userInfo.money}}</p>
				<p class="lm">金额</p>
				<router-link to="/messageIndex" class="news">
					<i></i>
					<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
				</router-link>
			</div>
			<div class="p_cen_m">
				<ul class="sm_ul">
					<li>
						<router-link to="/myLip">
							<span class="s1">分润</span>
							<span class="s2 redt">￥{{userInfo.fenrun_price}}</span>
							<em class="ei"></em>
						</router-link>
					</li>
					<li>
						<router-link to="/partnerRedEnvelope">
							<span class="s1">合伙人红包</span>
							<span class="s2 redt">￥{{userInfo.red_price}}</span>
							<em class="ei"></em>
						</router-link>
					</li>
					<li class="pli">
						<router-link to="/recharge">
							<span class="s1">充值</span>
							<span class="s2">微信/支付宝</span>
							<em class="ei"></em>
						</router-link>
					</li>
					<li>
						<router-link to="/withdrawals">
							<span class="s1">提现</span>
							<em class="ei"></em>
						</router-link>
					</li>
					<li class="topline">
						<router-link to="/moneyLog">
							<span class="s1">收支明细</span>
							<em class="ei"></em>
						</router-link>
					</li>
				</ul>
			</div>
		</div>		
  	</div>
</template>
<script>
export default {

  data () {
    return {
      userInfo : {},
      is_pay : false      
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
    	this.$http.post('/Shop/User/myBalance', {},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.userInfo = response.data.data.userInfo;	  
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

