<template>
  	<div class="content" id="Jcontent">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">购买评价</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="goods_assess">				
				<div class="eva_list_box" v-for="(item,index) in list">
					<div class="user_eva">
						<div class="eva_top">
							<div class="eva_user">
								<img :src="item.headimgurl">
								<span>{{item.nickname}}</span>
							</div>
							<div class="eva_star_cont">
								<div class="eva_star_box" :class="{on : item.star>=1}"></div>
								<div class="eva_star_box" :class="{on : item.star>=2}"></div>
								<div class="eva_star_box" :class="{on : item.star>=3}"></div>
								<div class="eva_star_box" :class="{on : item.star>=4}"></div>
								<div class="eva_star_box" :class="{on : item.star>=5}"></div>
							</div>
						</div>
						<p>{{item.contain}}</p>
						<div class="eva_goodsimg">
							<div class="imgbox" v-for="(it,index) in item.images">
								<img :src="it" @click="enlargeImg('it','on')">
							</div>							
						</div>
						<div class="eva_goods_cont">
							<span>{{item.add_time | time}}</span>	
							<span>{{item.attr_list}}</span>						
						</div>
					</div>
					<div class="business_reply" v-if="item.is_save == 1">
						<p><span>商家回复：</span>{{item.message_reply}}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 弹窗 -->
		<div class="mask" :class="{fadeIn : show == true,fadeOut : show == false}" @click="enlargeImg('close')"></div>
		<!-- <div class="bigevaimg" v-if="show == true"> -->
			<div class="msevaimg" v-show="show == true">
				<img :src="bigImgUrl">
			</div>
		<!-- </div> -->
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : [],
      hasAjax:0,
	  page : 1,
	  show : false,
	  bigImgUrl : ''
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
	    	this.$http.post('/Shop/Goods/goodsComment', {goods_id:this.$route.query.goods_id,page:this.page},{emulateJSON:true}).then(function(response){	 
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
    enlargeImg : function(url,type){
    	if( type == 'on' ){
    		this.show = true;
    		this.bigImgUrl = url;
    	}else{
    		this.show = false;
    	}
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

