<template>
  	<div class="content">
  		<div class="integral_wrap">
			<div class="s_man_top jibg">
				<h1>提现</h1>
				<a class="back" href="javascript:;" @click="routeBack"></a>
				<p class="money">{{userInfo.money}}</p>
				<p class="lm">可提现金额</p>
				<router-link to="/cashRegister" class="mail">提现记录</router-link>
			</div>
			<div class="y-bindphone">
				<ul>
					<li>
						<a href="javascript:;">
							<input typPe="text" name="" placeholder="输入提现金额" class="widInput" v-model="dataJson.amount">
							<span class="widspan">最低提现额为{{minWithdraw}}元</span>
							<i></i>
						</a>
					</li>
					<li @click="selmode('open')">
						<a href="javascript:;">
							<span>选择到账渠道</span>
							<i></i>
							<input type="text" name="" disabled="disabled" :value="withdraw">
						</a>
					</li>					
				</ul>
				<p class="ytips">提示：提现需要扣除5%税费手续费</p>
				<a href="javascript:;" class="widBtn" @click="commitFun">立即提现</a>
			</div>
		</div>
		<!-- 弹窗 -->
		<div class="mask" :class="{fadeIn:showJson.is_mask == 1,fadeOut:showJson.is_mask == 0}" @click="selmode('close')"></div>
		<!-- 选择提现 -->
		<div class="selChannel" :class="{slideUp:is_sel == 1,slideDown:is_sel == 0}">
			<ul>
				<li>
					<a href="javascript:;" :class="{on:is_type == 'bank'}">
						<span>银行卡</span>
						<select @change="seldrawalType('bank')">
							<option value="-1">请选择银行卡</option>
							<option v-for="(bank,index) in cardJson" :value="index">{{bank.accounts}}</option>
						</select>
						<!-- <input type="text" name="" disabled="disabled" :value="cardJson.accounts"> -->
					</a>
				</li>
				<li @click="seldrawalType('wechat')">
					<a href="javascript:;" :class="{on:is_type == 'wechat'}">
						<span>微信</span>
					</a>
				</li>
				<li @click="seldrawalType('alipay')">
					<a href="javascript:;" :class="{on:is_type == 'alipay'}">
						<span>支付宝</span>
					</a>
				</li>
				<a href="javascript:;" class="wwchannel" @click="seldrawalType('add')">添加银行卡</a>
			</ul>
		</div>
		<!-- 微信 -->
		<div class="selChannel" :class="{slideUp:showJson.is_wechat==1,slideDown:showJson.is_wechat==0}">
			<ul>
				<li>
					<a href="javascript:;">
						<span>微信号</span>
						<input type="text" name="" placeholder="请输入微信号" class="widInput" v-model="dataJson.account">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>真实姓名</span>
						<input type="text" name="" placeholder="请输入真实姓名" class="widInput" v-model="dataJson.username">
					</a>
				</li>
				<a href="javascript:;" class="wwchannel on" @click="selmode('close')">保存</a>
			</ul>
		</div>
		<!-- 支付宝 -->
		<div class="selChannel" :class="{slideUp:showJson.is_alipay==1,slideDown:showJson.is_alipay==0}">
			<ul>
				<li>
					<a href="javascript:;">
						<span>支付宝</span>
						<input type="text" name="" placeholder="请输入支付宝帐号" class="widInput" v-model="dataJson.account">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>真实姓名</span>
						<input type="text" name="" placeholder="请输入真实姓名" class="widInput" v-model="dataJson.username">
					</a>
				</li>
				<a href="javascript:;" class="wwchannel on" @click="selmode('close')">保存</a>
			</ul>
		</div>
		<!-- 银行卡 -->
		<div class="selChannel" :class="{slideUp:showJson.is_bank==1,slideDown:showJson.is_bank==0}">
			<ul>
				<li>
					<a href="javascript:;">
						<span>持卡人姓名</span>
						<input type="text" name="" placeholder="请输入持卡人姓名" v-model="addCardJson.username">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>银行卡卡号</span>
						<input type="text" name="" placeholder="请输入银行卡卡号" v-model="addCardJson.card">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>开户行</span>
						<input type="text" name="" placeholder="请输入开户行" v-model="addCardJson.accounts">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>开户行支行</span>
						<input type="text" name="" placeholder="请输入开户行支行" v-model="addCardJson.branch">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>开户行地址</span>
						<input type="text" name="" placeholder="请输入开户行地址" v-model="addCardJson.address">
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<span>预留手机号</span>
						<input type="text" name="" placeholder="请输入银行预留手机号" v-model="addCardJson.phone">
					</a>
				</li>
				<a href="javascript:;" class="wwchannel on" @click="addBankCard">保存</a>
			</ul>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      userInfo : {},
      minWithdraw : 0,
      withdraw : '未选择',
      cardJson : {},
      is_sel : 0,
      is_type : '',
      showJson : {
      	is_mask : 0,
      	is_bank : 0,
      	is_wechat : 0,
      	is_alipay : 0
      },
      dataJson : {},
      addCardJson : {}
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
    	this.$http.post('/Shop/User/myBalance', {},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.userInfo = response.data.data.userInfo;	
            	this.minWithdraw = response.data.data.minWithdraw;  
            	this.cardJson = response.data.data.bank_card;  
        	}	   
        });
    },
    commitFun : function(){    
    	this.$http.post('/Shop/User/withdrawals', this.dataJson,{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.$store.commit('alert',{show:true,text:"申请提现的请求提交成功，待工作人员审核后到账~"}); 
            	this.dataJson = {};
        		this.withdraw = "未选择";
        	}else if( response.data.status == 400000 && this.dataJson.type == 2 ){
        		this.$store.commit('confirm',{show:true,text:response.data.message,call:function(){
        			window.location.href="mitchell://wxlogin";
        		}});
        		this.dataJson = {};
        		this.withdraw = "未选择";
        	}else{
        		this.$store.commit('alert',{show:true,text:response.data.message});
        		this.dataJson = {};
        		this.withdraw = "未选择";
        	}	   
        });                
    },
    addBankCard : function(){    	
    	this.$http.post('/Shop/User/addCard', this.addCardJson,{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){
            	this.$store.commit('alert',{show:true,text:response.data.message}); 
            	this.cardJson.unshift(this.addCardJson);       		
            	this.showJson.is_mask = 0;
            	this.showJson.is_bank = 0;
	    		this.showJson.is_wechat = 0;
	    		this.showJson.is_alipay = 0;
        	}else{
        		this.$store.commit('alert',{show:true,text:response.data.message});
        	}	   
        });
    },
    selmode : function(type){
    	if( type == "open" ){
    		this.is_sel = 1;
    		this.showJson.is_mask = 1;
    	}else{
    		this.is_sel = 0;
    		this.showJson.is_mask = 0;
    		this.showJson.is_bank = 0;
    		this.showJson.is_wechat = 0;
    		this.showJson.is_alipay = 0;
    		if( !this.dataJson.account || !this.dataJson.username){
    			this.withdraw = "未选择";
    		}
    	}
    },
    seldrawalType : function(type){
    	this.is_type = type;
    	this.is_sel = 0;
    	this.dataJson = {amount:this.dataJson.amount};
    	switch (type) {
    		case 'bank' : 
    			this.showJson.is_mask = 0;
    			this.dataJson['type'] = 1;
    			var index = event.target.value;
    			if( index == -1 ){
    				this.withdraw = '未选择';
    			}else{
	    			this.withdraw = this.cardJson[index].accounts;
	    			this.dataJson['account'] = this.cardJson[index].card;
	    			this.dataJson['username'] = this.cardJson[index].username;
    			}
    		break;
    		case 'wechat' : 
    			this.showJson.is_wechat = 1;
    			this.dataJson['type'] = 2;
    			this.withdraw = "提现到微信";
    		break;
    		case 'alipay' : 
    			this.showJson.is_alipay = 1;
    			this.dataJson['type'] = 3;
    			this.withdraw = "提现到支付宝";
    		break;
    		case 'add' : 
    			this.showJson.is_bank = 1;
    			this.dataJson['type'] = 1;
    			this.withdraw = "未选择";
    		break;
    	}
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

