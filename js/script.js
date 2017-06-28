var content = null;

var makeTable = function(classes, content) {
    var html = '<table>';
    $.each(classes, function(i, value) {
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
}

$(function() {
    makeTable(data, content);
});