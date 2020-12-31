$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })
  //自定义表单验证
  const form = layui.form
  form.verify = {
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,切不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val()
      if (pwd !== value) {
        return "两次密码不一致"
      }
    },
  }
  let layer = layui.layer
  //注册功能
  $("#form_reg").submit(function (e) {
    e.preventDefault()
    let data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    }
    $.post("/api/reguser", data, (res) => {
      if (res.status !== 0) return alert(res.message)
      layer.msg("注册成功")
      $("#link_login").click()
    })
  })

  $("#form_login").on("submit", function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.post("/api/login", data, (res) => {
      layer.msg("登录成功")
      localStorage.setItem("token", res.token)
      setTimeout((location.href = "/index.html"), 1000)
    })
  })
})
