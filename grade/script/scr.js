var api_url = "https://script.google.com/macros/s/AKfycbz6a7IvH4M-DM50m_wlt--w6V2HCzDMXSArAhigY1_iBlPIS08/exec?callback=?";

$(document).ready(function() {
    

    
//    var obj = {
//        "list" : [
//            {"table" : 1,
//            "player" :[
//            {"grade":1,"name":"Jeffery","status":"yes"},
//            {"grade":1,"name":"Jeffery","status":"yes"},
//            {"grade":1,"name":"Jeffery","status":"yes"},
//            {"grade":1,"name":"Jeffery","status":"yes"}
//        ]}
//        ]
//};

    //var obj = JSON.parse(result);//解析json字串為json物件形式
//    var trStr = '';//動態拼接table
//
//    $.each(obj.list, function(i, item) {
//            //now you can access properties using dot notation
//                trStr  += '<tr>';//拼接處規範的表格形式
//        trStr  += '<th scope="row">' +  obj.list[i].table  + '</th>';//資料表的主鍵值
//        
//        $.each(obj.list[i].player, function(j, item){
//        trStr  += '<td><div class="input-group input-group-sm mb-3"><div class="input-group-prepend">';
//        trStr  += '<span class="input-group-text">'  + obj.list[i].player[j].name + '</span>';
//        trStr  += '<span class="input-group-text">'  + obj.list[i].player[j].grade + '</span></div>';
//        trStr  += '</div><span class="badge badge-success">' +  obj.list[i].player[j].status  + '</span></td>';
//               });
//
//        trStr  += '</tr>';
//        console.log(trStr);
//        });
//
//
//    $("#tbody").html(trStr);

    /*
    
    <div class="input-group"><div class="input-group-prepend">
    <span class="input-group-text" id="">First and last name</span>
  </div>
  <input type="text" class="form-control" disabled>
  <input type="text" class="form-control" disabled></div>
                            <tr>
                <th scope="row">1</th>
                <td>
<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
      <span class="input-group-text" id="">xxx</span>  
  </div>
    <input type="text" class="form-control" id="" disabled>
    &nbsp;
    <span class="badge badge-success" id=""></span>
</div>
                </td>
                
                </tr>
    */
 });

function load(){

 var mode = $('select  option:selected').val();
        $.getJSON(api_url, {mode:mode})
            .done( function (obj) {
             
var trStr = '';//動態拼接table

    $.each(obj.list, function(i, item) {
            //now you can access properties using dot notation
                trStr  += '<tr>';//拼接處規範的表格形式
        trStr  += '<th scope="row">' +  obj.list[i].table  + '</th>';//資料表的主鍵值
        
        $.each(obj.list[i].player, function(j, item){
        trStr  += '<td><div class="input-group input-group-sm mb-3"><div class="input-group-prepend">';
        trStr  += '<span class="input-group-text">'  + obj.list[i].player[j].name + '</span>';
        trStr  += '<span class="input-group-text">'  + obj.list[i].player[j].grade + '</span></div>';
        trStr  += '</div><span class="badge badge-success">' +  obj.list[i].player[j].status  + '</span></td>';
               });

        trStr  += '</tr>';
        console.log(trStr);
        });
                        
    $("#tbody").html(trStr);
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

}