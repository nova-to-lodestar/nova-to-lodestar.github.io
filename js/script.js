var makeTable = function(classes, content) {
    var html = '<table>';
    $.each(classes, function(i, value) {
        html += '<tr>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            html += '<td><a class="on ' + value + '" href="/">' + text + '</a></td>';
        });
        html += '</tr>';
    });
    html += '</table>';

    $('.container').html(html);
}

$(function() {
    makeTable(data, content);

    $('table a').click(function(e) {
        $(this).addClass('on').toggleClass('w');
        e.preventDefault();
    });
});
