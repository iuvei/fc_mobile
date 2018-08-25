<template>
  <div class="newBankCard">
    <yd-navbar title="新增银行卡">
      <router-link to="/bankCard" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="newBankCard_nav">
      <yd-cell-group>
        <yd-cell-item arrow type="label">
          <span slot="left">开户银行：</span>
          <select slot="right" v-model="bankName" placeholder="">
            <option value="">请选择银行</option>
            <option :key="item.bankNo" :value="item.id" v-for="item in companyBankAccountList">{{item.bankName}}</option>
          </select>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow>
          <span slot="left">开户地址：</span>
          <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly placeholder="请选择地址">
        </yd-cell-item>
        <yd-cityselect  v-model="show2" ref="cityselectDemo" :callback="result2" :items="district" provance="北京" city="朝阳区"></yd-cityselect>
      </yd-cell-group>
      <yd-cell-group v-if="show2 == false">
        <yd-cell-item>
          <span slot="left">银行卡号：</span>
          <yd-input slot="right" v-model="input_bank_numI" required regex="/^[0-9]{16,19}$/" placeholder="请输入银行卡号"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="show2 == false" >
        <yd-cell-item>
          <span slot="left">确认卡号：</span>
          <yd-input slot="right" v-model="input_bank_numII" required   placeholder="已输入0位"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="show2 == false">
        <yd-cell-item>
          <span slot="left">资金密码：</span>
          <yd-input slot="right" v-model="input_pass" required regex="/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="show2 == false">
        <yd-cell-item>
          <span slot="left">电话号码：</span>
          <yd-input slot="right" v-model="input_phone" required regex="/^1(3|4|5|7|8)\d{9}$/" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="show2 == false">
        <yd-cell-item>
          <span slot="left">首张卡号：</span>
          <yd-input slot="right" v-model="input_faster_bank" required regex="/^[0-9]{16,19}$/" placeholder="请输入首张绑定的银行卡卡号"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <div style="height: 0.15rem"></div>
      <yd-button v-if="show2 == false" size="large" type="danger" bgcolor="#d91d36" color="#FFF" @click.native="_saveMemberOtherBank">绑定</yd-button>
      <yd-button v-if="show2 == false" size="large" bgcolor="#dcdcdc" color="#FFF" @click.native="_cancel" >取消</yd-button>
    </div>
    <div class="bankCard_ok" v-show="model3">
      <div>
        <img src="../../../../static/img/bankCard_ok.png" alt="">
        <button @click="model3 = false">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  import District from 'ydui-district/dist/jd_province_city_area_id';
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: '新增银行卡',
        companyBankAccountList:[],
        input_bank_numI: '',
        input_bank_numII: "",
        input_pass: "",
        input_faster_bank: "",
        input_phone:'',
        input6: '',
        show2: false,
        model2: '',
        district: District,
        bankName: '',
        model3: false
      }
    },
    created(){
     this.companyBankAccountList = this.memberIfBindList.data.companyBankAccountList;
      // console.log(this.companyBankAccountList)
    },
    computed:{
      ...mapState('home',[
        'memberIfBindList'
      ])
    },
    methods: {
      ...mapActions('home',[
        'saveMemberOtherBank'
      ]),
      ...mapMutations('home',[
        'saveMemberOtherBankList'
      ]),
      // 地址
      result2(ret) {
        this.model2 = ret.itemName1 + ' ' + ret.itemName2;
      },
      // 新增银行卡
      _saveMemberOtherBank(){
        let that = this;
        if(that.input_bank_numII != that.input_bank_numI){
          this.$dialog.alert({mes: "您输两次输入的银行卡号不一致，请重新输入！"});
        }else {
          let data = {};
          data.bankAccount = that.input_bank_numI;
          data.city = that.model2.substring(that.model2.indexOf(" "),that.model2.length);
          data.province = that.model2.substring(0,that.model2.indexOf(" "));
          data.phone = that.input_phone;
          data.tradePassword = hex_md5(that.input_pass);
          data.companyBankId = that.bankName ;
          data.firstBankAccount = that.input_faster_bank;
          this.saveMemberOtherBank(data).then( res => {
            if( res.code == 0){
              // this.$dialog.alert({mes: res.msg});
              that._cancel()
              that.model3 = true;
            }else if(res != 0){
              this.$dialog.alert({mes: res.msg});
            }
          })
        }
      },
      // 取消
      _cancel(){
        let that = this;
        that.input_bank_numI = '';
        that.input_bank_numII = '';
        that.input_pass = '';
        that.input_faster_bank = '';
        that.input_phone = '';
        that.model2 = ''
      },
      // 关闭弹框
      _model3(){
        this.model3 = false;
      }
    }
  }
</script>
<style>
  .newBankCard{
    height: 100%;
    background-color:#f5f5f5 ;
  }
  .newBankCard_nav{
    overflow: hidden;
    padding-top: 1.15rem;
    background: #f9f9f9;
    box-sizing: border-box;
    padding-left: 0.22rem;
    padding-right: 0.22rem;
  }
  .newBankCard .yd-navbar{
    background: #011935 !important;
  }
  .newBankCard .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .newBankCard .yd-navbar span{
    color: #ffffff !important;
  }
  .newBankCard_nav .yd-cell-box {
    margin-bottom: .15rem !important;
  }
  .newBankCard_nav .yd-cell:after{
    border: 0 !important;
  }
  .newBankCard_nav .yd-btn-block{
    margin-top: 0.25rem !important;
  }
  .bankCard_ok{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(70,70,70,0.5);
    z-index:9999;
  }
  .bankCard_ok div{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -50%;
    margin-left: -40%;
    width: 80%;
    height: 48%;
    background-color: #ffffff;
    border-radius: 0.1rem;
    /*padding: 0.1rem 0;*/
  }
  .bankCard_ok div img{
    border-radius: 0.1rem 0.1rem 0 0;
    height: 85%;
    width: 100%;
    border-bottom: 1px solid #7e7e7e;
  }
  .bankCard_ok div button{
    border-radius:0 0 0.1rem 0.1rem;
    display: inline-block;
    border: 0;
    height: 14%;
    width: 100%;
    text-align: center;
    line-height: 14%;
    font-size: 0.4rem;
    color: #e10101;
  }
</style>
