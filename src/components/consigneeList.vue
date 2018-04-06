<template>
  	<div class="content" id="JConsigneeList">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">我的收货地址</h1>
			<router-link to="/messageIndex">
				<i></i>
				<span class="dot" v-if="$store.state.messageCount != 0"><em>{{$store.state.messageCount}}</em></span>
			</router-link>
		</header>
		<div class="main">
			<div class="myaddress_m">
				<div class="add_book_cont" v-for="(item,index) in list">
					<div class="add_book_box">
						<div class="g_r_add_cont">
							<div class="g_rece_line">
								<span>收货人：{{item.consignee}}</span> 
								<p>{{item.telephone}}</p>
							</div> 
							<div class="g_rece_address">
								<span>收货地址：</span> 
								<p>{{item.province_name}} {{item.city_name}} {{item.county_name}} {{item.address}}</p> 
							</div>
						</div> 
						<div class="add_book_operate">
							<div class="a_b_operate r_line">
								<em class="add" :class="{on : item.is_default == 1}" @click="setToDefault(item.id)"></em> 
								<span id="Jdefau">设为默认地址</span>
							</div> 
							<router-link :to="{path:'/editConsignee',query:{id:item.id}}">
								<div class="a_b_operate r_line">
									<em class="oedit"></em> 
									<span>编辑</span>
								</div>
							</router-link> 
							<div class="a_b_operate" @click="delConsignee(item.id)">
								<em class="odel"></em> 
								<span>删除</span>
							</div>
						</div>
					</div>
				</div>				
				<router-link to="/newAddress" class="addBtn">新增地址</router-link>
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
	  		this.$http.post('/Shop/Consignee/userConsignee', {page:this.page},{emulateJSON:true}).then(function(response){	
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
        this.$store.commit('scrollFun',{dom:'JConsigneeList',auto:true,bottomCall:function(){
        	that.getData();
        }})
    },
    setToDefault : function(id){
    	this.$http.post('/Shop/Consignee/setToDefault', {id:id},{emulateJSON:true}).then(function(response){
    		if( response.data.status == "200000" ){	    		     
	        	this.$store.commit('alert',{show:true,text:response.data.message});
	        	setTimeout(function(){
	        		window.location.href = window.location.href;    			
	        	},1500)
    		}	
        });
    },
    delConsignee : function(id){
    	this.$http.post('/Shop/Consignee/delConsignee', {id:id},{emulateJSON:true}).then(function(response){
    		if( response.data.status == "200000" ){	    		     
	        	this.$store.commit('alert',{show:true,text:response.data.message});
	        	setTimeout(function(){
	        		window.location.href = window.location.href;    			
	        	},1500)
    		}	
        });
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

