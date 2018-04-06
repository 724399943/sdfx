<template>
  	<div class="content">
  		<header class="head">
  			<div class="search_cate">
  				<router-link to="/search">
	  				<span class="ser"></span>
	  				<input type="text" name="" placeholder="请输入搜索产品">
	  				<span class="scanl">X</span>
  				</router-link>
  			</div>
  			<a href="javascript:;" @click="routeBack"><span class="cancel">取消</span></a>
  		</header>
		<div class="main">
			<div class="nuu-f0f0f5 clearfix" id="content">
	            <div class="con-fl-nav diyScroll">
	                <ul class="all-class">
	                    <li  v-for="(item,index) in categoryList" :class="{on : selNum == parseInt(index)}" @click="chooseFun(index)">
	                        <a href="javascript:;">
	                            {{item.category_name}}
	                        </a>
	                    </li>	               
	                </ul>
	            </div>
	            <div class="con-fr-nav diyScroll" id="childCate">
	                <div class="onebox">
	                    <div class="tabbox">
                      <template v-for="(it,index) in childCategory">
	                        <router-link :to="{path:'goodsList',query:{catid:it.id}}" >
	                            <div class="img">
	                                <div class="ab">
	                                    <img :src="it.app_icon"/>
	                                </div>
	                            </div>
	                            <p>{{it.category_name}}</p>
	                        </router-link>	                                                                      
                      </template>
	                    </div>
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
      categoryList : [],
      childCategory : [],
      selNum : 0
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData : function(){
    	this.$http.post('/Shop/Category/getCategoryList', {bb:'dd',t:'ddsd'},{emulateJSON:true}).then(function(response){
  			if( response.data.status == "200000" ){
            	this.categoryList = response.data.data.categoryList;
            	this.chooseFun(0);
  			}	   
        });
    },
    chooseFun : function(index){
    	this.childCategory = this.categoryList[index].childCategory;
    	this.selNum = index;
    	var childCate = document.getElementById('childCate');
    	childCate.scrollTop = 0;
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

