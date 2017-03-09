var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var rollCount = 0;
var checkedOffCount = 0;
var arrX = new Array();
var arrY = new Array();
var isKaritas = false;
var stopSim = true;

var dice = new Array();
dice[0] = new Array(["A"],
                    ["E","I"],
                    ["O","U","A"],
                    ["E","I","O","U"],
                    ["A","E","I","O","U"],
                    ["A","E","I","O","U","A"]);
dice[1] = new Array(["E"],
                    ["I","O"],
                    ["U","A","E"],
                    ["I","O","U","A"],
                    ["E","I","O","U","A"],
                    ["E","I","O","U","A","E"]);
dice[2] = new Array(["I"],
                    ["O","U"],
                    ["A","E","I"],
                    ["O","U","A","E"],
                    ["I","O","U","A","E"],
                    ["I","O","U","A","E","I"]);
dice[3] = new Array(["B","C","D","F"],
                    ["G","H","K","L"],
                    ["M","N","P","R"],
                    ["S","T","X","Z"]);

var virtues = [
    "KARITAS","FIDES","SPES","JUSTITIA","PRUDENTIA","TEMPERANTIA","FORTITUDO","PAX","CASTITAS","MISERICORDIA","OBEDIENTIA","TIMOR","PROUIDENTIA","DISCRETIO","PERSEUERANTIA","BONITAS","MODESTIA","LONGANIMITAS","MANSUETUDO","BENIGNITAS","SAPIENTIA","COMPUNCTIO","GAUDIUM","SOBRIETAS","DELECTATIO","SUAUITAS","ASTUTIA","SIMPLICITAS","HOSPITALITAS","PARCITAS","PATIENTIA","ZELUS","PAUPERTAS","LENITAS","VIRGINITAS","REUERENTIA","PIETAS","INDULGENTIA","ORATIO","AMOR","IUDICIUM","VIGILANTIA","MORTIFICATIO","INNOCENTIA","CONTRICIO","CONFESSIO","MATURITAS","SOLLICITUDO","CONSTANTIA","INTELLECTUS","SUSPIRATIO","FLETUS","HILARITAS","COMPASSIO","CONTINENTIA","HUMILITAS"
];

var vowel_rolls = [
    "111","112","113","114","115","116","122","123","124","125","126","133","134","135","136","144","145","146","155","156","166","222","223","224","225","226","233","234","235","236","244","245","246","255","256","266","333","334","335","336","344","345","346","355","356","366","444","445","446","455","456","466","555","556","566","666"
];

var cons_rolls = [
    [2,3,4],[1,4],[3,4],[4],[1,3,4],[3,4],[1,3,4],[3,4],[1,4],[1,3,4],[1,3,4],[3,4],[1,3,4],[1,3,4],[3,4],[1,3,4],[1,3,4],[2,3,4],[1,3,4],[1,2,3,4],[3,4],[1,3,4],[1,2,3],[1,3,4],[1,2,4],[4],[4],[1,2,3,4],[2,3,4],[1,3,4],[3,4],[2,4],[3,4],[2,3,4],[2,3,4],[3,4],[3,4],[1,2,3,4],[3,4],[3],[1,3],[2,3,4],[1,3,4],[1,3,4],[1,3,4],[1,3,4],[3,4],[1,2,4],[1,3,4],[1,2,3,4],[3,4],[1,2,4],[2,3,4],[1,3,4],[1,3,4],[2,3,4]
];

function initialize() {
    drawDie(1,20,40,2);
    drawDie(2,120,40,2);
    drawDie(3,220,40,2);
    drawDie(4,320,40,1);
    context.fillText("ROLL TO BEGIN",17,170);
}

function roll() {
    // Generate random numbers for the dice
    var rolls = [
        Math.floor((Math.random() * 6) + 1),
        Math.floor((Math.random() * 6) + 1),
        Math.floor((Math.random() * 6) + 1),
        Math.floor((Math.random() * 4) + 1)
    ];
    rollCount++;
    // Update the dice with the new rolls
    if(rolls[0]==1 && rolls[1]==1 && rolls[2]==1) {
        isKaritas = true;
    } else {
        isKaritas = false;
    }
    updateDice(rolls);
    drawGraph();
}

function simulate() {
    if (!stopSim) {
        stopSim = true;
        document.getElementById('startstop').innerHTML = "AUTO";
    }
    else {
        stopSim = false;
        document.getElementById('startstop').innerHTML = "STOP";
        var sim = setInterval(function() {
            if(checkedOffCount < 56 && !stopSim) {
                roll();
            } else {
                clearInterval(sim);
                document.getElementById('startstop').innerHTML = "AUTO";
            }
        }, 20);
    }
}

function stop() {
    stopSim = true;
}

function drawDie(id, x, y, val) {
    if(id < 4) {
        // Draw the square for the 6-sided dice
        context.beginPath();
        context.rect(x,y,80,80);
        context.fillStyle = '#f4fae1';
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.stroke();
        // Put the appropriate vowels on the die
        drawFace(id,x,y,val);
    } else if(id==4) {
        // Draw the triangle for the 4-sided die
        context.beginPath();
        context.fillStyle = '#f4fae1';
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.moveTo(x,y);
        context.lineTo(x+40,y+80);
        context.lineTo(x+80,y);
        context.closePath();
        context.fill();
        context.stroke();
        // Put the appropriate consonants on the die
        drawFace(id,x,y,val);
    }
}

function drawGraph() {
    var i;

    var xpos = 430;
    var ypos = 40;
    var bwd = 230;
    var bht = 180;

    context.rect(xpos, ypos, bwd, bht);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'blue';
    context.moveTo(xpos, ypos + bht);
    
    for (i=0; i<arrX.length; i++) {
        context.lineTo(xpos+arrX[i]*bwd/arrX[arrX.length-1], ypos + bht - bht/58*arrY[i]);
    }       
    context.stroke();
    
    context.fillStyle = 'black';
    context.font = "bold 14px Arial";
    
    context.fillText("0",xpos-20,ypos + bht + 5);
    context.fillText("28",xpos-20,ypos + bht/2 + 5);
    context.fillText("56",xpos-20,ypos + 5);
    
    context.fillText("0",xpos,ypos + bht + 15);
    context.fillText(String(Math.floor(rollCount/2)),xpos + bwd/2 - 10,ypos + bht + 15);
    context.fillText(String(rollCount),xpos + bwd - 20,ypos + bht + 15);
}

function drawFace(id, x, y, val) {
    context.fillStyle = 'black';
    context.font = "bold 20px Arial";
    switch(val) {
        case 1:
            switch(id) {
                case 1:
                    context.fillText("A",x+32,y+48);
                    break;
                case 2:
                    context.fillText("E",x+32,y+48);
                    break;
                case 3:
                    context.fillText("I",x+36,y+48);
                    break;
                case 4:
                    context.fillText("B",x+15,y+20);
                    context.fillText("C",x+55,y+20);
                    context.fillText("D",x+34,y+42);
                    context.fillText("F",x+34,y+66);
            }
            break;
        case 2:
            switch(id) {
                case 1:
                    context.fillText("E",x+5,y+20);
                    context.fillText("I",x+66,y+76);
                    break;
                case 2:
                    context.fillText("I",x+9,y+20);
                    context.fillText("O",x+62,y+76);
                    break;
                case 3:
                    context.fillText("O",x+5,y+20);
                    context.fillText("U",x+62,y+76);
                    break;
                case 4:
                    context.fillText("G",x+13,y+20);
                    context.fillText("H",x+55,y+20);
                    context.fillText("K",x+33,y+41);
                    context.fillText("L",x+33,y+66);
            }
            break;
        case 3:
            switch(id) {
                case 1:
                    context.fillText("O",x+5,y+20);
                    context.fillText("U",x+33,y+48);
                    context.fillText("A",x+62,y+76);
                    break;
                case 2:
                    context.fillText("U",x+5,y+20);
                    context.fillText("A",x+33,y+48);
                    context.fillText("E",x+62,y+76);
                    break;
                case 3:
                    context.fillText("A",x+5,y+20);
                    context.fillText("E",x+33,y+48);
                    context.fillText("I",x+66,y+76);
                    break;
                case 4:
                    context.fillText("M",x+15,y+20);
                    context.fillText("N",x+55,y+20);
                    context.fillText("P",x+34,y+42);
                    context.fillText("R",x+34,y+66);
            }
            break;
        case 4:
            switch(id) {
                case 1:
                    context.fillText("E",x+5,y+20);
                    context.fillText("I",x+66,y+20);
                    context.fillText("O",x+5,y+76);
                    context.fillText("U",x+62,y+76);
                    break;
                case 2:
                    context.fillText("I",x+9,y+20);
                    context.fillText("O",x+62,y+20);
                    context.fillText("U",x+5,y+76);
                    context.fillText("A",x+62,y+76);
                    break;
                case 3:
                    context.fillText("O",x+5,y+20);
                    context.fillText("U",x+62,y+20);
                    context.fillText("A",x+5,y+76);
                    context.fillText("E",x+62,y+76);
                    break;
                case 4:
                    context.fillText("S",x+15,y+20);
                    context.fillText("T",x+55,y+20);
                    context.fillText("X",x+34,y+42);
                    context.fillText("Z",x+34,y+66);
            }
            break;
        case 5:
            switch(id) {
                case 1:
                    context.fillText("A",x+5,y+20);
                    context.fillText("E",x+62,y+20);
                    context.fillText("I",x+38,y+48);
                    context.fillText("O",x+5,y+76);
                    context.fillText("U",x+62,y+76);
                    break;
                case 2:
                    context.fillText("E",x+5,y+20);
                    context.fillText("I",x+66,y+20);
                    context.fillText("O",x+33,y+48);
                    context.fillText("U",x+5,y+76);
                    context.fillText("A",x+62,y+76);
                    break;
                case 3:
                    context.fillText("I",x+9,y+20);
                    context.fillText("O",x+62,y+20);
                    context.fillText("U",x+33,y+48);
                    context.fillText("A",x+5,y+76);
                    context.fillText("E",x+62,y+76);
                    break;
            }
            break;
        case 6:
            switch(id) {
                case 1:
                    context.fillText("A",x+5,y+20);
                    context.fillText("E",x+62,y+20);
                    context.fillText("I",x+9,y+48);
                    context.fillText("O",x+61,y+48);
                    context.fillText("U",x+5,y+76);
                    context.fillText("A",x+62,y+76);
                    break;
                case 2:
                    context.fillText("E",x+5,y+20);
                    context.fillText("I",x+66,y+20);
                    context.fillText("O",x+5,y+48);
                    context.fillText("U",x+62,y+48);
                    context.fillText("A",x+5,y+76);
                    context.fillText("E",x+62,y+76);
                    break;
                case 3:
                    context.fillText("I",x+9,y+20);
                    context.fillText("O",x+62,y+20);
                    context.fillText("U",x+5,y+48);
                    context.fillText("A",x+62,y+48);
                    context.fillText("E",x+5,y+76);
                    context.fillText("I",x+66,y+76);
                    break;
            }
            break;
    }
}

function vowelsInRoll(rolls) {
    var vowels = new Array();
    for(var i=0; i<rolls.length-1; i++) {
        for(var j=0; j<dice[i][rolls[i]-1].length; j++) {
            vowels[vowels.length] = dice[i][rolls[i]-1][j];
        }
    }
    // console.log(vowels);
    return vowels;
}

function vowelsInVirtue(rolls) {
    var virtue = getVirtue(rolls, true);
    var vowelsOnly = virtue.replace(/[^aeiou]/ig,'');
    // console.log(vowelsOnly);
    return vowelsOnly;
}

function isCovered(die_vowels, virtue_vowels) {
    // Base cases:
    if(virtue_vowels.length == 0) {
        // If no more vowels left in word, then success
        return true;
    } else if(die_vowels.length == 0) {
        // If no more vowels left on dice, but some still in word, then failure
        return false;
    } else {
        // Regexp containing the first vowel on the dice
        var regexp = new RegExp(die_vowels[0],'i');
        // Remove that vowel from the word, if it is there
        virtue_vowels = virtue_vowels.replace(regexp,'');
        // Remove the first vowel on the dice from the list
        die_vowels.shift();
        // Repeat
        return isCovered(die_vowels,virtue_vowels);
    }
}

function updateDice(rolls) {
    // Clear the canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    // Draw the dice
    drawDie(1,20,40,rolls[0]);
    drawDie(2,120,40,rolls[1]);
    drawDie(3,220,40,rolls[2]);
    drawDie(4,320,40,rolls[3]);

    var idx = vowel_rolls.indexOf(vowels2string(rolls));
    // Get the virtue corresponding with the vowel rolls
    var virtue = getVirtue(rolls, false);

    $virtue_cell = $('#virtue'+(idx+1));
    var alreadyFound = $virtue_cell.hasClass('success');

    // console.log("CONSONANT CHECK: " + virtue.valid_cons);
    // console.log("VOWEL CHECK: " + virtue.valid_vowels);
    // Styling for virtue word
    context.font = "bold 40px Arial";
    context.fillText(virtue.word,17,170);

    if(alreadyFound) {
        context.font = "bold 24px Arial";
        context.fillStyle = "#ffcc11";
        context.fillText("ALREADY FOUND", 17, 200);
        context.fillText("NO NEED TO CHECK FURTHER", 17, 230);
    } else {
        // Styling for info
        context.font = "bold 24px Arial";
        if(virtue.valid_cons) {
            // If valid consonant has been rolled

            // SPECIAL CASE: Karitas
            if(isKaritas) {
                // Roll one more die to try for second A
                var newRoll = Math.floor((Math.random() * 6) + 1);
                if(newRoll <= 4) {
                    virtue.valid_vowels = true;
                } else {
                    virtue.valid_vowels = false;
                }
            }

            if(virtue.valid_vowels) {
                // If all vowels in virtue appear on the dice
                // Success, check off list
                context.fillStyle = "green";
                if(isKaritas) {
                    context.fillText("SECOND ROLL FOR KARITAS", 17, 200);
                    context.fillText("SUCCEEDED", 17, 230);
                } else {
                    context.fillText("SUCCESS", 17, 200);   
                }
                
                checkOff(idx);
            } else {
                // Not all vowels in the virtue appear on the dice
                context.fillStyle = "red";
                context.fillText("FAIL: INCOMPLETE VOWEL SET", 17, 200);
                if(isKaritas) {
                    context.fillText("SECOND ROLL FOR KARITAS", 17, 230);
                    context.fillText("FAILED", 17, 260);
                }
            }
        } else {
            // Valid consonant not rolled
            context.fillStyle = "red";
            context.fillText("FAIL: NO CONSONANT FOUND", 17, 200);
            if(!virtue.valid_vowels) {
                context.fillText("FAIL: INCOMPLETE VOWEL SET", 17, 230);
            }
        }
    }   
}

function getVirtue(rolls, wordOnly) {
    var idx = vowel_rolls.indexOf(vowels2string(rolls));
    if(wordOnly) {
        return virtues[idx];
    } else {
        var virtue = {};
        // Find the correct virtue
        virtue.word = virtues[idx];
        // Check if consonant roll is valid
        virtue.valid_cons = isIn(rolls[3],cons_rolls[idx]);
        // Check if vowel coverage is valid
        virtue.valid_vowels = isCovered(vowelsInRoll(rolls),vowelsInVirtue(rolls))
        return virtue;
    }
}

function checkOff(idx) {
    $virtue_cell = $('#virtue'+(idx+1));
    $roll_cell = $virtue_cell.next();

    if($virtue_cell.hasClass('success')) {
        // If virtue has already been checked off
        context.font = "bold 24px Arial";
        context.fillStyle = "black";
        context.fillText("(already recorded)",17,230);
    }
    else {
        // Check it off and record the roll number in the table
        $virtue_cell.addClass('success');
        $roll_cell.addClass('success');
        $roll_cell.html(rollCount);
        checkedOffCount++;

        arrX.push(rollCount);
        arrY.push(checkedOffCount);

        // Update progress bar
        updateProgress();
    }
}

function updateProgress() {
    var $bar = $('.progress-bar');
    $bar.width(checkedOffCount * 10);
    $bar.text(checkedOffCount+"/56");
}

function vowels2string(rolls) {
    var vowels = rolls.slice(0,3);
    // console.log(vowels);
    vowels.sort();
    return ""+vowels[0]+vowels[1]+vowels[2];
}

function isIn(val,array) {
    var present = false;
    for (var i = 0;i <= array.length - 1; i++) {
        if (array[i] == val) {
            present = true;
            break;
        }
    }
    return present;
}

window.onload = initialize();
