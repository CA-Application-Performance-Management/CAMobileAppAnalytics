import { boot } from 'quasar/wrappers'
import { Platform } from 'quasar'

export default boot(async ({ app, router}) => {


  // router.beforeEach((to, from) => {
  //   setTimeout(function() {
  //     console.log("boot-beforeEach "+to.name+", "+to.path+", isAndroid: "+Platform.is.android)
  //     if (Platform.is.android) {
  //             window.camaa.forcePageLoadEvent(to.name ? to.name : to.path)
  //     }      
  //   }, 5)
  // })

  router.afterEach((to, from) => {
    setTimeout(function() {
      window.camaa.viewLoadedWithScreenshot(to.name ? to.name : to.path,0.25,"YES",function (action,returnValue,error) {
      })
    }, 200)
  })
})