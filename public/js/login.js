$('.loginButton').on('click', ()=>{

    $.ajax({
        url: '/api/user/login',
        type: 'POST',
        data: {
            username: $('.userInput').val(),
            password: $('.passInput').val()
        }
    }).then(data =>{
        if(data !== "Dang nhap that bai"){
            setCookie('user', data.token, 30);
            window.location.href = '/home';
        }else {
            alert('Sai thong tin dang nhap');
            window.location.href = '/login';
        }
    })
    .catch(err =>{
        window.location.href = '/login'
        })
})

// function setCookie

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
