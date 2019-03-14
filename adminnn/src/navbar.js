$(document).ready(function() {
    var navStr = '';

    navStr += '<h5 class="my-0 mr-md-auto font-weight-normal"><strong>台科五系大麻賽 後台</strong></h5>';
    navStr += '<nav class="my-2 my-md-0 mr-md-3">';
     navStr += '<a class="p-2 text-dark" href="../checkinSystem/">檢錄系統</a>';
    navStr += '<a class="p-2 text-dark" href="../final/">複賽晉級名單</a>';
    navStr += '<a class="p-2 text-dark" href="../grade/">成績列表</a>';
    navStr += '<a class="p-2 text-dark" href="https://www.facebook.com/events/1181676268674234/">Facebook</a>';
    navStr += '<a class="p-2 text-dark" href="https://drive.google.com/drive/u/2/folders/0AFmqv0veLkL1Uk9PVA">小組雲端</a>';
    navStr += '</nav>';
    
    $("#navbar").html(navStr);
 });