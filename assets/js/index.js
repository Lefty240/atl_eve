$(function () {
  //获取用户信息
  getUser()
  function getUser() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",

      success: function (res) {
        console.log(res)
        if (res.status !== 1) {
          renderStr(res.data)
        }
      },
    })
  }
  let layer = layui.layer
  $("#leave").on("click", function () {
    layer.confirm(
      "确定退出登录",
      {
        icon: 3,
        title: "提示",
      },
      function (index) {
        localStorage.removeItem("token")
        location.href = "/login.html"
        layer.close(index)
      }
    )
  })
  //渲染
  function renderStr(data) {
    var name = data.nickname || data.username
    //渲染到欢迎
    $("#welcome").html("欢迎" + name)
    //如果有头像则隐藏文本头像
    if (data.user_pic !== null) {
      $(".layui-nav-img").attr("src", data.user_pic)
      $(".text-avatar").hide()
    } else {
      $(".layui-nav-img").hide()
      $(".text-avatar").html(name[0].toUpperCase())
    }
  }
})
