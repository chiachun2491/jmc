 $(document).ready(function() {
     
     var api_url = "https://script.google.com/macros/s/AKfycbylOAQYrrVJM1F1lhzVVs69ERBqTde_D8FWC_hh9M6ce2e3Ip8u/exec?callback=?";

     $('#StdID').keypress(function(e){
         if(e.keyCode==13)
             $('#searchBtn').click();
     });

     $("#searchBtn").on('click',function(){
             
         var num = document.getElementById("StdID").value;

         $.getJSON(api_url, {id:num,mode:'search'})
         .done (function (data) {
             
             console.log(data);
             
             $("#ID").text(data.ID);
             $("#Name").text(data.Name);
             $("#Dept").text(data.Dept);
             $("#Phone").text(data.Phone);
             $("#Table").text(data.Table);
             $("#Period").text(data.Period);
             $("#PlayerNo").text(data.playerNo);
             if (data.Money)
                 {
                     if (data.Back!='#N/A')
                         {
                             $("#moneyBtn").prop('disabled', true); //TO DISABLE
                             $("#moneyBtn").text('退費已完成');                   
                         }
                     else
                         {
                             $("#moneyBtn").prop('disabled', false); //TO ENABLE
                             $("#moneyBtn").text('點此確認退費');  
                         }
                 }
             else
                 {
                     $("#moneyBtn").prop('disabled', true); //TO DISABLE
                     $("#moneyBtn").text('無須退費');
                 }
             if (data.Checked_1 !='#N/A')
             {
                 $("#checkBtn_1").prop('disabled', true); //TO DISABLE
                 $("#checkBtn_1").text('已完成報到(1)');
             }
             else
             {
                 $("#checkBtn_1").prop('disabled', false); //TO ENABLE
                 $("#checkBtn_1").text('點此報到(1)');  
             }
             if (data.Checked_2 !='#N/A')
             {
                 $("#checkBtn_2").prop('disabled', true); //TO DISABLE
                 $("#checkBtn_2").text('已完成報到(2)');
             }
             else
             {
                 $("#checkBtn_2").prop('disabled', false); //TO ENABLE
                 $("#checkBtn_2").text('點此報到(2)');  
             }
                    
         })
         .fail(function(jqxhr, textStatus, error) {
             var err = textStatus + ", " + error;
             console.log( "Request Failed: " + err );
             $("#response").animate({
                 height: '+=2rem'
             }, 300);
             $('<div class="alert alert-danger">' + '<strong>授權驗證失敗</strong>：請先' +
               '<a href="'+ api_url +'&mode=login" target="_blank" class="alert-link">登入</a>。'+
               '</div>').hide().appendTo('#response').fadeIn(1000);
             $(".alert").delay(9000).fadeOut(
                 "normal",
                 function(){
                     $(this).remove();
                 });
             $("#response").delay(10000).animate({
                 height: '-=2rem'
             }, 300);

         });
     });
         
     $("#moneyBtn").on('click',function(){
         
         var num = document.getElementById("ID").textContent;
         
         $.getJSON(api_url, {id:num,mode:'money'}, function (data) {
             
             console.log(data);
             if (data.resultStr == 'moneyed')
                 {
                     $("#moneyBtn").prop('disabled', true); //TO DISABLE
                     $("#moneyBtn").text('已確認退費');
                 }
         });
     });
     
     $("#checkBtn_1").on('click',function(){
         
         var num = document.getElementById("ID").textContent;
         
         $.getJSON(api_url, {id:num,mode:'check',round:1}, function (data) {
             
             console.log(data);
             if (data.resultStr == 'checked')
                 {
                     $("#StdID").val("");
                     $("#checkBtn_1").prop('disabled', true); //TO DISABLE
                     $("#checkBtn_1").text('已報到成功');
                 }
         });
     });
     $("#checkBtn_2").on('click',function(){
         
         var num = document.getElementById("ID").textContent;
         
         $.getJSON(api_url, {id:num,mode:'check',round:2}, function (data) {
             
             console.log(data);
             if (data.resultStr == 'checked')
                 {
                     $("#StdID").val("");
                     $("#checkBtn_2").prop('disabled', true); //TO DISABLE
                     $("#checkBtn_2").text('已報到成功');
                 }
         });
     });
 });
        