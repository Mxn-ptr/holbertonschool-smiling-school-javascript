$(document).ready(function () {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    type: "get",
    beforeSend: function () {
      $("#carousel-loader").show();
    },
  }).done((response) => {
    $("#carousel-loader").hide();
    for (let i = 0; i < response.length; i++) {
      let $content = `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <div class="row justify-content-center">
            <div class="col-12 col-md-2 py-5 text-center">
              <img
              class="rounded-circle"
              src="${response[i].pic_url}"
              alt="profile_5"
              width="150"
              />
            </div>
            <div class="col-12 col-md-6 px-5 px-lg-0 d-flex flex-column text-white justify-content-center">
              <p class="font-weight-light mb-3">
                «${response[i].text}»
              </p>
              <p class="font-weight-bold my-1">${response[i].name}</p>
              <p class="font-italic font-weight-light my-1">
                ${response[i].title}
              </p>
            </div>
          </div>
        </div>`;
      $("section.carousel-section .carousel-inner").append($content);
    }
  });

  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    type: "get",
    beforeSend: function () {
      $("#tutorials-loader").show();
    },
  }).done((response) => {
    $("#tutorials-loader").hide();
    for (let i = 0; i < response.length; i++) {
      let $stars = "";
      for (let j = 0; j < response[i].star; j++) {
        $stars +=
          '<img class="mr-1" src="images/star_on.png" alt="star complete" width="15"/>';
      }
      for (let j = response[i].star; j < 5; j++) {
        $stars +=
          '<img src="images/star_off.png" alt="star complete" width="15"/>';
      }
      let $content = `
        <div class="col-12 col-sm-6 col-md-3" id="${response[i].id}">
          <div class="carousel-item ${
            response[i].id > 0 && response[i].id < 5 ? "active" : ""
          }">
            <div class="card border-0">
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="${response[i].thumb_url}"
                  alt="thumbnail_1"
                  class="card-img-top"
                />
                <img
                  src="images/play.png"
                  alt="overlay"
                  class="rounded-circle z-1 position-absolute"
                  width="80"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title font-weight-bold">
                  ${response[i].title}
                </h3>
                <p class="font-weight-light text-card">
                  ${response[i]["sub-title"]}
                </p>
                <img
                  src="${response[i].author_pic_url}"
                  alt="profile_1"
                  width="40"
                  class="rounded-circle mr-2"
                />
                <span class="purple">${response[i].author}</span>
                <div class="d-flex justify-content-between">
                  <div class="mt-2">
                    ${$stars}
                  </div>
                  <span class="purple mt-2">${response[i].duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      $(".videos-section .carousel-inner").append($content);
    }
  });

  $.ajax({
    url: "https://smileschool-api.hbtn.info/latest-videos",
    type: "get",
    beforeSend: function () {
      $("#latest-loader").show();
    },
  }).done((response) => {
    $("#latest-loader").hide();
    for (let i = 0; i < response.length; i++) {
      let $stars = "";
      for (let j = 0; j < response[i].star; j++) {
        $stars +=
          '<img class="mr-1" src="images/star_on.png" alt="star complete" width="15"/>';
      }
      for (let j = response[i].star; j < 5; j++) {
        $stars +=
          '<img src="images/star_off.png" alt="star complete" width="15"/>';
      }
      let $content = `
        <div class="col-12 col-sm-6 col-md-3">
          <div class="carousel-item id='${response[i].id}' ${response[i].id > 0 && response[i].id < 5 ? 'active' : ''}">
            <div class="card border-0">
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="${response[i].thumb_url}"
                  alt="thumbnail_1"
                  class="card-img-top"
                />
                <img
                  src="images/play.png"
                  alt="overlay"
                  class="rounded-circle z-1 position-absolute"
                  width="80"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title font-weight-bold">
                  ${response[i].title}
                </h3>
                <p class="font-weight-light text-card">
                  ${response[i]["sub-title"]}
                </p>
                <img
                  src="${response[i].author_pic_url}"
                  alt="profile_1"
                  width="40"
                  class="rounded-circle mr-2"
                />
                <span class="purple">${response[i].author}</span>
                <div class="d-flex justify-content-between">
                  <div class="mt-2">
                    ${$stars}
                  </div>
                  <span class="purple mt-2">${response[i].duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      $(".latest-section .carousel-inner").append($content);
    }
    });
  function search() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      type: "get",
      dataType : 'json',
      data: {
        action: 'query',
        list: 'search',
        format: 'json',
        q: $('.search_input').val(),
        topic: 'all',
        sort: 'most_popular'
      }
    }).done((response) => {
      $('#courses-loader').hide();
      if (response.courses.length < 2)
        $("#number").text(`${response.courses.length} video`)
      else
      $("#number").text(`${response.courses.length} videos`)
      let topics = response.topics;
      let sorts = response.sorts;
      topics.forEach(topic => {
        let topicName = topic[0].toUpperCase() + topic.substring(1);
        let $btn = $(`<button data-value=${topic} class="dropdown-item" type="button">${topicName}</button>`);
        $btn.click(function(e) {
          $topicVal = e.target.getAttribute('data-value');});
        $('.drop-topic').append($btn)
      })
    });
  }
  search();
});
