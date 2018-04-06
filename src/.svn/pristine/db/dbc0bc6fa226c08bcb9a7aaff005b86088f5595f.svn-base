<template>
  	<div class="content" id="JarticleList">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">{{group_name}}</h1>
      <router-link to="/messageIndex">
  			<i></i>
  			<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
      </router-link>
		</header>
		<div class="main">
			<div class="busiInt_cont">
				<!-- 文字 -->
				<ul>
					<li class="prolist-item" v-for="(item,index) in list">
						<router-link :to="{path:'/articleDetail',query:{id:item.id}}" class="">
							<div class="p-img-wrap">
								<img :src="item.image">
							</div>
							<p class="pro-detail-t db-overflow">{{item.title}}</p>
							<p class="pro-detail-t pdt">{{item.introduction}}</p>
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
      list : [],
      group_name : '',
      hasAjax:0,
      page : 1
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});		
    this.getData();
    this.getSign();
  },  
  mounted(){
      this.loadMore();
  },
  methods: {
    getData(){
        if( this.hasAjax == 0 ){
          this.hasAjax = 1;
        	this.$http.post('/Shop/Article/getArtGroup', {sign:this.$route.query.sign,page:this.page},{emulateJSON:true}).then(function(response){ 
                this.hasAjax = 0;
                this.group_name = response.data.data.detail.group_name;
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
          this.$store.commit('scrollFun',{dom:'JarticleList',auto:true,'bottomCall':function(){
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

