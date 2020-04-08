function setClass(theArray) {
    colSpanValue = 12 / theArray.length;

    for (var x = 0; x < theArray.length; x++) {
        temp = theArray[x];
        $(`#${temp}-Code`).removeClass().addClass(`codeDisplay col-md-${colSpanValue}`);
        $(`#${temp}-Code`).show();
    }
}

// sets the height of codeDisplay
$(function() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var navBarHeight = $("#nav-bar").height();
    var newHeight = windowHeight - navBarHeight - 18;
    $(".codeDisplay").height(newHeight + "px");
    $("textarea").height(newHeight - 70);
    $("textarea").css("maxHeight", newHeight - 70);
    $("textarea").css("minHeight", newHeight - 70);
    $("iframe").height(newHeight - 40);
})

activeCodeDisplay = ["HTML", "Result"];

function codeArea(display) {
    if (activeCodeDisplay.length == 1 && activeCodeDisplay[0] == display) {
        //console.log(`${display} is the last element on the screen!!`)
    }
    else {
        var active = $(`#${display}-Code`);
        if ($.inArray(display, activeCodeDisplay) == -1){
            // if it is not inside i.e if the code isn't showing
            // and you want it to show
            $(`#${display}`).css("backgroundColor", "lightgrey");
            activeCodeDisplay.push(display);
            
            setClass(activeCodeDisplay);

        }else if ($.inArray(display, activeCodeDisplay) > -1) {
            // if it is inside i.e if the code is showing
            // and you want to remove it
            $(`#${display}`).css("backgroundColor", "rgb(248,249,250)");
            var indexOfDisplay = activeCodeDisplay.indexOf(display);
            activeCodeDisplay.splice(indexOfDisplay, 1);            
            active.hide();

            setClass(activeCodeDisplay);
        }
    }
}

$("#runButton").click(function() {
    $("iframe").contents().find("html").html(`
    <style> ${$("#CSS-textarea").val()} </style>
    ${$("#HTML-textarea").val()} `);

    document.getElementById("codeDisplayIframe").contentWindow.eval($("#JS-textarea").val());
});
