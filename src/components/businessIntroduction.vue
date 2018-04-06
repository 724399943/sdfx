<template>
  	<div class="content" id="JbusIntroduc">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">企业介绍</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="busiInt_top">
				<swiper auto height="200px" dots-position="center">
				    <template v-for="(it,index) in adimgList ">
				    	<swiper-item class="black" >
				    		<div class="bannerImg">
								<img  class="Sw-img" :src="it.image">
							</div>				    		
				    	</swiper-item>
				    </template>
				</swiper> 
				<div class="busiInt_tab">
					<a href="javascript:;" :class="{on : sign == 'art_introduce'}" @click="ontab('art_introduce')">企业介绍</a>
					<a href="javascript:;" :class="{on : sign == 'art_consult'}" @click="ontab('art_consult')">企业资讯</a>
					<a href="javascript:;" :class="{on : sign == 'art_video'}" @click="ontab('art_video')">企业视频</a>
				</div>
			</div>
			<div class="busiInt_cont">
				<!-- 文字 -->
				<ul v-if="sign == 'art_introduce' || sign == 'art_consult'">
					<li class="prolist-item" v-for="(item,index) in list">
						<router-link :to="{path:'/informationDetails',query:{id:item.id}}" class="">
							<div class="p-img-wrap">
								<img :src="item.image">
							</div>
							<p class="pro-detail-t db-overflow">{{item.title}}</p>
							<p class="pro-detail-t pdt">{{item.introduction}}</p>
						</router-link>
					</li>					
				</ul>
				<!-- 视频 -->
				<ul v-else-if="sign == 'art_video'">
					<li class="prolist_video" v-for="(item,index) in list">
						<div class="videoBox">                
                <video controls="controls" :src="item.image" :poster="item.background"></video>
            </div>
						<p class="videoP">{{item.title}}</p>
					</li>
				</ul>
			</div>
		</div>
  	</div>
</template>
<script>
import {Swiper,SwiperItem}from 'vux/src/components/swiper'

export default {

  data () {
    return {
      list : [],
      hasAjax:0,
      page : 1,
      sign : 'art_introduce',
      adimgList : []
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
	  this.getData();	  
	  this.getAdData();
    this.getSign();
  },
  components : {
	  	Swiper,
	    SwiperItem
  },
  mounted(){
      this.$store.commit('loading',{show:false});
      this.loadMore();
  },
  methods: {
    getData(){
      if( this.hasAjax == 0 ){
          this.hasAjax = 1;
        	this.$http.post('/Shop/Article/getArtGroup', {sign:this.sign,page:this.page},{emulateJSON:true}).then(function(response){
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
    getAdData : function(){
    	this.$http.post('/Shop/Public/getAdData', {sign:'index_banner_company'},{emulateJSON:true}).then(function(response){
  			if( response.data.status == "200000" ){
            	this.adimgList = response.data.data.adData;
  			}	   
        });
    },
    ontab : function(type){
    	this.sign = type;
    	this.list = [];
      this.hasAjax = 0;
      this.page = 1; 
    	this.getData();
    },
    loadMore(){
        var that = this;
        this.$store.commit('scrollFun',{dom:'JbusIntroduc',auto:true,bottomCall:function(){
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

