var xhttp = new XMLHttpRequest();
var selectedOption = 0;
xhttp.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
xhttp.send();
xhttp.onload = function () {
    let pagination = JSON.parse(xhttp.responseText);
    console.log(pagination.length);
    let div = document.getElementsByClassName("pagination");
    div[0].appendChild(createAnchorTag("a", "First", "first", pagination));
    div[0].appendChild(createAnchorTag("a", "Previous", "previous", pagination));
    for (i = 0; i < pagination.length; i++) {
        let tag = document.createElement("a");
        tag.href = "#";
        tag.id = i;
        tag.onclick = function () {
            selectedOption = tag.id;
            updateValue(pagination, tag.id, tag)
        }
        let textNode = document.createTextNode(pagination[i].id);
        tag.appendChild(textNode);
        div[0].appendChild(tag);
        if (i == 0) {
            updateValue(pagination, 0, tag)
        }
    }
    div[0].appendChild(createAnchorTag("a", "Next", "next", pagination));
    div[0].appendChild(createAnchorTag("a", "Last", "last", pagination))
}

function createAnchorTag(tagName, text, id, array) {
    let tag = document.createElement(tagName);
    tag.href = "#";
    tag.id = id;
    let firstTextNode = document.createTextNode(text);
    tag.appendChild(firstTextNode);
    tag.onclick = function () {
        updateValue(array, tag.id, tag)
    }
    return tag
}

function updateValue(array, position, tag) {
    removeClass()
    if (position == "first" || position == "previous" || position == "next" || position == "last") {
        switch (position) {
            case "first":
                position = 0;
                setActiveClass(2);
                break;
            case "previous":
                if(selectedOption>0) {
                    position = selectedOption-1;
                    console.log("Previuos After Assign:" + position + " " + selectedOption);
                    setActiveClass(position+2);
                    selectedOption -= 1;
                }
                break;
            case "last":
                position = 99;
                setActiveClass(101);
                break;
            case "next":
                console.log("Next:" + position + selectedOption);
                if(selectedOption<99) {
                    position = selectedOption+1;
                    console.log("Next After Assign:" + position + " " + selectedOption);
                    setActiveClass(position);
                    selectedOption += 1;
                }
                break;
            default:
                break;
        }
    } else {
        tag.className = "active"
    }
    let idTag = document.getElementById("id");
    let nameTag = document.getElementById("name");
    let emailTag = document.getElementById("email");
    idTag.innerHTML = ""
    nameTag.innerHTML = ""
    emailTag.innerHTML = ""
    idTag.appendChild(document.createTextNode(array[position].id));
    nameTag.appendChild(document.createTextNode(array[position].name));
    emailTag.appendChild(document.createTextNode(array[position].email));
}

function removeClass() {
    let pagination = document.getElementsByClassName("pagination");
    let tags = pagination[0].children;
    for (let i = 0; i < tags.length; i++) {
        tags[i].classList.remove("active")
    }
}

function setActiveClass(position) {
    console.log(position);
    let pagination = document.getElementsByClassName("pagination");
    let tags = pagination[0].children;
    tags[position].className = "active"
}