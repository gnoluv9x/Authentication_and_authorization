$('.registgerBtn').on('click', ()=>{

    $.ajax({
        url: '/api/user/findUsername',
        type: 'POST',
        data: {
            username: $('.userInput').val()
        }
    })
    .then(data =>{
       if(data === 'This username hasnt already existed'){
           register();
       }else{
        $('.userInput').val('');
        $('.passInput').val('');
        $('.noti').html('');
        $('.noti').append('This username is exist');
       }
    })
    .catch( err =>{
        console.log(err);
    })
})



function register(){

    $.ajax({
        url: '/api/user/register',
        type: 'POST',
        data: {
            username: $('.userInput').val(),
            password: $('.passInput').val()
        }
    })
    .then(data =>{
        $('.userInput').val('');
        $('.passInput').val('');
        $('.noti').html('');
        $('.noti').append('Register successful');
    })
    .catch( err =>{
        console.log(err);
    })
}

