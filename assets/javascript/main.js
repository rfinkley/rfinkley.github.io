const toggleDisplay = function (id) {
    if ($(`#${id}`).attr("data-visible")==="false") {
        $("section[data-visible='true']").removeClass('d-block');
        $("section[data-visible='true']").addClass('d-none');
        $("section[data-visible='true']").attr('data-visible', 'false');
        $(`#${id}`).attr("data-visible", "true");
        $(`#${id}`).removeClass("d-none");
        $(`#${id}`).addClass("d-block");
    }
};

