// var lights = [
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,true,false,false],
//     [false,false,false,false,false,false,false,false]
// ];

var data = [
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""]
];

var colors = [
    'red',
    'blue',
    'yellow'
]

var shapes = [
    'sphere',
    'cube',
    'tetra'
]

var makeTable = function(classes, content) {
    var html = '<table>';
    $.each(classes, function(i, value) {
        html += '<tr>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            // lit = lights[i][j] ? "data-lit" : "";
            lit = "";
            html += '<td ' + lit + ' class="' + value + '">';
            $.each(colors, function(k, color) {
                html += '<div class="' + color + '">'
                $.each(shapes, function(l, shape) {
                    html += '<a class="shape ' + shape + '" href="/"></a>';
                });
                html += '</div>'
            });
            html += '</a></td>';
            // html += '<td class="on ' + value + '">' + text + '</td>';
        });
        html += '</tr>';
    });
    html += '</table>';

    $('.container').html(html);
}

var flip = function(el) {
    $(el).toggleClass(toggleColor);
};

var flipPlus = function(el) {
    var td = $(el).parent();
    var tr = $(el).parent().parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(td.next());
    flip(td.prev());
    flip(tr.prev().find('td')[tdnum]);
    flip(tr.next().find('td')[tdnum]);
};

var flipX = function(el) {
    var td = $(el).parent();
    var tr = $(el).parent().parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(tr.prev().find('td')[tdnum-1]);
    flip(tr.prev().find('td')[tdnum+1]);
    flip(tr.next().find('td')[tdnum-1]);
    flip(tr.next().find('td')[tdnum+1]);
};

$(function() {
    makeTable(data, content);

    $('a.sphere').click(function(e) {
        e.preventDefault();
        flip($(this).parent());
    });

    $('a.cube').click(function(e) {
        e.preventDefault();
        flipX(this);
    });

    $('a.tetra').click(function(e) {
        e.preventDefault();
        flipPlus(this);
    });
});
