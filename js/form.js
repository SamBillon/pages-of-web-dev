var class_form;

function formJsInit() {
    class_form = document.forms['class-form'];
    console.log("done!");
}

setInterval(function () {
    if ($("input[name=personal-info]:checked").val() == "no") {
        $("#info-collector").css("display", "none");
    } else {
        $("#info-collector").css("display", "block");
    }
    if ($("#more-suggestion-checkbox").is(":checked")) {
        $("#more-suggestion").css("display", "inline-block");
    } else {
        $("#more-suggestion").css("display", "none");
    }
}, 100);

function isValidSchoolId(school_id) {
    if (typeof school_id != "string") return false;
    if (school_id.length != 10) return false;
    let regexp = /^2021[0-9]{6}/;
    return regexp.test(school_id);
}
function isValidEmailAddr(email_addr) {
    let regexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
    return regexp.test(email_addr);
}

function checkForm() {
    let result = "";
    if ($("input[name=personal-info]:checked").val() == "yes") {
        let school_id = $("input[name=school-id]").val();
        let email_addr = $("input[name=email-addr]").val();
        if (school_id == "") {
            alert("实名回答可不能不填学号！");
            return false;
        } else if (isValidSchoolId(school_id) == false) {
            alert("请检查是否是正确的学号！");
            return false;
        }
        if (email_addr == "") {
            alert("实名回答可不能不填邮箱！");
            return false;
        } else if (isValidEmailAddr(email_addr) == false) {
            alert("请检查是否是正确的邮箱！");
            return false;
        }
        result += "你选择实名回答问题，你的学号是 " + school_id + " 邮箱地址是 " + email_addr + "<br>";
    } else {
        result += "你选择匿名回答问题<br>";
    }

    result += "你认为学习这门课的收获";
    if ($("input[name=is-useful]:checked").val() == "yes") {
        result += "很大，";
    } else if ($("input[name=is-useful]:checked").val() == "no") {
        result += "不大，";
    } else {
        alert("请检查问题1是否已经回答！");
        return false;
    }
    result += "因为 ";
    if ($("textarea[name=useful-reason]").val() == "") {
        alert("请检查问题1是否已经回答！");
        return false;
    }
    result += $("textarea[name=useful-reason]").val() + "<br>";

    result += "你认为这门课教给你的最有用的是 ";
    if ($("textarea[name=useful-part]").val() == "") {
        alert("请检查问题2是否已经回答！");
        return false;
    }
    result += $("textarea[name=useful-part]").val() + "<br>";

    result += "你最感兴趣这门课的部分是 ";
    if ($("textarea[name=intrested-part]").val() == "") {
        alert("请检查问题3是否已经回答！");
        return false;
    }
    result += $("textarea[name=intrested-part]").val() + "<br>";

    if ($("input[name=suggestion]:checked").length == 0) {
        result += "你认为列表中的都不是什么好的意见<br>";
    } else {
        result += "你认为加入 "
        let check_box = $("input[name=suggestion]:checked")
        let has_more = false;
        check_box.each(function (index, item) {
            if ($(this).val() != "more") {
                result += $(this).val() + " ";
            } else if (index != 0) {
                has_more = true;
                result += "是非常好的提议，此外，你还认为应该加入 " + $("textarea[name=more-suggestion]").val() + " 相关的内容<br>";
            } else {
                has_more = true;
                result += $("textarea[name=more-suggestion]").val() + " 是非常好的提议<br>";
            }
            console.log(index);
        });
        if (has_more == false) {
            result += "是非常好的提议<br>";
        }
    }

    if ($("textarea[name=final-suggestion]").val() == "") {
        result += "你没有更多想说的了<br>";
    } else {
        result += "你还想说 " + $("textarea[name=final-suggestion]").val() + "<br>";
    }
    return result;
}

function submitForm() {
    let result = checkForm();
    if (result != false) {
        $("#submit-btn-container").append("下滚查看结果");
        $(".result-container").css("display", "block");
        $(".result-container").html("Result<br>" + result);
    }
}