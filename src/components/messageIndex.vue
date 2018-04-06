<template>
  	<div class="content" id="MessageIndex">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">消息</h1>
		</header>
		<div class="main">
			<div class="news_wrap">
				<div class="system_news">
					<router-link to="/systemMessage">
						<div class="imgbox">
							<img src="../assets/images/system_ico.png">
						</div>
						<div class="s_new_m">
							<p>系统消息</p>
							<div class="nmt"><span>{{syscont}}</span><em>{{systime | time}}</em></div>
						</div>
					</router-link>
				</div>
				<div class="system_news">
					<a :href="'mitchell://chat?kefu=kefu_001'+'&tel='+tel">
						<div class="imgbox">
							<img src="../assets/images/customerSservice.png">
						</div>
						<div class="s_new_m">
							<p>平台客服</p>
							<div class="nmt"><span>最近的一条聊天记录</span><em>2017-01-09</em></div>
						</div>
					</a>
				</div>
				<div class="chat_news">
					<ul>
						<li v-for="(item,index) in messageList">
							<router-link to="/systemMessage" v-if="item.message_type == 0">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</router-link>
							<a href="javascript:;" v-else-if="item.message_type == 1">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</a>
							<a href="javascript:;" v-else-if="item.message_type == 2">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</a>
							<router-link to="/myTeam" v-else-if="item.message_type == 3 || item.message_type == 4">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</router-link>
							<router-link :to="{path:'/orderDetail',query:{order_sn:item.order_sn}}" v-else-if="item.message_type == 5 || item.message_type == 8 || item.message_type == 9">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</router-link>
							<router-link to="/myWallet" v-else-if="item.message_type == 6">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</router-link>
							<a :href="'mitchell://chat?kefu=kefu_001'+'&tel='+tel" v-else-if="item.message_type == 7">
								<div class="cnews">								
									<div class="s_new_m">
										<p class="stt"><span>{{item.title}}</span><em>{{item.add_time | time}}</em></p>
										<p class="nmt">{{item.content}}</p>
									</div>
								</div>
							</a>
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
      systemMsg : [],
      syscont : '',
      systime : '',
      messageList : [],
      hasAjax:0,
      page : 1,
      tel : ''
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:"加载中..."});
    this.loadSystemMsg();
    this.loadMessage();
    this.cancelSign();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
    this.loadMore();
  },
  methods: {
  	loadSystemMsg(){
  		this.$http.post('/Shop/Message/systemsMessage', {},{emulateJSON:true}).then(function(response){
  			if( response.data.status == "200000" ){
            	this.systemMsg = response.data.data.messageList;
            	if( this.systemMsg.length > 0 ){
            		this.syscont = this.systemMsg[0].content;
            		this.systime = this.systemMsg[0].add_time;
            	}
            	this.tel = response.data.data.telphone;
  			}	   
        });
  	},
    loadMessage(){
    	if( this.hasAjax == 0 ){
    		this.hasAjax = 1;
	    	this.$http.post('/Shop/Message/index', {page:this.page},{emulateJSON:true}).then(function(response){
	    		this.hasAjax = 0;
	    		if( this.page == 0 ){
	    			this.messageList = response.data.data.messageList;
	    			this.page++;
	    		}else{
	    			if( response.data.data.messageList.length == 0 ){
	    				this.hasAjax = 1;
	    			}else{
	    				this.page++;
	    				this.messageList = this.messageList.concat(response.data.data.messageList);
	    			}
	    		}
	        	this.$store.commit('loading',{show:false});	   
	        });
    	}
    },
    loadMore(){	        
        var that = this;
        this.$store.commit('scrollFun',{dom:'MessageIndex',auto:true,bottomCall:function(){
        	that.getGoodsList();
        }})
    },
    cancelSign : function(){
    	this.$http.post('/Shop/User/cancelSign', {},{emulateJSON:true}).then(function(response){
        });
    },
    routeBack : function(){
      this.$router.go(-1);
    }
  }

}
</script>

