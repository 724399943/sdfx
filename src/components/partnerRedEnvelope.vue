<template>
  	<div class="content" id="partnerRedEnvelope">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">合伙人红包</h1>
			<router-link to="/explain"><span class="mail">奖金会员说明</span></router-link>
		</header>
		<div class="main">
			<div class="bonusWrap">
				<div class="p_cen_top">
					<div class="headbox">
						<div class="h_img">
							<img :src="userInfo.headimgurl">
							<div class="txtBox"><em>{{userInfo.level_name}}</em></div>
						</div>
						<p class="name">{{userInfo.nickname}}</p>
						<p class="msg">
							<span>合伙人封顶红包：{{userInfo.top_red}}</span>
						</p>
					</div>
				</div>
				<div class="bonusMsg">
					<table>
						<tr class="title">
							<th>时间</th>
							<th>平台营业额</th>
							<th>拆分份数</th>
							<th>获得奖金</th>
						</tr>
						<tr v-for="(item,index) in list">
							<td>{{item.add_time | time}}</td>
							<td>{{item.turnover}}</td>
							<td>{{item.split_number}}</td>
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
      userInfo : {},
      hasAjax:0,
	  page : 1
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
    this.getList();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
  	this.loadMore();
  },
  methods: {
    getData(){
    	this.$http.post('/Shop/User/redLog', {},{emulateJSON:true}).then(function(response){
        	if( response.data.status == "200000" ){	
            	this.userInfo = response.data.data.userInfo;  
        	}	   
        });
    },
    getList(){
    	if( this.hasAjax == 0 ){
  			this.hasAjax = 1;
	    	this.$http.post('/Shop/User/redLog', {page:this.page},{emulateJSON:true}).then(function(response){
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
        this.$store.commit('scrollFun',{dom:'partnerRedEnvelope',auto:true,bottomCall:function(){
        	that.getList();
        }})
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

