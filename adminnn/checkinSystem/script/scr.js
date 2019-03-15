var api_url = "https://script.google.com/macros/s/AKfycbylOAQYrrVJM1F1lhzVVs69ERBqTde_D8FWC_hh9M6ce2e3Ip8u/exec?callback=?";

$(document).ready(function() {
    
    // textbox support press enter
    $('#StdID').keypress(function(e){
        if(e.keyCode==13)
            $('#searchBtn').click();
    });
    
    $('#UIDnum').keypress(function(e){
        if(e.keyCode==13)
            $('#UIDsearchBtn').click();
    });
    
    $('#UIDnum_keyin').keypress(function(e){
        if(e.keyCode==13)
            $('#UIDkeyinBtn').click();
    });
    
    // searchBtn click event
    $("#searchBtn").on('click',function(){             
        var num = document.getElementById("StdID").value;
        search(num,'search');
    });
    
    $("#UIDsearchBtn").on('click',function(){ 
        var num = document.getElementById("UIDnum").value;
        search(num,'UIDsearch');
    });
    
    // checkBtn event     
    $("#moneyBtn").on('click',function(){
        var num = document.getElementById("ID").textContent;
        $.getJSON(api_url, {id:num,mode:'money'}, function (data) {
            if (data.resultStr == 'moneyed'){
                $("#moneyBtn").prop('disabled', true); //TO DISABLE
                $("#moneyBtn").text('已確認退費');
            }
        });
    });
    
    $("#checkBtn_1").on('click',function(){
        var num = document.getElementById("ID").textContent;
        check(num,1,"#checkBtn_1");
    });
    
    $("#checkBtn_2").on('click',function(){ 
        var num = document.getElementById("ID").textContent;
        check(num,2,"#checkBtn_2");
    });
    
    $("#checkBtn_32").on('click',function(){ 
        var num = document.getElementById("ID").textContent;
        check(num,32,"#checkBtn_32");
    });
    
    $("#checkBtn_16").on('click',function(){ 
        var num = document.getElementById("ID").textContent;
        check(num,16,"#checkBtn_16");
    });

    $("#checkBtn_4").on('click',function(){ 
        var num = document.getElementById("ID").textContent;
        check(num,4,"#checkBtn_4");
    });
    
    // UID keyin event
    $("#UIDkeyinBtn").on('click',function(){     
        var num = document.getElementById("ID").textContent;
        var UID = document.getElementById("UIDnum_keyin").value;
        
        $.getJSON(api_url, {id:num,mode:'UIDkeyin',UID:UID}, function (data) {
            if (data.resultStr == 'keyined'){
                $("#UIDnum_keyin").prop('disabled',true);
                $("#UIDkeyinBtn").prop('disabled', true); //TO DISABLE
                $("#UIDkeyinBtn").text('已建檔');
            }
        });
    });
});

function search(num,mode){
    $.getJSON(api_url, {id:num,mode:mode})
        .done (function (data) {
        console.log(data);
        $("#ID").text(data.ID);
        $("#Name").text(data.Name);
        $("#Dept").text(data.Dept);
        $("#Phone").text(data.Phone);
        $("#Table").text(data.Table);
        $("#Period").text(data.Period);
        $("#PlayerNo").text(data.playerNo);
        // UID Part
        $("#UIDnum_keyin").val(data.UID);
        if (data.UID==''){
            $("#UIDnum_keyin").prop('disabled',false);
            $("#UIDkeyinBtn").prop('disabled', false); //TO DISABLE
            $("#UIDkeyinBtn").text('輸入');  
        }
        else {
            $("#UIDnum_keyin").prop('disabled',true);
            $("#UIDkeyinBtn").prop('disabled', true); //TO ENABLE
            $("#UIDkeyinBtn").text('已建檔');  
        }
        // Money Status
        if (data.Money) {
            if (data.Back!='#N/A') {
                $("#moneyBtn").prop('disabled', true); //TO DISABLE
                $("#moneyBtn").text('退費已完成');                   
            }
            else {
                $("#moneyBtn").prop('disabled', false); //TO ENABLE             
                $("#moneyBtn").text('點此確認退費');  
            }
        }
        else {
            $("#moneyBtn").prop('disabled', true); //TO DISABLE
            $("#moneyBtn").text('無須退費');
        }
        // Checkbtn Status
        if (data.Checked_1 !='#N/A'){
            $("#checkBtn_1").prop('disabled', true); //TO DISABLE
            $("#checkBtn_1").text('已完成報到(1)');
        }
        else {
            $("#checkBtn_1").prop('disabled', false); //TO ENABLE
            $("#checkBtn_1").text('點此報到(1)');  
        }
        if (data.Checked_2 !='#N/A') {
            $("#checkBtn_2").prop('disabled', true); //TO DISABLE
            $("#checkBtn_2").text('已完成報到(2)');
        }
        else {
            $("#checkBtn_2").prop('disabled', false); //TO ENABLE
            $("#checkBtn_2").text('點此報到(2)');  
        }
        if (data.Checked_32 ==''){
            $("#checkBtn_32").prop('disabled',true);
            $("#checkBtn_32").text('未取得32強資格');
        } 
        else {
            if (data.Checked_32 == '#N/A'){
                $("#checkBtn_32").prop('disabled',false);
                $("#checkBtn_32").text('點此報到(32強)');
            }
            else{
                $("#checkBtn_32").prop('disabled',true);
                $("#checkBtn_32").text('已完成報到(32強)');
            }
        }
        if (data.Checked_16 ==''){
            $("#checkBtn_16").prop('disabled',true);
            $("#checkBtn_16").text('未取得16強資格');
        } 
        else {
            if (data.Checked_16 == '#N/A'){
                $("#checkBtn_16").prop('disabled',false);
                $("#checkBtn_16").text('點此報到(16強)');
            }
            else{
                $("#checkBtn_16").prop('disabled',true);
                $("#checkBtn_16").text('已完成報到(16強)');
            }
        }
        if (data.Checked_4 ==''){
            $("#checkBtn_4").prop('disabled',true);
            $("#checkBtn_4").text('未取得4強資格');
        } 
        else {
            if (data.Checked_4 == '#N/A'){
                $("#checkBtn_4").prop('disabled',false);
                $("#checkBtn_4").text('點此報到(4強)');
            }
            else{
                $("#checkBtn_4").prop('disabled',true);
                $("#checkBtn_4").text('已完成報到(4強)');
            }
        }
    })
        .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
        
        $("#response").animate({height: '+=2rem'}, 300);
        $('<div class="alert alert-danger">' + '<strong>授權驗證失敗</strong>：請先' +
          '<a href="'+ api_url +'&mode=login" target="_blank" class="alert-link">登入</a>。'+
          '</div>').hide().appendTo('#response').fadeIn(1000);
        $(".alert").delay(9000).fadeOut("normal",function(){$(this).remove();});
        $("#response").delay(10000).animate({height: '-=2rem'}, 300);
    });
}

function check(id,round,btnName){
    $.getJSON(api_url, {id:id,mode:'check',round:round}, function (data) {
        if (data.resultStr == 'checked'){
            $("#StdID").val("");
            $("#UIDnum").val("");
            $(btnName).prop('disabled', true); //TO DISABLE
            $(btnName).text('已報到成功');
        }
    });
}
