<template>
  	<div class="content" id="MyLip">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">我的分润</h1>
			<router-link to="/explain"><span class="mail">奖金会员说明</span></router-link>
		</header>
		<div class="main">
			<div class="bonusWrap">				
				<div class="bonusMsg">
					<table>
						<tr class="title">
							<th>时间</th>
							<th>类型</th>
							<th>贡献合伙人</th>
							<th>奖金</th>
						</tr>
						<tr v-for="(item,index) in list">
							<td>{{item.add_time | time}}</td>
							<td v-if="item.status == 1">新入会合伙人得公司入会感恩奖</td>
							<td v-else-if="item.status == 2">直推新合伙人入会推广奖励</td>
							<td v-else-if="item.status == 3">间接介绍合伙人入会的推广奖</td>
							<td v-else-if="item.status == 4">直推新合伙人入会合伙人友谊奖</td>
							<td v-else-if="item.status == 5">间接介绍合伙人入会的友谊奖</td>
							<td v-else-if="item.status == 6">二次消费公司感恩回馈奖</td>
							<td v-else-if="item.status == 7">直推新合伙人得二次消费推广奖励</td>
							<td v-else>间接介绍合伙得二次消费推广奖</td>
							<td>{{item.from_name}}</td>
							<td>{{item.amount}}</td>
						</tr>						
					</table>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : [],
      hasAjax:0,
	  page : 1
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
  	this.loadMore();
  },
  methods: {
    getData(){
    	if( this.hasAjax == 0 ){
  			this.hasAjax = 1;
	    	this.$http.post('/Shop/User/myFenrun', {page:this.page},{emulateJSON:true}).then(function(response){
	    		this.hasAjax = 0;
	    		if( this.page == 0 ){
	            	this.list = response.data.data.list;	
	            	this.page++;  	    			
	    		}else{
	    			if( response.data.data.list == 0 ){
	    				this.hasAjax = 1;
	    			}else{
	    				this.page++;
	    				this.list = this.list.concat(response.data.data.list);
	    			}
	    		}	   
	    		this.$store.commit('loading',{show:false});     	
	        });  		
  		}    	
    },
    loadMore(){	        
        var that = this;
        this.$store.commit('scrollFun',{dom:'MyLip',auto:true,bottomCall:function(){
        	that.getData();
        }})
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

