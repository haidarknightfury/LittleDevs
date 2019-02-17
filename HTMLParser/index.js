var inputs = document.getElementById("htmlelements");

var buttonParse = document.getElementById("btnParse");
buttonParse.onclick = () => {
    allHtml = inputs.value;
     parse(allHtml);
}

var parserStack = [];

function parse(content) {
    console.log("START PARSING");
    startIndex = 0;
    for(var i=0;i<content.length;i++){
        var nextTag = findNextTag(content,i);
        if(!isClosing(nextTag.tag)){
            parserStack.push(nextTag.tag);
        }
        else{
            // closing tag received
            var opening = parserStack.pop();
            if(!isCorrespondingTag(opening, nextTag.tag)){
                console.log("OPENING TAG NOT CLOSED" + opening);
                console.log("CLOSED TAG"+ nextTag.tag);
                break;
            }
        }
        i = nextTag.end;
    }
    console.log("FINISHED PARSING");
}

/**
 * Extract tag from content
 * @param {*} content 
 * @param {*} i 
 */
function findNextTag(content, i) {
    startIndex = content.indexOf("<", i);
    endIndex = content.indexOf(">", i + 1);

    if (startIndex == undefined) {
        return {
            "tag": "-1",end: -1
        };
    }
    var tag = "<";
    tag += content.substring(startIndex + 1, endIndex+1);
    return {
        "tag": tag,
        "end": endIndex
    };
}

function isClosing(tag) {
    if (tag.includes("</")) {
        return true;
    }
    return false;
}


function isCorrespondingTag(opening,closing){
    closing = closing.replace('</', '<');
    return opening == closing;
}


