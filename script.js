var content = null;

$(function(){
    var html = '<table>';
    $.each(data, function(i, value) {
        html += '<tr>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            html += '<td class="' + value + '">' + text + '</td>';
        });
        html += '</tr>';
    });
    html += '</table>';

    $('body').html(html);
});
