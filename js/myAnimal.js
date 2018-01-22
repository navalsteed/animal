var animalQue = "What animal did you think of?";

var queCount = -1;

/*
*define data model
*/
function BST(val) {
    this.value = val;
    this.yesNode = null;
    this.noNode = null;
    this.isQuestion=false;
}


/**
 *loop through binary tree based on player's input  
 **/
function query(node) {
    if (node.isQuestion) {
        $("p").text(node.value);
        $("div.myButton").show();  //show YES or NO buttons
        getYesOrNo(node);
    }
    else {
        onQueryAnimal(node);
    }

}

function clickCount() {
    queCount++;
}


/**
 *This function will verify if computer makes the correct guess
 * yes: show user how many questions does it take to obtain right answer
 * no: ask user provide a valid question so that computer can identify next time
*/
function onQueryAnimal(node) {
    $("p").text("Is it a(n) " + node.value + "?");
    $("button").click(function () {
        if ($(this).text() == "yes") {
            $("p").text("It took me " + queCount + " question(s) to guess right animal!!");
            $("div.myButton").hide();  //hide YES or NO buttons
            $("div.menuClass").show();
        }
        if ($(this).text() == "no") {
            updateTree(node);
        }
    });
}

/* function isQuestion(node) {
    if (node.value != null && node.value.includes("?")) {
        return true
    }
    else return false
} */


//loop through all nodes and make modification
function traverse(obj) {
    var animalNew = localStorage.getItem("latestAnimal");
    var animalOld = localStorage.getItem("oldAnimal");
    var bo = localStorage.getItem("bo");
    var que = localStorage.getItem("que");
    // always follow left branch first
    if (obj.yesNode) {
        traverse(obj.yesNode);
    }
    // do stuff for leaf nodes
    if (obj.value) {
        if (obj.value == animalOld) {
            obj.value = que;
            obj.isQuestion=true;
            if (bo == 1) {
                obj.yesNode = new BST(animalNew);
                obj.noNode = new BST(animalOld);
            } else if (bo == 0) {
                obj.noNode = new BST(animalNew);
                obj.yesNode = new BST(animalOld);
            }
            return;
        }
    }
    // then the right branch if it exists
    if (obj.noNode) {
        traverse(obj.noNode);
    }
}


/*
*Captilize the first letter of each question 
*/
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function updateTree(node) {
    var _animalOld = node.value;
    $("form").show();
    $("div.checkBoxInput").hide();
    $("div.myButton").hide();
    $("p").text(animalQue);  //what animal did you think of?
    $("input:first").val('');
    $("input:first").focus();
    var q = null;
    var submitCount = 0;
    $("form").submit(function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var input = $("input").val().trim();
        if (input != "") {
            submitCount++;
        } else {
            alert("You haven't enter input\nPlease try again");
            $("input:first").val('');
            $("input:first").focus();
        }
        if (submitCount == 1) {
            var latestAnimal = input;
            localStorage.setItem("latestAnimal", latestAnimal);
            var t = distinAnimal(_animalOld, latestAnimal);
            $("p").text(t);
            $("input:first").val('');
            $("input:first").focus();
        }
        if (submitCount == 2) {
            q = $("input").val();
            if (q.includes("?")) {
                var an = localStorage.getItem("latestAnimal");
                $("p").text("What would the right answer be for a " + localStorage.getItem("latestAnimal") + "? (Y/N)");
                var v = document.getElementById("textInput");
                v.style.visibility = 'hidden';
                $("div.checkBoxInput").show();
            } else {
                alert("Please type a question that ends with question mark.");
                submitCount--;
            }
        }
        if (submitCount == 3) {
            var v = cbValue.get("value");
            localStorage.setItem("que", capitalize(q));
            localStorage.setItem("oldAnimal", _animalOld);
            if (v != undefined) {
                if (v == "y") {
                    localStorage.setItem("bo", 1);
                } if (v == "n") {
                    localStorage.setItem("bo", 0);
                }
                var _node = localStorage.getItem("root");
                _node = JSON.parse(_node);
                traverse(_node);
                localStorage.setItem("root", JSON.stringify(_node));
                 $("form").hide();
                document.getElementById("yesCheckbox").checked = false;   //reset check box
                document.getElementById("noCheckbox").checked = false;   //reset check box
                $("p").text(localStorage.getItem("latestAnimal") + " has been recorded.\nYou won!");
                $("div.menuClass").show();
            }
            else {
                alert("please select the answer");
                submitCount--;
            }

        }
    });

}
/*
*get or set checkbox value(yes or no)
*/
var cbValue = {
    get: function (name) { return this['_' + name]; },
    set: function (name, value) { this['_' + name] = value; }
};


function getYesOrNo(node) {
    $("button").click(function () {
        var answer = $(this).text();
        if (answer == "yes") {
            query(node.yesNode);    //
            return;
        } if (answer == "no") {
            query(node.noNode);     //   return "n";
            return;
        }
    });
}

$(document).ready(function () {
    if (typeof localStorage === "undefined" || localStorage === null) {
        alert("Opps!!The application can not run under this browser\nPleasase Try another browser, like firefox, chrome");
    }

    $(document).keydown(function (e) {
        if (localStorage.getItem("root") == null) {
            var root = { "value": "Is it a mammal?", "yesNode": { "value": "Can you ride it?", "yesNode": { "value": "horse", "yesNode": null, "noNode": null, "isQuestion": false }, "noNode": { "value": "cat", "yesNode": null, "noNode": null, "isQuestion": false }, "isQuestion": true }, "noNode": { "value": "Can it fly?", "yesNode": { "value": "bird", "yesNode": null, "noNode": null, "isQuestion": false }, "noNode": { "value": "fish", "yesNode": null, "noNode": null, "isQuestion": false }, "isQuestion": true }, "isQuestion": true };
            localStorage.setItem("root", JSON.stringify(root));
        }
        if (e.keyCode == 13 && ($("p").text().includes("Think"))) {
            e.preventDefault();
            var _root = localStorage.getItem("root");
            if (localStorage.getItem("root") != null) {
                _root = JSON.parse(_root);
                query(_root);           // first call
            }
            $("div.myButton").show();
        }
    });


    $('.checkBox-list').click(function () {
        $(this).siblings('input:checkbox').prop('checked', false);
        cbValue.set("value", $(this).val());
    });


});


function distinAnimal(animalA, animalB) {
    return "With what yes-no question could you distinguish a " + animalA + " from a " + animalB + "?";
}

