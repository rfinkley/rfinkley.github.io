// const toggleDisplay = function (id) {
//     if ($(`#${id}`).attr("data-visible")==="false") {
//         $("section[data-visible='true']").removeClass('d-block');
//         $("section[data-visible='true']").addClass('d-none');
//         $("section[data-visible='true']").attr('data-visible', 'false');
//         $(`#${id}`).attr("data-visible", "true");
//         $(`#${id}`).removeClass("d-none");
//         $(`#${id}`).addClass("d-block");
//     }
// };

  const scrollTop = document.querySelector('#scrollTop');
  
  function checkPosition() {
    let windowY = window.scrollY;
    if (windowY > 250) {
      scrollTop.classList.add('is-visible');
      scrollTop.classList.remove('is-hidden');
    } else {
      // Scrolling DOWN
      scrollTop.classList.add('is-hidden');
      scrollTop.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', checkPosition);
