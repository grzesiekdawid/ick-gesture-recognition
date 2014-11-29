window.TO_DEG = 180 / Math.PI;
var gestureMeanings = ["Cześć", "Jak się masz?", "Wszystko w porządku.", ];
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
        var cross = Leap.vec3.create();
        Leap.vec3.cross(cross, d1, d2);
        var dir = Leap.vec3.dot(hand.palmNormal, cross);
        if (dir < 0) {
            angle12 *= -1;
        }
        var output_rad = document.getElementById('output_rad'),
            output_deg = document.getElementById('output_deg'),
            progress = document.getElementById('progress');
        var rad12 = angle12.toPrecision(2);
        var deg12 = (angle12 * TO_DEG).toPrecision(2);
        var deg23 = (angle23 * TO_DEG).toPrecision(2);
        console.log(deg23);
        recogniseGesture(deg12, deg23);
        output_rad.innerHTML = rad12 + ' rad';
        output_deg.innerHTML = deg12 + '°';
        progress.style.width = angle12 * 100 + '%';
    }
});
// handle rad/deg UI
$('#output_rad, #output_deg').click(function() {
    $('#output_rad, #output_deg').toggle();
});

function recogniseGesture(deg12, deg23) {
    if ((Math.floor(deg12) == 19) && (Math.floor(deg23) == 4)) {
        $('#communication').html(gestureMeanings[0]);
    } else if (Math.floor(deg23) > 6) {
        $('#communication').html(gestureMeanings[2]);
    } else if ((Math.floor(deg12) == -19)) {
        $('#communication').html(gestureMeanings[1]);
    } else {
        $('#communication').html('');
    }
}