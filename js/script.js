// var lights = [
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,true,false,false],
//     [false,false,false,false,false,false,false,false]
// ];

var content = null;
var setupGrid = function() {};

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
        html += '<tr data-num=' + (i + 1) + '>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            html += '<td data-num=' + (j + 1) + ' ' + ' class="' + value + '">';
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

var getCell = function(row, col) {
    return $('tr[data-num=' + row + '] td[data-num=' + col + ']');
}

var flip = function(el, color) {
    $(el).closest('td').toggleClass(color);
};

var flipPlus = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td, color);
    flip(td.next(), color);
    flip(td.prev(), color);
    flip(tr.prev().find('td')[tdnum], color);
    flip(tr.next().find('td')[tdnum], color);
};

var flipX = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td, color);
    flip(tr.prev().find('td')[tdnum-1], color);
    flip(tr.prev().find('td')[tdnum+1], color);
    flip(tr.next().find('td')[tdnum-1], color);
    flip(tr.next().find('td')[tdnum+1], color);
};

var flipRing = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td.next(), color);
    flip(td.prev(), color);
    flip(tr.prev().find('td')[tdnum], color);
    flip(tr.next().find('td')[tdnum], color);
    flip(tr.prev().find('td')[tdnum-1], color);
    flip(tr.prev().find('td')[tdnum+1], color);
    flip(tr.next().find('td')[tdnum-1], color);
    flip(tr.next().find('td')[tdnum+1], color);
};

var flipExtendedPlus = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.attr('data-num');

    flip(td.siblings(), color);
    flip($('td[data-num=' + tdnum + ']'), color);
};

var flipExtendedX = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip(td, color);
    $.each(Array(8), function(i, n) {
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum - i) + ']'), color);
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum - i) + ']'), color);
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum + i) + ']'), color);
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum + i) + ']'), color);
    });
};

var flipOpposite = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip($('tr[data-num=' + (8-trnum+1) + '] td[data-num=' + (8-tdnum+1) + ']'), color);
};

var rotateRing = function(el, color) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    states = [
        [
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class'),
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').attr('class'),
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class')
        ],
        [
            td.prev().attr('class'),
            td.attr('class'),
            td.next().attr('class')
        ],
        [
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class'),
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').attr('class'),
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class')
        ]
    ]

    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class', states[2][2]);
    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').attr('class', states[2][1]);
    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class', states[2][0]);
    td.prev().attr('class', states[1][2]);
    td.next().attr('class', states[1][0]);
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class', states[0][2]),
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').attr('class', states[0][1]),
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class', states[0][0])
}

var flipBetween = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

};

var elements = [];

var turnOn = function(r, c, color) { flip(getCell(r, c), color); };

var redSphere = function(r, c) { flip(getCell(r, c), 'r'); elements.push('sphere')};
var redCube = function(r, c) { flipX(getCell(r, c), 'r'); elements.push('cube')};
var redTetra = function(r, c) { flipPlus(getCell(r, c), 'r'); elements.push('tetra')};
// var blueSphere = function(r, c) { flip(getCell(r, c), 'b'); elements.push('sphere')};
var blueCube = function(r, c) { flipExtendedX(getCell(r, c), 'b'); elements.push('cube')};
var blueTetra = function(r, c) { flipExtendedPlus(getCell(r, c), 'b'); elements.push('tetra')};
var yellowSphere = function(r, c) { flipRing(getCell(r, c), 'y'); elements.push('sphere')};
var yellowCube = function(r, c) { flipOpposite(getCell(r, c), 'y'); elements.push('cube')};
var yellowTetra = function(r, c) { rotateRing(getCell(r, c), 'y'); elements.push('tetra')};

$(function() {
    makeTable(data, content);
    setupGrid();

    els = '';
    elements.sort();
    $.each(elements, function(i, shape) {
        els += '<span class="shape ' + shape + '" href="#"></span>';
    });
    $('#elements').html(els);

    $('.red .sphere').click(function(e) {
        e.preventDefault();
        flip($(this).closest('td'), 'r');
        flip(this, 'r');
    });

    $('.red .cube').click(function(e) {
        e.preventDefault();
        flipX(this, 'r');
    });

    $('.red .tetra').click(function(e) {
        e.preventDefault();
        flipPlus(this, 'r');
    });

    $('.blue .sphere').click(function(e) {
        e.preventDefault();
        flipBetween(this, 'b');
    });

    $('.blue .cube').click(function(e) {
        e.preventDefault();
        flipExtendedX(this, 'b');
    });

    $('.blue .tetra').click(function(e) {
        e.preventDefault();
        flipExtendedPlus(this, 'b');
    });

    $('.yellow .sphere').click(function(e) {
        e.preventDefault();
        flipRing(this, 'y');
    });

    $('.yellow .cube').click(function(e) {
        e.preventDefault();
        flipOpposite(this, 'y');
    });

    $('.yellow .tetra').click(function(e) {
        e.preventDefault();
        rotateRing(this, 'y');
    });
});
