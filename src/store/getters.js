const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user: state => state.user,
  categorys: state => state.user.categorys,
  webtype: state => state.app.webtype,
  danwei: state => state.app.danwei
}
export default getters
