$("#scrape").on("click", e => {
    e.preventDefault();

    $.ajax("/api/scrape", {
        type: "GET"
    }).then(() => {
        location.reload();
    });
});

$("#clear").on("click", e => {
    e.preventDefault();

    $.ajax("/api/scrape/remove", {
        type: "DELETE"
    }).then(() => {
        location.reload();
    });
});

$(".save-article").on("click", function(e) {
    e.preventDefault();

    const id = $(this).attr("data-id");
    const saved = {
        unsaved : 1
    };

    $.ajax("/api/scrape/update", {})

});