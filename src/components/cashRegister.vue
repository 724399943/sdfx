<template>
  	<div class="content" id="Jcontent">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">提现记录</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="recordWrap">
				<div class="set_d_list">
					<ul>
						<li v-for="(item,index) in list">
							<div class="lf">
								<p class="tt">提现{{item.amount}}元</p>
								<p class="time">{{item.add_time | time}}</p>
							</div>
							<span v-if="item.status == 0">处理中</span>
							<span class="success" v-else-if="item.status == 1">成功</span>
							<span class="fail" v-else>失败</span>
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
      list : [],
      hasAjax:0,
	  page : 1
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.getData();
    this.getSign();
  },
  mounted(){
  	  this.$store.commit('loading',{show:false});
      this.loadMore();
  },
  methods: {
    getData(){
  		if( this.hasAjax == 0 ){
  			this.hasAjax = 1;
	  		this.$http.post('/Shop/Testing/withdrawList', {page:this.page},{emulateJSON:true}).then(function(response){
	  			this.hasAjax = 0;
	  			if( this.page == 0 ){
	  				this.list = response.data.data.list;
	  				this.page++;
	  			}else{
	  				if( response.data.data.list.length == 0 ){
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
        this.$store.commit('scrollFun',{dom:'Jcontent',auto:true,bottomCall:function(){
	        	that.getData();
	    }})             
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

