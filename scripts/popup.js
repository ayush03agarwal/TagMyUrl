
document.getElementById("callPretty").addEventListener("click", prettyPrint);
document.getElementById("newTab").addEventListener("click", newTab);
document.getElementById("callRaw").addEventListener("click", rawPrint);
document.getElementById("callCopyMe").addEventListener("click", copyMe);

JSON._parse = JSON.parse
JSON.parse = function (json) {
    try {
        return JSON._parse(json)
    } catch(e) {
        jsonlint.parse(json)
    }
}

function prettyPrint() {
    try {
        var ugly = document.getElementById('dumpArea').value;
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        document.getElementById('dumpArea').value = pretty;
        $("#infoArea").html("Formatted Json");
    } catch (exc) {
        $("#infoArea").html(exc + '');
    }
}

function rawPrint() {
    var formatted = document.getElementById('dumpArea').value;
    var raw = formatted.replace(/(\r\n|\n|\r)/gm, "");
    raw = raw.replace(/\s+/g, ' ');
    document.getElementById('dumpArea').value = raw;
    $("#infoArea").html("Raw Text");
}

function copyMe() {
    var $temp = $("<textarea style='height:0px'>");
    $("body").append($temp);
    $temp.val(document.getElementById('dumpArea').value).select();
    document.execCommand("copy");
    $("#infoArea").html("Text Copied");
    $temp.remove();
}

function newTab() {
     chrome.tabs.create({url: chrome.extension.getURL('popup.html#window')});
     return false;
}