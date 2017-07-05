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
            // lit = lights[i][j] ? "data-lit" : "";
            lit = "";
            html += '<td data-num=' + (j + 1) + ' ' + lit + ' class="' + value + '">';
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

var flip = function(el) {
    $(el).toggleClass(toggleColor);
};

var flipPlus = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(td.next());
    flip(td.prev());
    flip(tr.prev().find('td')[tdnum]);
    flip(tr.next().find('td')[tdnum]);
};

var flipX = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(tr.prev().find('td')[tdnum-1]);
    flip(tr.prev().find('td')[tdnum+1]);
    flip(tr.next().find('td')[tdnum-1]);
    flip(tr.next().find('td')[tdnum+1]);
};

var flipPerimeter = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td.next());
    flip(td.prev());
    flip(tr.prev().find('td')[tdnum]);
    flip(tr.next().find('td')[tdnum]);
    flip(tr.prev().find('td')[tdnum-1]);
    flip(tr.prev().find('td')[tdnum+1]);
    flip(tr.next().find('td')[tdnum-1]);
    flip(tr.next().find('td')[tdnum+1]);
};

var flipExtendedPlus = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.attr('data-num');

    flip(td.siblings());
    flip($('td[data-num=' + tdnum + ']'));
};

var flipExtendedX = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip(td);
    $.each(Array(8), function(i, n) {
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum - i) + ']'));
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum - i) + ']'));
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum + i) + ']'));
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum + i) + ']'));
    });
};

var flipOpposite = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip($('tr[data-num=' + (8-trnum+1) + '] td[data-num=' + (8-tdnum+1) + ']'));
};

var rotatePerimeter = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    states = [
        [
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').hasClass(toggleColor),
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').hasClass(toggleColor),
            $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').hasClass(toggleColor)
        ],
        [
            td.prev().hasClass(toggleColor),
            td.hasClass(toggleColor),
            td.next().hasClass(toggleColor)
        ],
        [
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').hasClass(toggleColor),
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').hasClass(toggleColor),
            $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').hasClass(toggleColor)
        ]
    ]

    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').toggleClass(toggleColor, states[2][2]);
    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').toggleClass(toggleColor, states[2][1]);
    $('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').toggleClass(toggleColor, states[2][0]);
    td.prev().toggleClass(toggleColor, states[1][2]);
    td.next().toggleClass(toggleColor, states[1][0]);
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').toggleClass(toggleColor, states[0][2]),
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').toggleClass(toggleColor, states[0][1]),
    $('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').toggleClass(toggleColor, states[0][0])
}

var elements = [];

var redSphere = function(r, c) { flip(getCell(r, c)); elements.push('sphere')};
var redCube = function(r, c) { flipX(getCell(r, c)); elements.push('cube')};
var redTetra = function(r, c) { flipPlus(getCell(r, c)); elements.push('tetra')};
// var blueSphere = function(r, c) { flip(getCell(r, c)); elements.push('sphere')};
var blueCube = function(r, c) { flipExtendedX(getCell(r, c)); elements.push('cube')};
var blueTetra = function(r, c) { flipExtendedPlus(getCell(r, c)); elements.push('tetra')};
var yellowSphere = function(r, c) { flipPerimeter(getCell(r, c)); elements.push('sphere')};
var yellowCube = function(r, c) { flipOpposite(getCell(r, c)); elements.push('cube')};
var yellowTetra = function(r, c) { rotatePerimeter(getCell(r, c)); elements.push('tetra')};

$(function() {
    makeTable(data, content);
    setupGrid();

    els = '';
    console.log(elements);
    $.each(elements, function(i, shape) {
        els += '<span class="shape ' + shape + '" href="#"></span>';
    });
    $('#elements').html(els);

    $('.red .sphere').click(function(e) {
        e.preventDefault();
        flip($(this).closest('td'));
    });

    $('.red .cube').click(function(e) {
        e.preventDefault();
        flipX(this);
    });

    $('.red .tetra').click(function(e) {
        e.preventDefault();
        flipPlus(this);
    });

    $('.blue .cube').click(function(e) {
        e.preventDefault();
        flipExtendedX(this);
    });

    $('.blue .tetra').click(function(e) {
        e.preventDefault();
        flipExtendedPlus(this);
    });

    $('.yellow .sphere').click(function(e) {
        e.preventDefault();
        flipPerimeter(this);
    });

    $('.yellow .cube').click(function(e) {
        e.preventDefault();
        flipOpposite(this);
    });

    $('.yellow .tetra').click(function(e) {
        e.preventDefault();
        rotatePerimeter(this);
    });
});
