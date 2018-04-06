import Vue from 'vue'
import Router from 'vue-router'
//企业介绍
import businessIntroduction from '@/components/businessIntroduction'
// 资讯列表
import informationList from '@/components/informationList'
// 资讯详情
import informationDetails from '@/components/informationDetails'
// 文章
import articleList from '@/components/articleList'
// 文章详情
import articleDetail from '@/components/articleDetail'
// 防伪查询
import securityCheck from '@/components/securityCheck'
// 首页
import index from '@/components/index'
// banner详情
import bannerDetail from '@/components/bannerDetail'
// 搜素
import search from '@/components/search'
// 最近浏览
import recentBrowse from '@/components/recentBrowse'
// 商品列表
import goodsList from '@/components/goodsList'
// 商品详情
import goodsDetail from '@/components/goodsDetail'
// 评价列表
import goodsComment from '@/components/goodsComment'
// 专场
import special from '@/components/special'
// 购物车
import shoppingCart from '@/components/shoppingCart'
// 购物车-编辑
import editShoppingCart from '@/components/editShoppingCart'
// 确认订单
import orderInfo from '@/components/orderInfo'
// 支付
import payment from '@/components/payment'
// 支付成功
import paySuccess from '@/components/paySuccess'
// 商品分类
import categoryList from '@/components/categoryList'
// 消息主页
import messageIndex from '@/components/messageIndex'
// 系统消息
import systemMessage from '@/components/systemMessage'
// 消息详情
import messageDetail from '@/components/messageDetail'
// 咨询
import consultation from '@/components/consultation'
// 个人资料设置
import userInfo from '@/components/userInfo'
// 更换绑定手机
import replaceBindPhone from '@/components/replaceBindPhone'
// 绑定新手机
import bindNewPhone from '@/components/bindNewPhone'
// 我的订单
import orderList from '@/components/orderList'
// 订单详情
import orderDetail from '@/components/orderDetail'
// 选择商品
import selectGoods from '@/components/selectGoods'
// 物流信息
import logisticsInformation from '@/components/logisticsInformation'
// 评价
import evaluate from '@/components/evaluate'
// 查看评价
import viewEvaluation from '@/components/viewEvaluation'
// 申请售后
import applyForAfterSale from '@/components/applyForAfterSale'
// 查看售后
import viewAftermarket from '@/components/viewAftermarket'
// 我的地址薄
import consigneeList from '@/components/consigneeList'
// 新增地址
import newAddress from '@/components/newAddress'
// 编辑地址
import editConsignee from '@/components/editConsignee'
// 我的收藏
import collectList from '@/components/collectList'
// 我的邀请码
import invitationCode from '@/components/invitationCode'
// 我的钱包
import myWallet from '@/components/myWallet'
// 充值
import recharge from '@/components/recharge'
// 对碰奖金
import onTheBonus from '@/components/onTheBonus'
// 管理奖金
import managementBonus from '@/components/managementBonus'
// 我的分润
import myLip from '@/components/myLip'
// 合伙人红包
import partnerRedEnvelope from '@/components/partnerRedEnvelope'
// 我的团队
import myTeam from '@/components/myTeam'
// 二级团队
import twoLevelTeam from '@/components/twoLevelTeam'
// 提现
import withdrawals from '@/components/withdrawals'
// 提现记录
import cashRegister from '@/components/cashRegister'
// 收支明细
import moneyLog from '@/components/moneyLog'
// 奖金和会员等级说明
import explain from '@/components/explain'
// 设置
import setUp from '@/components/setUp'
// 帮助中心
import helpCenter from '@/components/helpCenter'
// 帮助中心详情
import helpCenterDetail from '@/components/helpCenterDetail'
// 用户协议/关于我们
import signArticle from '@/components/signArticle'
// 意见反馈
import feedback from '@/components/feedback'
// 登录
import login from '@/components/login'
// 注册
import register from '@/components/register'
// 注册协议
import registrationProtocol from '@/components/registrationProtocol'
// 第三方注册
import thirdPartyRegister from '@/components/thirdPartyRegister'
// 忘记密码
import forgotPassword from '@/components/forgotPassword'
// 个人中心
import personalCenter from '@/components/personalCenter'
// 招商加盟详情
import groupDetail from '@/components/groupDetail'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    //首页
    {
      path: '/',
      name: 'index',
      components: {
        default: index
      }
    },
    //企业介绍
    {
      path: '/businessIntroduction',
      name: 'businessIntroduction',
      components: {
        default: businessIntroduction
      }
    },
    //资讯列表
    {
      path: '/informationList',
      name: 'informationList',
      components: {
        default: informationList
      }
    },
    //资讯详情
    {
      path: '/informationDetails',
      name: 'informationDetails',
      components: {
        default: informationDetails
      }
    },   
    //文章
    {
      path: '/articleList',
      name: 'articleList',
      components: {
        default: articleList
      }
    },   
    //文章详情
    {
      path: '/articleDetail',
      name: 'articleDetail',
      components: {
        default: articleDetail
      }
    },
    //防伪查询
    {
      path: '/securityCheck',
      name: 'securityCheck',
      components: {
        default: securityCheck
      }
    },
    //banner详情
    {
      path: '/bannerDetail',
      name: 'bannerDetail',
      components: {
        default: bannerDetail
      }
    },
    //搜素
    {
      path: '/search',
      name: 'search',
      components: {
        default: search
      }
    },
    //最近浏览
    {
      path: '/recentBrowse',
      name: 'recentBrowse',
      components: {
        default: recentBrowse
      }
    },
    //商品列表
    {
      path: '/goodsList',
      name: 'goodsList',
      components: {
        default: goodsList
      }
    },
    //商品详情
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      components: {
        default: goodsDetail
      }
    },
    //评价列表
    {
      path: '/goodsComment',
      name: 'goodsComment',
      components: {
        default: goodsComment
      }
    },
    //专场
    {
      path: '/special',
      name: 'special',
      components: {
        default: special
      }
    },
    //购物车
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      components: {
        default: shoppingCart
      }
    },
    //购物车-编辑
    {
      path: '/editShoppingCart',
      name: 'editShoppingCart',
      components: {
        default: editShoppingCart
      }
    },
    //确认订单
    {
      path: '/orderInfo',
      name: 'orderInfo',
      components: {
        default: orderInfo
      }
    },
    //支付
    {
      path: '/payment',
      name: 'payment',
      components: {
        default: payment
      }
    },
    //支付成功
    {
      path: '/paySuccess',
      name: 'paySuccess',
      components: {
        default: paySuccess
      }
    },
    //商品分类
    {
      path: '/categoryList',
      name: 'categoryList',
      components: {
        default: categoryList
      }
    },
    //消息主页
    {
      path: '/messageIndex',
      name: 'messageIndex',
      components: {
        default: messageIndex
      }
    },
    //系统消息
    {
      path: '/systemMessage',
      name: 'systemMessage',
      components: {
        default: systemMessage
      }
    },
    //消息详情
    {
      path: '/messageDetail',
      name: 'messageDetail',
      components: {
        default: messageDetail
      }
    },
    //咨询
    {
      path: '/consultation',
      name: 'consultation',
      components: {
        default: consultation
      }
    },
    //个人资料设置
    {
      path: '/userInfo',
      name: 'userInfo',
      components: {
        default: userInfo
      }
    },
    //更换绑定手机
    {
      path: '/replaceBindPhone',
      name: 'replaceBindPhone',
      components: {
        default: replaceBindPhone
      }
    },
    //绑定新手机
    {
      path: '/bindNewPhone',
      name: 'bindNewPhone',
      components: {
        default: bindNewPhone
      }
    },
    //我的订单
    {
      path: '/orderList',
      name: 'orderList',
      components: {
        default: orderList
      }
    },
    //订单详情
    {
      path: '/orderDetail',
      name: 'orderDetail',
      components: {
        default: orderDetail
      }
    },
    //选择商品
    {
      path: '/selectGoods',
      name: 'selectGoods',
      components: {
        default: selectGoods
      }
    },
    //物流信息
    {
      path: '/logisticsInformation',
      name: 'logisticsInformation',
      components: {
        default: logisticsInformation
      }
    },
    //评价
    {
      path: '/evaluate',
      name: 'evaluate',
      components: {
        default: evaluate
      }
    },
    //查看评价
    {
      path: '/viewEvaluation',
      name: 'viewEvaluation',
      components: {
        default: viewEvaluation
      }
    },
    //申请售后
    {
      path: '/applyForAfterSale',
      name: 'applyForAfterSale',
      components: {
        default: applyForAfterSale
      }
    },
    //查看售后
    {
      path: '/viewAftermarket',
      name: 'viewAftermarket',
      components: {
        default: viewAftermarket
      }
    },
    //我的地址簿
    {
      path: '/consigneeList',
      name: 'consigneeList',
      components: {
        default: consigneeList
      }
    },
    //新增地址
    {
      path: '/newAddress',
      name: 'newAddress',
      components: {
        default: newAddress
      }
    },
    //编辑地址
    {
      path: '/editConsignee',
      name: 'editConsignee',
      components: {
        default: editConsignee
      }
    },
    //我的收藏
    {
      path: '/collectList',
      name: 'collectList',
      components: {
        default: collectList
      }
    },
    //我的邀请码
    {
      path: '/invitationCode',
      name: 'invitationCode',
      components: {
        default: invitationCode
      }
    },
    //我的钱包
    {
      path: '/myWallet',
      name: 'myWallet',
      components: {
        default: myWallet
      }
    },
    //充值
    {
      path: '/recharge',
      name: 'recharge',
      components: {
        default: recharge
      }
    },
    //对碰奖金
    {
      path: '/onTheBonus',
      name: 'onTheBonus',
      components: {
        default: onTheBonus
      }
    },
    //管理奖金
    {
      path: '/managementBonus',
      name: 'managementBonus',
      components: {
        default: managementBonus
      }
    },
    //我的分润
    {
      path: '/myLip',
      name: 'myLip',
      components: {
        default: myLip
      }
    },
    //合伙人红包
    {
      path: '/partnerRedEnvelope',
      name: 'partnerRedEnvelope',
      components: {
        default: partnerRedEnvelope
      }
    },
    //我的团队
    {
      path: '/myTeam',
      name: 'myTeam',
      components: {
        default: myTeam
      }
    },
    //二级团队
    {
      path: '/twoLevelTeam',
      name: 'twoLevelTeam',
      components: {
        default: twoLevelTeam
      }
    },
    //提现
    {
      path: '/withdrawals',
      name: 'withdrawals',
      components: {
        default: withdrawals
      }
    },
    //提现记录
    {
      path: '/cashRegister',
      name: 'cashRegister',
      components: {
        default: cashRegister
      }
    },
    //收支明细
    {
      path: '/moneyLog',
      name: 'moneyLog',
      components: {
        default: moneyLog
      }
    },
    //奖金和会员等级说明
    {
      path: '/explain',
      name: 'explain',
      components: {
        default: explain
      }
    },
    //设置
    {
      path: '/setUp',
      name: 'setUp',
      components: {
        default: setUp
      }
    },
    //帮助中心
    {
      path: '/helpCenter',
      name: 'helpCenter',
      components: {
        default: helpCenter
      }
    },
    //帮助中心详情
    {
      path: '/helpCenterDetail',
      name: 'helpCenterDetail',
      components: {
        default: helpCenterDetail
      }
    },
    //关于我们
    {
      path: '/signArticle',
      name: 'signArticle',
      components: {
        default: signArticle
      }
    },
    //意见反馈
    {
      path: '/feedback',
      name: 'feedback',
      components: {
        default: feedback
      }
    },
    //登录
    {
      path: '/login',
      name: 'login',
      components: {
        default: login
      }
    },
    //注册
    {
      path: '/register',
      name: 'register',
      components: {
        default: register
      }
    },
    //注册协议
    {
      path: '/registrationProtocol',
      name: 'registrationProtocol',
      components: {
        default: registrationProtocol
      }
    },
    //第三方注册
    {
      path: '/thirdPartyRegister',
      name: 'thirdPartyRegister',
      components: {
        default: thirdPartyRegister
      }
    },
    //忘记密码
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      components: {
        default: forgotPassword
      }
    },
    //个人中心
    {
      path: '/personalCenter',
      name: 'personalCenter',
      components: {
        default: personalCenter
      }
    },
    //招商加盟
    {
      path: '/groupDetail',
      name: 'groupDetail',
      components: {
        default: groupDetail
      }
    }
  ]
})
