$(function(){
    var html = '<table>';
    $.each(data, function(i, value) {
        html += '<tr>';
        $.each(value, function(i, value) {
            html += '<td class="' + value + '"></td>';
        });
        html += '</tr>';
    });
    html += '</table>';

    $('body').html(html);
});
