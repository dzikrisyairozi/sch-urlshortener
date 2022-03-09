function handleDelete(id) {
  $.ajax({
    type: "DELETE",
    url: "/dashboard",
    data: { shortUrl: id },
    success: (res) => {
      console.log("success, " + res);
    },
  });
  location.reload();
}

function handleEdit(originalShortUrl) {
  const fullEditUrl = $(`#${originalShortUrl}full`).val();
  const shortEditUrl = $(`#${originalShortUrl}short`).val();
  $.ajax({
    type: "PUT",
    url: "/dashboard",
    data: {
      shortUrl: originalShortUrl,
      newShortUrl: shortEditUrl,
      newFullUrl: fullEditUrl,
    },
    context: "this",
    success: function (data) {
      if (data == "success") {
        location.reload();
      } else {
        $("#shortWarning").text(data).css("color", "red");
      }
    },
  });
}

function customInputGenerator() {
  const input = $("#shortUrl").length;
  if (input){
    $("#shortUrl").remove()
  }
  else {
    const form = $("#homeInput");
    form.append(
      $("<input>", {
          required: true,
        id: "shortUrl",
        type: "text",
        placeholder: "Custom short URL",
        name: "shortUrl",
        pattern: "^[a-zA-Z][a-zA-Z0-9.,$;]+",
      })
    );
  }
}