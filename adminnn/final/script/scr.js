var api_url = "https://script.google.com/macros/s/AKfycbz6a7IvH4M-DM50m_wlt--w6V2HCzDMXSArAhigY1_iBlPIS08/exec?callback=?";

$(document).ready(getPlayerList());

function getPlayerList() {
    
    $.getJSON(api_url, {mode:"final",private:true})
        .done( function (obj) {
        var trStr = '';
        obj.list.sort((a,b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0)); 

        $.each(obj.list, function(i, item) {             
            if (obj.list[i].status<=4) styleStr = 'success">';
            else if (obj.list[i].status<=16) styleStr = 'primary">';
            else styleStr = 'secondary">';

            trStr +='<div class="col-md-3">';
            if(obj.list[i].status<=8){
                trStr += '<div><span class="badge badge-warning">第'+obj.list[i].status+'名</span></div>';
            }
            trStr +='<div class="btn-group" role="group" aria-label="First group">';
            trStr +='<button type="button" disabled class="btn btn-'+ styleStr;
            trStr += obj.list[i].name + '</button><button type="button" disabled class="btn btn-outline-';
            trStr += styleStr + obj.list[i].stdID+'</button></div></div>'
        });
                        
        $("#row-table").html(trStr);
        console.log("append");
        setTimeout('getPlayerList()',10000);
    })

        .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
        $("#response").animate({height: '+=2rem'}, 300);
        $('<div class="alert alert-danger">' + '<strong>Fail</strong>：' +
          err  +  '</div>').hide().appendTo('#response').fadeIn(1000);
        $(".alert").delay(9000).fadeOut("normal",function(){$(this).remove();});
        $("#response").delay(10000).animate({height: '-=2rem'}, 300);
    });

 }