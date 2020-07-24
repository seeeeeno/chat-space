$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message" data-message-id=${message.id}>
            <div class="MessageInfo">
              <div class="MessageInfo__user-name">
                ${message.user_name}
              </div>
              <div class="MessageInfo__date">
                ${message.created_at}
              </div>
            </div>
            <div class="Message-text">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>`
      return html;
    } else {
      let html =
        `<div class="Message" data-message-id=${message.id}>
          <div class="MessageInfo">
            <div class="MessageInfo__user-name">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message-text">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('.form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message-list').append(html);
      $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });
 });