var makeTable = function(classes, content) {
    var html = '<table>';
    var clickable = $('body').hasClass('clickable');
    $.each(classes, function(i, value) {
        html += '<tr>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            if (clickable) {
                html += '<td><a class="on ' + value + '" href="/">' + text + '</a></td>';
            } else {
                html += '<td class="on ' + value + '">' + text + '</td>';
            }
        });
        html += '</tr>';
    });
    html += '</table>';

    $('.container').html(html);
}

$(function() {
    makeTable(data, content);

    $('table a').click(function(e) {
        $(this).addClass('on').toggleClass(toggleColor);
        e.preventDefault();
    });
});
