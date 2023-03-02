var num = 1;
var src_img_left = "static/imgs/leftpor.jpg";
var src_img_right= "static/imgs/rightpor.jpg";
var witch_side;
$(function () {
    var sent_message = $("#input_text");
        sent_message.keydown(function (event) {
        if(event.keyCode == 13)
        {
            // var sentence = $("#input_text").val();
            Creat_chat();
            sent_message.val("");
            return false;
        }
    });
    sent_message.val("");
    var handle_time = setInterval(realTime,1000);

    /*
    * clicking Time will bring up a dialog box,then you can change the time as much as you want.
    * */
    $("#time_show").click(function () {
        if(Math.abs(handle_time))
        {
            clearInterval(handle_time);
            handle_time = 0;
        }
        var user_input = prompt("输入时间，类型XX:XX,注意用英文冒号呦😘");
        var time_reg = /[0-9]{2}:[0-9]{2}/
        if(time_reg.test(user_input))
        {
            $("#time_show").text(user_input);
        }
        else if(user_input!=null) {
            alert("输入的格式有误，再试一次把┑(￣Д ￣)┍");
            setInterval(realTime,1000);
        }
        else {
            setInterval(realTime,1000);
        }
    })

    /*clicking name will bring up a dialog box, then you can change the name as much as you want*/
    $("#friend_name").click(function () {
        var user_name = prompt("请输入昵称，限定8个字内呦");
        var name_reg = /^[^\s]{1,8}$/;
        if(name_reg.test(user_name)&&user_name!=null)
        {
            $("#friend_name").text(user_name);
        }
        else if(user_name==null) {}
        else {
            alert("不符合规范，禁止使用哦");
        }
    });

    /*clicking on a statement deletes the entry statement  */
    $(".chat_document_example > p,.chat_document_user > p").click(function () {
        $(this).parents("div")[0].remove();
        Auto_Change_top();
    });
    $(".leftpor_pic,.rightpor_pic").click(function () {
        witch_side = $(this).attr("class");
        $("#upload_pic").click();
    });

    $("#upload_pic").change(getAvatarUrl);
});
/*
* this function is mainly used to Create chat history
* */
function Creat_chat() {
    var div_num = $(".chat_document_user").length;
    var sentence = $("#input_text").val();
    sentence.replace(/[\f\n\r\t\v]/g,"");
    var sentence_reg = /^[ ]+$/;
    if(sentence!="" && !sentence_reg.test(sentence))
    {
        // alert("不是空而是"+sentence);
        var document_all = $("#phone_background_in");
        if(num % 2 == 1)
        {
            var document_user = $(".chat_document_user:last");
            var elem_img = document_user.children("img");
                elem_img.addClass("leftpor_pic")
                elem_img.attr("src",src_img_left);
            var elem_p =  document_user.children("p");
            elem_p.addClass("left_chat");
            elem_p.text(sentence);
            var p_height = elem_p.height();
            p_height +=30;
            document_user.attr("style","height:"+p_height+"px;top:"+(div_num-1)*30+"px");
            document_all.append("<div class=\"chat_document_user\"><img/><p></p></div>");
        }
        else {
            var document_user = $(".chat_document_user:last");
            var elem_img = document_user.children("img");
                elem_img.addClass("rightpor_pic")
                elem_img.attr("src",src_img_right);
            var elem_p =  document_user.children("p");
            elem_p.addClass("right_chat");
            elem_p.text(sentence);
            var p_height = elem_p.height();
            p_height +=30;
            document_user.attr("style","height:"+p_height+"px;top:"+(div_num-1)*30+"px");
            document_all.append("<div class=\"chat_document_user\"><img/><p></p></div>");
        }
        elem_p.click(function () {
            document_user.remove();
            Auto_Change_top();

        });
        elem_img.on("click",function () {
            witch_side = $(this).attr("class");
            $("#upload_pic").click();
        });
        num++;
    }
    else {
        alert("不允许发送空消息");
    }
    slideBottom();
}
/*
* the function  show the current time,it will change overtime.
* */
function realTime() {
    var obj = new Date();
    var hour = obj.getHours();
    var minute = obj.getMinutes();
    $("#time_show").text(hour+":"+minute);
}
/*自动修改删除后div的行高*/
function Auto_Change_top() {
    var $obj_cdu = $(".chat_document_user");
    var div_rows =$obj_cdu.length;
    for(var i=0;i<div_rows-1;i++)
    {
        var cdu_p = $($obj_cdu[i]).find("p")
        var p_height = cdu_p.height();
        p_height+=30;
        $($obj_cdu[i]).attr("style","height:"+p_height+"px;top:"+i*30+"px");
    }
}
/*Automatically slide to the bottom of the sidebar./自动滑到侧边栏最下面*/
function slideBottom() {
    $('#phone_background_in').prop('scrollTop',document.getElementById("phone_background_in").scrollHeight);
}

function getAvatarUrl() {
    var r = new FileReader();
    var file = $("#upload_pic")[0].files[0];
    console.log(file);
    r.readAsDataURL(file);
    r.onloadend = function (rEvent) {
        witch_side = "."+witch_side;
        if(witch_side==".leftpor_pic")
        {
            src_img_left = rEvent.target.result;
            $(witch_side).attr("src",src_img_left);
        }
        else {
            src_img_right = rEvent.target.result;
            $(witch_side).attr("src",src_img_right);
        }
        witch_side = null;
        $("#upload_pic").attr("value","");
    }
}