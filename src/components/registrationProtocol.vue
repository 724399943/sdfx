<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:;" @click="routeBack"></a>
			<h1 class="y-confirm-order-h1">注册协议</h1>
		</header>
		<div class="main">
			<div class="agreementWrap" v-html="content">
				  
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      content : ''
    }
  },
  created(){
    this.$store.commit('loading',{show:true});
    this.getData();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
     getData : function(){
        this.$http.post('/Shop/Article/getSignData', {sign:'userAgreement'},{emulateJSON:true}).then(function(response){ 
            if( response.data.status == '200000' ){
              this.content = response.data.data.detail.content;         
            }
        });
     },
    routeBack : function(){
      this.$router.go(-1);
    }  
  }

}
</script>

