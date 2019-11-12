$("#scrape").on("click", e => {
    e.preventDefault();

    $.ajax("/api/scrape", {
        type: "GET"
    }).then(() => location.reload());
});

$("#clear").on("click", e => {
    e.preventDefault();

    $.ajax("/api/all/remove", {
        type: "DELETE"
    }).then(() =>location.reload());
});

$(".save-article").on("click", function(e) {
    e.preventDefault();

    const id = $(this).attr("data-id");
    const saved = {
        saved : true
    };

    $.ajax("/api/update/" + id, {
        type:"PUT",
        data: saved
    }).then(() => location.reload());

});

$(".delete-article").on("click", function(e) {
    e.preventDefault();

    const id = $(this).attr("data-id");
    
    $.ajax("/api/myarticles/remove/" + id, {
        type:"DELETE"
    }).then(() => location.reload());
});