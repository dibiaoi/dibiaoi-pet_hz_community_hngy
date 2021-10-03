import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js'
import app from './app.js'
import Register from './User/Register.js'
import ChangePsd from './User/ChangePsd.js'
import EditUserInfo from './User/EditUserInfo.js'
import UserActions from './User/UserActions.js'
import Permissions from './Permission.js'
import PetList from './pet/PetList.js'
import PostPet from './pet/PostPet.js'
import createAdopt from './petAdopt/createAdopt.js'
import adoptPostList from './petAdopt/adoptPostList.js'
import adoptOperation from './petAdopt/adoptOperation.js'
import order from './petAdopt/order.js'
import collect from './petPublicServer/collect.js'
import comment from './petPublicServer/comment.js'
import commentLike from './petPublicServer/commentLike.js'
import adminLogin from './admin/adminLogin.js'
import adminUser from './admin/adminUser.js'
import adminOperation from './admin/adminOperation.js'
import hospitalOperation from './hospital/hospitalOperation.js'
import hospitalInfo from './hospital/hospitalInfo.js'
import hospitalService from './hospital/hospitalService.js'
import petHelpEditor from './petHelp/petHelpEditor.js'
import petHelpInfo from './petHelp/petHelpInfo.js'
import petHelpUserHelper from './petHelp/petHelpUserHelper.js'
import notification from './notification/notification.js'
import chatCenter from './notification/chatCenter.js'
import postNews from './news/postNews.js'
import editNews from './news/editNews.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logoutSocket: false
  },
  mutations: {},
  actions: {},
  modules: {
    app,
    userInfo,
    Register,
    ChangePsd,
    EditUserInfo,
    UserActions,
    Permissions,
    PetList,
    PostPet,
    createAdopt,
    adoptPostList,
    adoptOperation,
    order,
    collect,
    comment,
    commentLike,
    adminLogin,
    adminUser,
    adminOperation,
    hospitalOperation,
    hospitalInfo,
    hospitalService,
    petHelpEditor,
    petHelpInfo,
    petHelpUserHelper,
    notification,
    postNews,
    editNews,
    chatCenter
  }
})
