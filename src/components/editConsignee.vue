<template>
  	<div class="content" id="Jreworp">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">编辑地址</h1>
			<span class="mail" @click="editConsignee">保存</span>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li>
						<a href="javascript:;">
							<span>收货人</span>
							<i></i>
							<input type="text" name="" v-model="dataJson.consignee">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>联系电话</span>
							<i></i>
							<input type="text" name="" v-model="dataJson.telephone">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>地址</span>
							<i></i>
							<input type="text" name="" readonly="readonly" id="JLAreaclick" :value="[province_name,city_name,county_name]">
						</a>
						<input id="JAreavalue"     type="hidden" name="" readonly="" >
	    				<input id="province"    type="hidden" name="province">
	    				<input id="city"        type="hidden" name="city">
	    				<input id="county"      type="hidden" name="county">
					</li>
					<li>
						<a href="javascript:;">
							<span>详细地址</span>
							<i></i>
							<input type="text" name="" v-model="dataJson.address">
						</a>
					</li>
					<li class="pli">
						<a href="javascript:;">
							<span style="padding-left:0;">设置为默认地址</span>
							<em class="set" :class="{on : is_default == 1}" @click="setDefalut"></em>
						</a>
					</li>
				</ul>
			</div>
		</div>
  	</div>
</template>
<script>
import {} from '../assets/js/LArea.js';

export default {

  data () {
    return {
      dataJson : {},
      province_name : '',
      city_name : '',
      county_name : '',
      is_default : 0
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
    this.apifun();
  },
  methods: {
  	getData(){
  		this.$http.post('/Shop/Consignee/getConsignee', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){
    		if( response.data.status == "200000" ){
	    		this.dataJson = response.data.data.info;	
	    		this.province_name = response.data.data.info.province_name;
	    		this.city_name = response.data.data.info.city_name;
	    		this.county_name = response.data.data.info.county_name;    		         			
    		}	
        });
  	},
    editConsignee(){         
    	this.$http.post('/Shop/Consignee/editConsignee', this.dataJson,{emulateJSON:true}).then(function(response){
    		if( response.data.status == "200000" ){	    		
	        	this.$store.commit('alert',{show:true,text:response.data.message}); 
	        	this.$router.push('/consigneeList');   			
    		}	
        });
    },
    setDefalut : function(){
    	if( this.is_default == 0 ){
    		this.is_default = 1;
    		this.dataJson['is_default'] = 1;
    	}else{
    		this.is_default = 0;
    		this.dataJson['is_default'] = 0;
    	}
    },
    apifun(){
    	// 初始化所在地信息
 		var that = this;
		var LA = new LArea();
		LA.init({
			'trigger': '#JLAreaclick', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
			'valueTo': '#JAreavalue', //选择完毕后id属性输出到该位置
			'keys': {
				id: 'id',
				name: 'name'
			},
			//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
			'type': 1, //数据源类型
			// 'data': LAreaData ,  //数据源
			'callback': function() {
				that.dataJson['province'] = document.getElementById('province').value
		        that.dataJson['city'] = document.getElementById('city').value        
		        that.dataJson['county'] = document.getElementById('county').value		        
		    }
		});
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>
<style>
  @import '../assets/css/LArea.css';
</style>
