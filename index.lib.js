// Functions Library

Array.prototype.reverse_sort = function () {
    this.sort();
    this.reverse();
};

Array.prototype.clear = function () {
    this.length = 0;
};

Array.prototype.setVal = function (val, nVal) {
    if (nVal == null) nVal = this.length;
    for (var i = 0; i < nVal; i++) {
        this[i] = val;
    }
};

Array.prototype.inArray = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return true;
        }
    }

    return false;
};

Array.prototype.insert = function (itemz, index) {
    this.splice(index, 0, itemz);
};

Array.prototype.remove = function (itemz) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === itemz) {
            this.splice(i, 1);
        }
    }
};

Array.prototype.replaceWith = function (itemz, rep) {
    if (rep == null) rep = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] === itemz) {
            this[i] = rep;
        }
    }
};

Array.prototype.removeDup = function () {
    var prim = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        obj = [];

    return this.filter(function (x) {
        var t = typeof x;
        return (t in prim) ?
            !prim[t][x] && (prim[t][x] = 1) :
            obj.indexOf(x) < 0 && obj.push(x);
    });
}

Array.prototype.allValuesEqual = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] != val && this[i].length != 0) {
            return false;
        }
    }

    return true;
};

String.prototype.replaceAll = function (find, replace) {
    return this.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
}

String.prototype.removeAll = function (find) {
    return this.replaceAll(find, "");
}

String.prototype.parseElement = function () {
    return getEle(this);
}

String.prototype.toTitleCase = function () {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless 
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'
    ];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function (txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
}

function getEle(str) {
    if (document.querySelectorAll) {
        return document.querySelectorAll(str);
    }

    //parsing basic css (#id, .class, ele) and returning array of elements
    //does NOT support full css control like JQuery
    if (str[0] == "#") { //id
        return [document.getElementById(str.substring(1, str.length))];
    }
    if (str[0] == ".") { //class
        return getElementsByClass(str.substring(1, str.length));
    }

    return document.getElementsByTagName(str);
}

Date.prototype.getShortYear = function () {
    y = this.getFullYear() + "";
    s = y.split("");
    return s[s.length - 2] + s[s.length - 1];
}

function rand(lowest, highest) {
    num = Math.floor(Math.random() * (highest - lowest) + lowest);
    if (num > highest) {
        num = highest;
    } else if (num < lowest) {
        num = lowest;
    }
    return num;
}

function error(msg) {
    console.log(msg);
    alert(msg);
}

function trace(msg) {
    try {
        console.log(msg);
    } catch (e) {

    }
}

/* Mobile and Tablet checks */
function MobileCheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function MobileAndTabletCheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function longestWord(str) {
    strArr = str.split(" ");

    mx = 0;
    longestWrd = "";

    for (i = 0; i < strArr.length; i++) {
        len = strArr[i].length;
        if (len > mx) {
            mx = len;
            longestWrd = strArr[i];
        }
    }

    return longestWrd;
}

function getPageName() {
    return window.location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();

    if (node == null) node = document;
    if (tag == null) tag = '*';

    var els = node.getElementsByTagName(tag);

    var elsLen = els.length;

    var i, j;
    for (i = 0, j = 0; i < elsLen; i++) {
        var cl = els[i].className.split(" ");
        var pattern = new RegExp('(^|\\\\s)' + searchClass + '(\\\\s|$)');
        for (k = 0; k < cl.length; k++) {
            if (cl[k].search(pattern) != -1) {
                classElements.push(els[i]);
            }
        }
    }

    return classElements;
}

function getBodyWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
}

function getBodyHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
}

function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
            return obj["e" + type + fn](window.event);
        };
        obj.attachEvent("on" + type, obj[type + fn]);
    }
}

function wait(millis) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < millis);
}

function scrollUp(scrollDist, scrollspeed) {
    for (var iscroll = 0; iscroll < scrollDist; iscroll++) {
        setTimeout('window.scrollBy(0,' + iscroll * -1 + ')', scrollspeed * iscroll);
    }
}

function scrollDown(scrollDist, scrollspeed) {
    for (var iscroll = 0; iscroll < scrollDist; iscroll++) {
        setTimeout('window.scrollBy(0,' + iscroll + ')', scrollspeed * iscroll);
    }
}

function scrollLeft(scrollDist, scrollspeed) {
    for (var iscroll = 0; iscroll < scrollDist; iscroll++) {
        setTimeout('window.scrollBy(' + -1 * iscroll + ',0)', scrollspeed * iscroll);
    }
}

function scrollRight(scrollDist, scrollspeed) {
    for (var iscroll = 0; iscroll < scrollDist; iscroll++) {
        setTimeout('window.scrollBy(' + iscroll + ',0)', scrollspeed * iscroll);
    }
}

function isArray(val) {
    if (val instanceof Array) {
        return true;
    } else {
        return false;
    }
}

function getMousePositions(e) {
    if (e == null) {
        e = window.event;
    }
    var _mouseX = e.clientX;
    var _mouseY = e.clientY;

    return _mouseX + "," + _mouseY;
}

function clearData() {
    localStorage.clear();
}

/*------MISCELLANEOUS----*/ //Not so used...

//Format number to decimal places
function formatDecimal(argvalue, addzero, decimaln) {
    var numOfDecimal = (decimaln == null) ? 2 : decimaln;
    var number = 1;

    number = Math.pow(10, numOfDecimal);

    argvalue = Math.round(parseFloat(argvalue) * number) / number;
    // If you're using IE3.x, you will get error with the following line.
    // argvalue = argvalue.toString();
    // It works fine in IE4.
    argvalue = "" + argvalue;

    if (argvalue.indexOf(".") == 0)
        argvalue = "0" + argvalue;

    if (addzero == true) {
        if (argvalue.indexOf(".") == -1)
            argvalue = argvalue + ".";

        while ((argvalue.indexOf(".") + 1) > (argvalue.length - numOfDecimal))
            argvalue = argvalue + "0";
    }

    return argvalue;
}

//Check if string is email
function isEmail(argvalue) {
    if (argvalue.indexOf(" ") != -1)
        return false;
    else if (argvalue.indexOf("@") == -1)
        return false;
    else if (argvalue.indexOf("@") == 0)
        return false;
    else if (argvalue.indexOf("@") == (argvalue.length - 1))
        return false;

    var arrayString = argvalue.split("@"); //works only in netscape3 and above.
    //retSize = argvalue.split("@");

    if (arrayString[1].indexOf(".") == -1)
        return false;
    else if (arrayString[1].indexOf(".") == 0)
        return false;
    else if (arrayString[1].charAt(arrayString[1].length - 1) == ".") {
        return false;
    }

    return true;
}

//Check if URL
function isURL(argvalue) {
    if (argvalue.indexOf(" ") != -1)
        return false;
    else if (argvalue.indexOf("http://") == -1)
        return false;
    else if (argvalue == "http://")
        return false;
    else if (argvalue.indexOf("http://") > 0)
        return false;

    argvalue = argvalue.substring(7, argvalue.length);
    if (argvalue.indexOf(".") == -1)
        return false;
    else if (argvalue.indexOf(".") == 0)
        return false;
    else if (argvalue.charAt(argvalue.length - 1) == ".")
        return false;

    if (argvalue.indexOf("/") != -1) {
        argvalue = argvalue.substring(0, argvalue.indexOf("/"));
        if (argvalue.charAt(argvalue.length - 1) == ".")
            return false;
    }

    if (argvalue.indexOf(":") != -1) {
        if (argvalue.indexOf(":") == (argvalue.length - 1))
            return false;
        else if (argvalue.charAt(argvalue.indexOf(":") + 1) == ".")
            return false;
        argvalue = argvalue.substring(0, argvalue.indexOf(":"));
        if (argvalue.charAt(argvalue.length - 1) == ".")
            return false;
    }

    return true;
}

//Trim leading spaces
function ltrim(argvalue) {
    while (1) {
        if (argvalue.substring(0, 1) != " ")
            break;
        argvalue = argvalue.substring(1, argvalue.length);
    }

    return argvalue;
}

//Trim trailing spaces
function ttrim(argvalue) {
    while (1) {
        if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
            break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }

    return argvalue;
}