 $(document).ready(function() {
     
     var api_url = "https://script.google.com/macros/s/AKfycbxTH4a1F36f67G7G1Qlysk7o1S2KDZCsLvT4WgcOViZgo_0Lpai/exec?callback=?";

     $('#StdID').keypress(function(e){
         if(e.keyCode==13)
             $('#searchBtn').click();
     });

     $("#searchBtn").on('click',function(){
             
         var num = document.getElementById("StdID").value;

         $.getJSON(api_url, {id:num,mode:'search'}, function (data) {
             
             console.log(data);
             
             $("#ID").text(data.ID);
             $("#Name").text(data.Name);
             $("#Dept").text(data.Dept);
             $("#Phone").text(data.Phone);
             $("#Table").text(data.Table);
             $("#Period").text(data.Period);
             $("#PlayerNo").text(data.playerNo);
             if (data.Money != 0)
                 {
                     if (data.Back!=0)
                         {
                             $("#moneyBtn").prop('disabled', true); //TO DISABLE
                             $("#moneyBtn").text('已完成退費');                   
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
             if (data.Checked !=0)
             {
                 $("#checkBtn").prop('disabled', true); //TO DISABLE
                 $("#checkBtn").text('已完成報到');
             }
             else
             {
                 $("#checkBtn").prop('disabled', false); //TO ENABLE
                 // $("#checkBtn").addClass('btn-success');
                 $("#checkBtn").text('點此確認報到');  
             }
                    
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
     
     $("#checkBtn").on('click',function(){
         
         var num = document.getElementById("ID").textContent;
         
         $.getJSON(api_url, {id:num,mode:'check'}, function (data) {
             
             console.log(data);
             if (data.resultStr == 'checked')
                 {
                     $("#StdID").val("");
                     $("#checkBtn").prop('disabled', true); //TO DISABLE
                     $("#checkBtn").text('已確認報到');
                 }
         });
     });
            

 });
        