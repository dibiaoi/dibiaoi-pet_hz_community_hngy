import { get, post, patch, postFormData, deleteMethod } from '@/request/baseRequest'
//post
export const autoLoginRequest = data => post('/user/login/token', data)
export const loginRequest = data => post('/user/login', data)
export const adminLoginRequest = data => post('/custodian/admin/login', data)
export const hospitalLoginRequest = data => post('/hospital/user/login', data)
export const authentication = data => post('/user/authentication', data)
export const volunteer = data => post('/user/volunteer/application', data)
export const sendVerification = data => post('/user/msgCode/send', data)
export const registerUser = data => post('/user/register', data)
export const registerHospital = data => post('/hospital/user/register', data)
export const focusUser = (id, data) => post('/user/focus/user/' + id.id, data)

export const adminAutoLogin = data => post('/custodian/admin/login/token', data)
export const hospitalAutoLogin = data => post('/hospital/user/login/token', data)
export const postNewPet = data => post('/pet/create', data)
export const adoptDefine = (id, data) => post('/petAdopt/adopt/adoptDefine/' + id, data)

export const postCollect = (id, model, data) =>
  post('/petPublicServer/' + model + '/collect/' + id, data)

export const postCommentLike = (commentId, model, data) =>
  post('/petPublicServer/' + model + '/commentLike/' + commentId, data)

export const postComment = (commentId, model, data) =>
  post('/petPublicServer/' + model + '/comment/' + commentId, data)

export const createPetAdopt = data => post('/petAdopt/create', data)
export const userAdopt = (id, data) => post('/petAdopt/adopt/userAdopt/' + id, data)

export const examine = (id, model, data) => post('/custodian/' + model + '/verify/' + id, data)
export const rejectIdentity = (id, model, data) =>
  post('/custodian/' + model + '/cancel/' + id, data)
export const adoptDetermine = (id, data) => post('/custodian/petAdopt/determine' + id, data)
export const createService = data => post('/hospital/service/create', data)
export const createPetHelp = data => post('/petHelp/create', data)
export const userDonatePetHelp = data => post('/petHelp/donate/userDonate', data)
export const petHelpSendMoney = (id, data) => post('/custodian/petHelp/determine/' + id, data)

export const addTag = data => post('/custodian/news/label', data)
export const publishNews = data => post('/news/create', data)

// get
export const focusUserList = data => get('/user/focus/list', data)
export const fanUserList = data => get('/user/fans/list', data)
export const petList = data => get('/pet/list', data)
export const petInfo = id => get('/pet/get/' + id)
export const userAvatar = id => get('/user/avatar/' + id)
export const getUserPage = id => get('/user/information/show/' + id)
export const userFocusJudge = id => get('/user/focus/judge/' + id)
export const getAdoptById = id => get('/petAdopt/get/' + id)
export const getOrderInfo = id => get('/petAdopt/order/' + id)
export const getPetHelpInfo = id => get('/petHelp/get/' + id)
export const getArea = data => get('/address/area/list', data)
export const getServiceInfo = id => get('/hospital/service/information/' + id)

export const getUserInfoAdmin = id => get('/custodian/user/' + id)
export const getPetHelp = id => get('/petHelp/get/' + id)
export const checkIsCollect = (id, model) => get('/petPublicServer/' + model + '/collect/' + id)
export const getCollectList = (model, data) =>
  get('/petPublicServer/' + model + '/collect/list', data)

export const getAdoptPostsList = data => get('/petAdopt/list', data)
export const getOrderList = data => get('/petAdopt/order/list', data)
export const getAllUserList = data => get('/custodian/user/list', data)
export const getAllHospital = data => get('/hospital/user/information/list', data)
export const getServiceList = data => get('/hospital/service/information/list', data)
export const acquireAllPetHelp = data => get('/petHelp/list', data)
export const supportUserList = data => get('/petHelp/donate/list', data)

export const getCommentList = (id, model) =>
  get('/petPublicServer/' + model + '/comment/details/' + id)

export const getAllLabel = () => get('/news/label/list')
export const getNewsList = data => get('/news/list', data)
export const getNewsById = id => get('/news/get/' + id)

// patch
export const findBackPsdRequest = data => patch('/user/findBackPassword', data)
export const changePayPassword = data => patch('/user/findBackPayPassword', data)
export const findAdminPsdBack = data => patch('/custodian/admin/findBackPassword', data)
export const findHospitalPsdBack = data => patch('/hospital/user/findBackPassword', data)
export const modify = data => patch('/user/information/modify', data)
export const hospitalAuth = data => patch('/hospital/user/authentication', data)
export const avatarUpload = data => patch('/user/avatar/upload', data)
export const updatePetInfo = (id, data) => patch('/pet/update/' + id, data)
export const patchHospitalInfo = data => patch('/hospital/user/information/modify', data)
export const editAdopt = (id, data) => patch('/petAdopt/update/' + id, data)
export const editHospitalService = (id, data) => patch('/hospital/service/update/' + id, data)
export const editPetHelp = (id, data) => patch('/petHelp/update/' + id, data)
export const editNews = (id, data) => patch('/news/update/' + id, data)

// postFormData

export const petImageUpload = data => postFormData('/pet/image/create', data)

// delete
export const petDelete = id => deleteMethod('/pet/delete/' + id)
export const delAdopt = id => deleteMethod('/petAdopt/delete/' + id)
export const delTag = id => deleteMethod('/custodian/news/label/' + id)
export const delHospitalService = id => deleteMethod('/hospital/service/delete/' + id)
export const deletePetHelp = id => deleteMethod('/petHelp/delete/' + id)
export const deleteNews = id => deleteMethod('/news/delete/' + id)
export const deleteComment = (id, model) =>
  deleteMethod('/petPublicServer/' + model + '/comment/delete/' + id)
