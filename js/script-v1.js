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
    'red',
    'blue',
    'yellow'
]

var shapes = [
    'sphere',
    'cube',
    'tetra'
]

var makeTable = function() {
    var allPage = $('body').hasClass("all");

    var html = '<table id="' + slug + '">';
    $.each(new Array(7), function(i, value) {
        html += '<tr data-num=' + (i + 1) + '>';
        $.each(new Array(7), function(j, value) {
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

    isDone();
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

var flipExtendedPlus = function(el, color) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.attr('data-num');

    flip(td.siblings(), color);
    flip(table.find('td[data-num=' + tdnum + ']'), color);

    isDone();
};

var flipExtendedX = function(el, color) {
    var table = $(el).closest('table');
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip(td, color);
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

var turnOn = function(r, c, color) { flip(getCell(r, c), color); };

var redSphere = function(r, c) { flip(getCell(r, c), 'r'); elements.push('sphere'); usedColors.add('r')};
var redCube = function(r, c) { flipX(getCell(r, c), 'r'); elements.push('cube'); usedColors.add('r')};
var redTetra = function(r, c) { flipPlus(getCell(r, c), 'r'); elements.push('tetra'); usedColors.add('r')};
// var blueSphere = function(r, c) { flip(getCell(r, c), 'b'); elements.push('sphere')};
var blueCube = function(r, c) { flipExtendedX(getCell(r, c), 'b'); elements.push('cube'); usedColors.add('b')};
var blueTetra = function(r, c) { flipExtendedPlus(getCell(r, c), 'b'); elements.push('tetra'); usedColors.add('b')};
var yellowSphere = function(r, c) { flipRing(getCell(r, c), 'y'); elements.push('sphere'); usedColors.add('y')};
var yellowCube = function(r, c) { flipOpposite(getCell(r, c), 'y'); elements.push('cube'); usedColors.add('y')};
var yellowTetra = function(r, c) { rotateRing(getCell(r, c), 'y'); elements.push('tetra'); usedColors.add('y')};

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

var checkInventory = function() {
    if (DEBUG) {
        return true;
    }

    var shapeCounts = _.countBy(elements, function(n) { return n; });

    var elementsOver = $('[data-shape!=""][data-color]').length > elements.length;

    var sphereOver = $('[data-shape=sphere]').length > (shapeCounts['sphere'] || 0);
    var cubeOver = $('[data-shape=cube]').length > (shapeCounts['cube'] || 0);
    var tetraOver = $('[data-shape=tetra]').length > (shapeCounts['tetra'] || 0);

    var redOver = $('[data-color=red]').length > 0 && !usedColors.has("r");
    var blueOver = $('[data-color=blue]').length > 0 && !usedColors.has("b");
    var yellowOver = $('[data-color=yellow]').length > 0 && !usedColors.has("y");

    var errorMessage = "";

    if (elementsOver) {
        errorMessage = "Error: too many minerals.";
    } else if (sphereOver || cubeOver || tetraOver) {
        errorMessage = "Error: wrong mineral shape.";
    } else if (redOver || blueOver || yellowOver) {
        errorMessage = "Error: wrong mineral color.";
    }

    if (errorMessage != "") {
        $('td').each(function(i) {
            $(this).attr('class', 'blink-fail-' + (Math.floor(Math.random() * 4) + 1));
        });
        $('.msg-box').html('<strong class="error">' + errorMessage + '</strong>')
        $('#fail').trigger('play');
        return false;
    }
    return true;
}

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

    $('.red .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'sphere');
        if (checkInventory()) {
            flipOne(this, 'r');
        }
    });

    $('.red .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'cube');
        if (checkInventory()) {
            flipX(this, 'r');
        }
    });

    $('.red .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'red', 'tetra');
        if (checkInventory()) {
            flipPlus(this, 'r');
        }
    });

    $('.blue .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'sphere');
        if (checkInventory()) {
            flipBetween(this, 'b');
        }
    });

    $('.blue .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'cube');
        if (checkInventory()) {
            flipExtendedX(this, 'b');
        }
    });

    $('.blue .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'blue', 'tetra');
        if (checkInventory()) {
            flipExtendedPlus(this, 'b');
        }
    });

    $('.yellow .sphere').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'sphere');
        if (checkInventory()) {
            flipRing(this, 'y');
        }
    });

    $('.yellow .cube').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'cube');
        if (checkInventory()) {
            flipOpposite(this, 'y');
        }
    });

    $('.yellow .tetra').click(function(e) {
        e.preventDefault();
        shape(this, 'yellow', 'tetra');
        if (checkInventory()) {
            rotateRing(this, 'y');
        }
    });
});
