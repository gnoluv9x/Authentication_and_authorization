$.ajax({
  url: "/api/user/homepage",
  type: "POST",
})
  .then((data) => {
    if(data === "Hết hạn đăng nhập"){
        alert('Hết hạn đăng nhập');
        delete_cookie("user");
        window.location.href = "/login";
    }else if(data === "Da dang nhap voi quyen admin"){
      renderWithAdmin();
    }else if (data === "Da dang nhap voi quyen user") {
      render();
    }else {
      window.location.href = "/login";
    }
  })
  .catch((err) => {
    console.log(err);
    window.location.href = "/login";
  });

// render function
function render() {
  $(".listUsername").html("");
  $.ajax({
    url: "/api/user/home",
    type: "GET",
  })
    .then((data) => {
      data.forEach((ele) => {
        let item = `
        <div>${ele.username}</div>
        `;
        $(".listUsername").append(item);
      });
      let logoutButton =
        "<div><button onclick ='logOut()'>Dang Xuat</button></div>";
      $(".listUsername").append(logoutButton);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Render with admin

function renderWithAdmin() {
  $(".listUsername").html("");
  $.ajax({
    url: "/api/user/home",
    type: "GET",
  })
    .then((data) => {
      data.forEach((ele) => {
        let item = `
        <div>${ele.username} <button onclick ="deleteUser('${ele._id}')" class ="userToDel">Delete</button></div>
        `;
        $(".listUsername").append(item);
      });
      let logoutButton =
        "<div><button onclick ='logOut()'>Dang Xuat</button></div>";
      $(".listUsername").append(logoutButton);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Delete user with admin
function deleteUser(id) {
  $.ajax({
    url: "/api/user/deleteUser/" + id,
    type: "DELETE",
  })
    .then((data) => {
      if (data === "Xoa tai khoan thanh cong") {
        renderWithAdmin();
        $(".noti").html("");
        $(".noti").append("Xoa thanh cong");
      } else {
        $(".noti").html("");
        $(".noti").append("Xoa that bai");
      }
    })
    .catch((err) => {
      $(".noti").html("");
      $(".noti").append("Loi server");
    });
}

// Logout button
function logOut() {
  $.ajax({
    url: "/api/user/logout",
    type: "POST",
  })
    .then((data) => {
      if (data === "Dang xuat thanh cong") {
        delete_cookie("user");
        window.location.href = "/login";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// function delete cookie from client side

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
