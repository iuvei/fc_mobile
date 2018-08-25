<template>
	<div class="bindBank">
		<yd-navbar title="新增银行卡">
			<!-- <router-link to="/loginLog" slot="left"> -->
				<yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
			<!-- </router-link> -->
		</yd-navbar>
		<div class="from">
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left" >开户人：</span>
					<!--<yd-input slot="right"  ref="input9" required regex="mobile" v-model="input9" placeholder="请输入银行卡号" :show-required-icon = "true"></yd-input>-->
					<input slot="right" type="number" placeholder="请输入银行卡号" required  :show-required-icon="true" />
				</yd-cell-item>
				<yd-cell-item arrow type="label">
					<span slot="left">开户银行：</span>
					<select slot="right">
						<option value="">请选择</option>
						<option value="1">男</option>
						<option value="2">女</option>
						<option value="3">未知</option>
					</select>
				</yd-cell-item>
				<yd-cell-item arrow type="label">
					<span slot="left">开户地址：</span>
					<select slot="right">
						<option value="">请选择</option>
						<option value="1">男</option>
						<option value="2">女</option>
						<option value="3">未知</option>
					</select>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left" >银行卡号：</span>
					<yd-input slot="right"  ref="input9" required regex="mobile" v-model="input9" placeholder="请输入银行卡号" :show-required-icon = "true"></yd-input>
					<!--<input slot="right" type="number" placeholder="请输入银行卡号" required  :show-required-icon="true" />-->
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">确认卡号：</span>
					<yd-input slot="right"  ref="input9" required regex="mobile" v-model="input9" placeholder="请输入银行卡号" :show-required-icon = "true"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">银行支行：</span>
					<yd-input slot="right" type="number" placeholder="" />
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">支行行号：</span>
					<yd-input slot="right" type="number" placeholder="" />
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">分行名称：</span>
					<yd-input slot="right" type="number" placeholder="" />
				</yd-cell-item>
				 <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="input9" ref="input9" required regex="mobile" placeholder="请输入手机号码"></yd-input>
               </yd-cell-item>
				<yd-cell-item>
					<span slot="left">资金密码：</span>
					<input slot="right" type="number" placeholder="请输入密码">
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">首张卡号：</span>
					<input slot="right" type="number" placeholder="请输入首张银行卡号">
				</yd-cell-item>
			</yd-cell-group>
			<yd-button size="large" type="danger">绑定</yd-button>
			<yd-button size="large" bgcolor="#ccc" type="danger">取消</yd-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				input9:''
			}
		},
	}
</script>

<style lang="less">
	.bindBank {
		.yd-navbar{
			background: linear-gradient(0,#272a32,#4b4e58)!important;
			color: #FFFFFF;
			.yd-back-icon:before,.yd-navbar-center-title{
				color: #FFFFFF !important;
			}
		}
		.from {
			padding-top: 1rem;
			.yd-btn-block {
				margin-top: 0.2rem;
			}
		}
	}
</style>