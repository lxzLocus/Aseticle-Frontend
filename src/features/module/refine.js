import fs from 'fs'

export default refine

function getStaticProps(){

}

// ここを呼び出す
// 01
var refine = function (originJsonArray, options) {
    var returnArray = [];
    // 日付フィルタ
    if (options.refineDate === "0") {
        returnArray = originJsonArray.filter(function (item) { return parseInt(item.date) >= parseInt(options.refineDate); });
    }
    else {
        options.refineDate = options.refineDate.slice(-2);
        options.refineDate = options.refineDate + "0101";
        returnArray = originJsonArray.filter(function (item) { return parseInt(item.date) >= parseInt(options.refineDate); });
    }
    // acm, arxiv, ieee中でtrueの項目の要素を絞込み
    if (options.acm === true || options.arxiv === true || options.ieee === true) {
        returnArray = returnArray.filter(function (item) {
            var domain = new URL(item.url).hostname;
            if (options.acm && domain === 'dl.acm.org')
                return true;
            if (options.arxiv && domain === 'arxiv.org')
                return true;
            if (options.ieee && domain === 'ieeexplore.ieee.org')
                return true;
            return false;
        });
    }
    returnArray = sort(options.type, options.sortType, returnArray);
    return returnArray;
};
// 02
var sort = function (type, sortType, nowJsonArray) {
    var returnArray = [];
    switch (type) {
        case "日付":
            if (sortType === "昇順") {
                returnArray = sortByDateAsc(nowJsonArray);
            }
            else {
                returnArray = sortByDateDesc(nowJsonArray);
            }
            break;
        case "関連度":
            if (sortType === "昇順") {
                console.log(nowJsonArray)
                returnArray = sortByRelevantNoAsc(nowJsonArray);
            }
            else {
                console.log(nowJsonArray)
                returnArray = sortByRelevantNoDesc(nowJsonArray);
            }
            break;
        case "学会ランク":
            if (sortType === "昇順") {
                console.log(nowJsonArray)
                returnArray = sortByTierAsc(nowJsonArray);
            }
            else {
                console.log(nowJsonArray)
                returnArray = sortByTierDesc(nowJsonArray);
            }
            break;
        /*case "学会学術誌名":
            if (sortType === "昇順") {
                returnArray = sortByConferenceAsc(nowJsonArray);
            }
            else {
                returnArray = sortByConferenceDesc(nowJsonArray);
            }
            break;*/
        case "被引用数":
            if (sortType === "昇順") {
                returnArray = sortByCiteNumAsc(nowJsonArray);
            }
            else {
                returnArray = sortByCiteNumDesc(nowJsonArray);
            }
            break;
    }
    return returnArray;
};
// 日付昇順に並べ替える関数
function sortByDateAsc(data) {
    return data.sort(function (a, b) {
        var dateCompare = a.date.localeCompare(b.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}
// 日付降順に並べ替える関数
function sortByDateDesc(data) {
    return data.sort(function (a, b) {
        var dateCompare = b.date.localeCompare(a.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}
// 関連度昇順に並べ替える関数
function sortByRelevantNoAsc(data) {
    return data.sort(function (a, b) { return a.relevant_no - b.relevant_no; });
}
// 関連度降順に並べ替える関数
function sortByRelevantNoDesc(data) {
    return data.sort(function (a, b) { return b.relevant_no - a.relevant_no; });
}
// 学会ランク昇順に並べ替える関数
function sortByTierAsc(data) {
    return data.sort(function (a, b) {
        var tierCompare = a.tier - b.tier;
        return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会ランク降順に並べ替える関数
function sortByTierDesc(data) {
    return data.sort(function (a, b) {
        var tierCompare = b.tier - a.tier;
        return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会・学術誌名昇順に並べ替える関数
/*function sortByConferenceAsc(data) {
    return data.sort(function (a, b) {
        var conferenceCompare = a.conference.localeCompare(b.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会・学術誌名降順に並べ替える関数
function sortByConferenceDesc(data) {
    return data.sort(function (a, b) {
        var conferenceCompare = b.conference.localeCompare(a.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}*/
// 被引用数昇順に並べ替える関数
function sortByCiteNumAsc(data) {
    return data.sort(function (a, b) {
        var citeNumCompare = a.cite_num - b.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}
// 被引用数降順に並べ替える関数
function sortByCiteNumDesc(data) {
    return data.sort(function (a, b) {
        var citeNumCompare = b.cite_num - a.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}
