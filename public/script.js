function handleDelete(id){
    $.ajax({
        type:"DELETE",
        url:'/dashboard',
        data: {shortUrl : id},
        success: (res)=>{console.log("success, " + res)}
    })
    location.reload();
}

function handleEdit(originalShortUrl){
    const fullEditUrl = $(`#${originalShortUrl}full`).val()
    const shortEditUrl = $(`#${originalShortUrl}short`).val()
    $.ajax({
        type:"PUT",
        url:'/dashboard',
        data: {shortUrl : originalShortUrl, newShortUrl : shortEditUrl, newFullUrl : fullEditUrl},
        context: 'this',
            success: function(data) {
                if(data == "success"){
                    location.reload();
                }
                else{
                    $("#shortWarning").text(data).css("color", "red");;
                }
            }
    })
}
