$(".checkUsername").on("click", () => {
  $.ajax({
    url: "/api/user/findUsername",
    type: "POST",
    data: {
      username: $(".userInput").val(),
    },
  })
    .then((data) => {
      if (data !== "This username has already existed") {
        $(".userInput").val("");
        $(".noti").html("");
        $(".noti").append("This username is wrong");
      } else {
        let item = `
            <div class="password">Old Password: <input class = 'passInput' type="text" name=""></div>
            <div class="newPass">New Password: <input class = 'newPassword' type="text" name=""></div>
            <div class="confirmBtn"><button class ='confirmChange'>CONFIRM</button></div>
            `;
        $(".container").append(item);
        $(".confirmChange").on("click", () => {
          changePassword();
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function changePassword() {
  $.ajax({
    url: "/api/user/changePassword",
    type: "PUT",
    data: {
      username: $(".userInput").val(),
      password: $(".passInput").val(),
      newPassword: $(".newPassword").val(),
    },
  })
    .then((data) => {
      if (data === "Doi mat khau thanh cong") {
        $(".userInput").val('');
        $(".passInput").val('');
        $(".newPassword").val('');
        $('.noti').html('');
        $('.noti').append('Change password successfull')
      }else{
        $('.noti').html('');
        $('.noti').append('Change password failed. Please re-enter your old password')
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
