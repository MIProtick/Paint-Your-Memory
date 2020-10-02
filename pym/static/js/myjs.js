// elements
var $page = $(".page");


$(".menu_toggle").on("click", function () {
    $page.toggleClass("shazam");
    if ($(".content").attr("id") == "icontent") {
        $(".content").attr("id", "");
        trans_null();
    } else {
        $(".content").attr("id", "icontent");
        trans();
        // console.log(window.pageYOffset);
    }
});

$(".content").on("click", function () {
    $page.removeClass("shazam");
    $(".content").attr("id", "");
    trans_null();
});

// menu control
function trans(){
    var xScale = -Math.ceil(window.pageYOffset / 100) * 3;
    var yScale = Math.ceil(window.pageYOffset / 100) * (2 ** 1.01);
    var ang = -30;
    document.getElementsByClassName("content")[0].style.transform =
        "rotate(" + ang + "deg) translate(" + xScale + "%, " + yScale + "%)";
}

function trans_null(){
    document.getElementsByClassName("content")[0].style.transform =
        "rotate(0deg) translate(" + 0 + "px, " + 0 + "px)";
}


