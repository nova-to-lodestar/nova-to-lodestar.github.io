// var lights = [
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,true,false,false],
//     [false,false,false,false,false,false,false,false]
// ];

var DEBUG = true;

var setupGrid = function() {};
var ready = false;

var colors = [
    'white'
]

var shapes = [
    'sphere'
]

var makeTable = function() {
    var allPage = $('body').hasClass("all");

    var html = '<table id="' + slug + '">';
    $.each(new Array(5), function(i, value) {
        html += '<tr data-num=' + (i + 1) + '>';
        $.each(new Array(5), function(j, value) {
            html += '<td data-num=' + (j + 1) + ' data-shape class="">';
            if (!allPage) {
                $.each(colors, function(k, color) {
                    html += '<div class="' + color + '">'
                    $.each(shapes, function(l, shape) {
                        html += '<a class="shape ' + shape + '" href="/"></a>';
                    });
                    html += '</div>'
                });
            }
        });
        html += '</tr>';
    });
    html += '</table>';

    var containerSelector = ".container-" + slug;
    if (!allPage) {
        containerSelector = ".container-single";
    }
    $(containerSelector).html(html);
}

var getCell = function(row, col) {
    return $('#' + slug).find('tr[data-num=' + row + '] td[data-num=' + col + ']');
}

var isDone = function() {
    if (ready && $('td.r, td.b, td.y, td.p, td.o, td.g, td.w').length == 0) {
        $('#success').trigger('play');
        $('td').addClass('blink-success');
    }
}

var flip = function(el, color) {
    if (toggleColor == 'w') {
        color = "w";
    }
    $(el).toggleClass(color);
};

var flipOne = function(el, color) {
    flip($(el).closest('td'), color);

    isDone();
};

var flipPlus = function(el, color, middle) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    if (middle) {
        flip(td, color);
    }
    flip(td.next(), color);
    flip(td.prev(), color);
    flip(tr.prev().find('td')[tdnum], color);
    flip(tr.next().find('td')[tdnum], color);

    isDone();
};

var flipX = function(el, color, middle) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    if (middle) {
        flip(td, color);
    }
    flip(tr.prev().find('td')[tdnum-1], color);
    flip(tr.prev().find('td')[tdnum+1], color);
    flip(tr.next().find('td')[tdnum-1], color);
    flip(tr.next().find('td')[tdnum+1], color);

    isDone();
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

    isDone();
};

var flipExtendedPlus = function(el, color, middle) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.attr('data-num');

    flip(td.siblings(), color);
    flip(table.find('td[data-num=' + tdnum + ']'), color);
    if (!middle) {
        flip(td, color);
    }

    isDone();
};

var flipExtendedX = function(el, color, middle) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    if (middle) {
        flip(td, color);
    }
    $.each(Array(8), function(i, n) {
        flip(table.find('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum - i) + ']'), color);
        flip(table.find('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum - i) + ']'), color);
        flip(table.find('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum + i) + ']'), color);
        flip(table.find('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum + i) + ']'), color);
    });

    isDone();
};

var flipOpposite = function(el, color) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip(table.find('tr[data-num=' + (8-trnum+1) + '] td[data-num=' + (8-tdnum+1) + ']'), color);

    isDone();
};

var rotateRing = function(el, color) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    var states = [
        [
            table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class'),
            table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').attr('class'),
            table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class')
        ],
        [
            td.prev().attr('class'),
            td.attr('class'),
            td.next().attr('class')
        ],
        [
            table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class'),
            table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').attr('class'),
            table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class')
        ]
    ];

    console.log(states);

    console.log(table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']'), states[2][2]);

    table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class', states[2][2]);
    table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum) + ']').attr('class', states[2][1]);
    table.find('tr[data-num=' + (trnum - 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class', states[2][0]);
    td.prev().attr('class', states[1][2]);
    td.next().attr('class', states[1][0]);
    table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum - 1) + ']').attr('class', states[0][2]),
    table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum) + ']').attr('class', states[0][1]),
    table.find('tr[data-num=' + (trnum + 1) + '] td[data-num=' + (tdnum + 1) + ']').attr('class', states[0][0])
}

var flipBetween = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    var dotsInRow = tr.find('[data-shape=sphere][data-color=blue]').toArray();
    var column = $('td[data-num=' + tdnum + ']').toArray();
    var dotsInCol = $('td[data-num=' + tdnum + '][data-shape=sphere][data-color=blue]');


    dotsInRow.pop();
    $.each(dotsInRow, function(i, dot) {
        flip($(dot).nextUntil('[data-shape=sphere][data-color=blue]'), 'b');
    });

    if (dotsInCol.length > 1) {
        var relevant = column.slice($(dotsInCol[0]).parent().attr('data-num'), parseInt($(dotsInCol[1]).parent().attr('data-num')) - 1);
        $.each(relevant, function (i, panel) {
            flip(panel, 'b');
        });
    }

    isDone();
};

var elements = [];
var usedColors = new Set();

var turnOn = function(r, c) { flip(getCell(r, c), 'w'); };

var redSphere = function(r, c) { flip(getCell(r, c), 'r'); };
var redCube = function(r, c) { flipX(getCell(r, c), 'r'); };
var redTetra = function(r, c) { flipPlus(getCell(r, c), 'r'); };
// var blueSphere = function(r, c) { flip(getCell(r, c), 'b');'sphere')};
var blueCube = function(r, c) { flipExtendedX(getCell(r, c), 'b'); };
var blueTetra = function(r, c) { flipExtendedPlus(getCell(r, c), 'b'); };
var yellowSphere = function(r, c) { flipRing(getCell(r, c), 'y'); };
var yellowCube = function(r, c) { flipOpposite(getCell(r, c), 'y'); };

var white000 = function(r, c) { flipPlus(getCell(r, c), 'w', true); };
var white001 = function(r, c) { flipX(getCell(r, c), 'w', true); };

var shape = function(el, color, shape) {
    var el = $(el).closest('td');
    if (el.attr('data-shape')) {
        el.attr('data-shape', '');
        el.attr('data-color', '');
        return false;
    }
    el.attr('data-color', color);
    el.attr('data-shape', shape);
    return true;
};

$(function() {
    makeTable();
    setupGrid();

    els = '';
    questionMarks = '';
    elements.sort();
    $.each(elements, function(i, shape) {
        els += '<span class="shape ' + shape + '" href="#"></span><br>';
        questionMarks += "?<br>";
    });
    $('#elements').html(els);
    $('.hidden-elements').html(questionMarks + "<span class='reveal'>Reveal elements for 50% of value.</span>");

    ready = true;

    $('.refresh').click(function () {
        location.reload();
    })

    $('.hidden-elements').click(function () {
        $(this).hide();
        $('#elements').show();
        $('.value').html($('.newvalue').html());
    });

    $('.white .sphere').click(function(e) {
        e.preventDefault();
        var cross = $("#controls input[name='cross']:checked").val();
        var middle = $("#controls input[name='middle']:checked").val();
        var stretch = $("#controls input[name='stretch']:checked").val();

        var code = "c" + stretch + middle + cross;

        console.log(code);

        switch(code) {
            case "c000":
                flipPlus(this, 'w', true);
                break;
            case "c001":
                flipX(this, 'w', true);
                break;
            case "c010":
                flipPlus(this, 'w', false);
                break;
            case "c011":
                flipX(this, 'w', false);
                break;
            case "c100":
                flipExtendedPlus(this, 'w', true);
                break;
            case "c101":
                flipExtendedX(this, 'w', true);
                break;
            case "c110":
                flipExtendedPlus(this, 'w', false);
                break;
            case "c111":
                flipExtendedX(this, 'w', false);
                break;
        }

    });

    $('.red .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'sphere');
        flipOne(this, 'r');
    });

    $('.red .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'cube');
        flipX(this, 'r');
    });

    $('.red .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'tetra');
        flipPlus(this, 'r');
    });

    $('.blue .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'sphere');
        flipBetween(this, 'b');
    });

    $('.blue .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'cube');
        flipExtendedX(this, 'b');
    });

    $('.blue .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'tetra');
        flipExtendedPlus(this, 'b');
    });

    $('.yellow .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'sphere');
        flipRing(this, 'y');
    });

    $('.yellow .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'cube');
        flipOpposite(this, 'y');
    });

    $('.yellow .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'tetra');
        rotateRing(this, 'y');
    });
});
