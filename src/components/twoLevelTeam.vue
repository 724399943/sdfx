<template>
  	<div class="content" id="Jcontent">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">我的团队</h1>
		</header>
		<div class="main">
			<div class="bonusWrap">				
				<div class="bonusMsg">
					<table>
						<tr class="title">
							<th>用户昵称</th>
							<th>昨日业绩</th>
							<th>历史业绩</th>
						</tr>
						<tr v-for="(item,index) in userList">
							<td>{{item.nickname}}</td>
							<td>{{item.last}}</td>
							<td>{{item.performance}}</td>
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
      userList : [],
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
	    	this.$http.post('/Shop/User/nextTeam', {id:this.$route.query.id,page:this.page},{emulateJSON:true}).then(function(response){
	    		this.hasAjax = 0;
	    		if( this.page == 0 ){
	            	this.userList = response.data.data.userList;	
	            	this.page++;  	    			
	    		}else{
	    			if( response.data.data.userList == 0 ){
	    				this.hasAjax = 1;
	    			}else{
	    				this.page++;
	    				this.userList = this.userList.concat(response.data.data.userList);
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
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

