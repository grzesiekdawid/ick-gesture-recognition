window.TO_DEG = 180 / Math.PI;

var gestureMeanings = [
    "Cześć!",
    "Jak się masz?",
    "Wszystko w porządku.",
    "Grozisz mi?",
];

function isSignOfAngleNegative(hand, d1, d2) {
    var cross = Leap.vec3.create();
    Leap.vec3.cross(cross, d1, d2);
    var dir = Leap.vec3.dot(hand.palmNormal, cross);
    if (dir < 0) {
        return true;
    }
    return false;
}

// Set up the controller:
Leap.loop({
    background: true
}, {
    hand: function(hand) {
        var d1 = hand.indexFinger.proximal.direction(),
            d2 = hand.middleFinger.proximal.direction(),
            d3 = hand.ringFinger.proximal.direction();

        var angle12 = Math.acos(Leap.vec3.dot(d1, d2));
        var angle23 = Math.acos(Leap.vec3.dot(d2, d3));

        if (isSignOfAngleNegative(hand, d1, d2)) {
            angle12 *= -1;
        };

        var rad12 = angle12.toPrecision(2);
        var deg12 = (angle12 * TO_DEG).toPrecision(2);
        var deg23 = (angle23 * TO_DEG).toPrecision(2);
        var grabStrength = hand.grabStrength.toPrecision(2);

        recogniseGesture(deg12, deg23, grabStrength);

        $('#output_rad').html(rad12 + ' rad');
        $('#output_deg').html(deg12 + '°');
        $('#progress').width(angle12 * 100 + '%');
    }
});
// handle rad/deg UI
$('#output_rad, #output_deg').click(function() {
    $('#output_rad, #output_deg').toggle();
});

function writeMessage(text) {
    line = '<p>> ' + text + '</p>';
    $('#communication').html(line);
}

function recogniseGesture(deg12, deg23, grabStrength) {
    if ((Math.floor(deg12) > 19) && (Math.floor(deg23) < 10)) { // czesc
        writeMessage(gestureMeanings[0]);
    } else if ( (Math.floor(deg12) > 19) && (Math.floor(deg23) > 10)) { // Jak się masz?
        writeMessage(gestureMeanings[1]);
    } else if ((Math.floor(deg12) < -5)) { // wsztstko
        writeMessage(gestureMeanings[2]);
    } else if (grabStrength > 0.5) { // groza
        writeMessage(gestureMeanings[3]);
    } else {
        writeMessage('...');
    }
}