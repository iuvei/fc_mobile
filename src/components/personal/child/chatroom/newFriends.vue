<template>
    <div id="newFriends">
         <yd-navbar title="新朋友">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>                
        </yd-navbar>
        <div class="container">
            <div class="img" v-if="allRecord.length===0">
                <img src="../../../../../static/img/chartroom/newFriends.png" alt="">
                <p>暂无好友申请</p>
            </div>
            <div v-else>
               <MessageBox :readOnly="item.status!=='1'?true:false" @click.native.prevent="query(item)" v-for="(item,index) in allRecord" :key="index" mode="2" :name="item.fromAccount" :time="global._timeFormate(item.createTime,'1')">
                    <img slot="img" :src="'../../../../../static/img/chartroom/member.png'">
                    <p slot="tips">{{item.remark}}</p>
                    <Box v-if="item.status==='1'" @click.native.stop="reply('2',item.applyRecordId)" slot="button" width="100%" height="100%" backgroundColor="#d91d36" colorEffect="#a52c3c">
                        <span style="margin:auto;color:#fff">同意</span>
                    </Box>
                    <div style="width:100%;height:100%;border-radius:4px;display:flex;justify-content:flex-end;align-items:center;" v-else slot="button">
                        <span style="color:#4b4b4b"> {{item.status==='2'?'已同意':item.status==='3'?'已拒绝':'已忽略'}}</span>   
                    </div>
               </MessageBox> 
            </div>          
        </div>
        <yd-popup v-model="show" position="center" width="85%">
            <div style="background-color:#fff;">               
                <div class="user_container">
                    <p style="text-align:center">好友申请</p>
                   <yd-cell-item>
                      <img slot="icon" :src="'../../../../../static/img/chartroom/member.png'">
                      <span slot="left">{{account}}</span>
                      <span slot="right"></span>
                   </yd-cell-item>
                   <yd-cell-item>
                      <span slot="left">备注：</span>   
                      <p class="user_remark" slot="right">{{remark}}</p>             
                   </yd-cell-item>
                  <div class="user_button">
                      <Box width="1.8rem" height=".7rem" @click.native="reply('3',accountId)" backgroundColor="#dbdbdb" colorEffect="#b9b8b8">
                          <span>拒绝</span>
                      </Box>
                      <div @click="reply('4',accountId)" class="ignore">忽略</div>
                      <Box @click.native="reply('2',accountId)" width="1.8rem" height=".7rem" backgroundColor="#d91d36" colorEffect="#a52c3c">
                          <span style="color:#fff">同意</span>
                      </Box>
                  </div>
                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import MessageBox from "../../../common/messageBox.vue";
import Box from "../../../common/box.vue";
export default {
    data(){
        return{
            show:false,
            account:'',
            remark:'',
            accountId:''
        }
    },
    created(){
         this.queryApplyRecordAll();
         console.log(this.allRecord)
    },
    methods:{
        ...mapActions('chart',['replyApply','queryApplyRecord','queryApplyRecordAll']),
        query(item){        
            this.account=item.fromAccount;
            this.accountId=item.applyRecordId;
            this.remark=item.remark;
            if(item.status==='1'){
                 this.show=true;
            }
        },
        //申请回复
        reply(status,accountId){    
                this.replyApply({
                applyRecordId:accountId,
                status:status
            }).then(res=>{
                console.log(res);
                if(res.code===0){
                    this.show=false;
                    this.queryApplyRecordAll();
                }else if(res.code===111){
                     this.$dialog.toast({ mes: res.msg, timeout: 1000 });
                }
            })          
        }
    },
    components:{
        MessageBox,
        Box
    },
    computed:{
          ...mapState("chart", ['applyRecord','allRecord'])
    }
    
}
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#newFriends{
    .init;
    padding-bottom: 0;
    .container{
        height:100%;
        overflow: auto;
         -webkit-overflow-scrolling:touch;
        .img{
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 3rem;
            right:0;
            left:0;
            margin: auto;
            text-align: center;
            p{
                color: #bfbfbf;
                margin-top: .2rem;
            }
        }
        #_Box{
            border-radius:4px;
        }
    }
    .user_container{
        padding: .2rem 0;
        .user_remark{
            width: 100%;
            text-align: left;
            overflow-y: auto;
        }
       .user_button{
           .my-display(space-between,center);
           margin-top:  .2rem;
           padding: 0 0.24rem;
           #_Box{
               .my-display(center,center);
                 border-radius:4px;
           }
           .ignore{
               padding:.1rem .2rem;
           }

       }
    }
}

</style>


