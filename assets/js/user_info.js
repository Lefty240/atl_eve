$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称必须在1-6个字符之间"
      }
    },
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败!")
        }
        console.log(res.data)
        form.val("formUserInfo", res.data)
      },
    })
  }
  $("#btnReset").on("click", function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault()

    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败！")
        }
        layer.msg("更新用户信息成功！")
        // 调用父页面中的方法，重新渲染用户的头像和信息
        window.parent.getUserInfo()
      },
    })
  })
})
