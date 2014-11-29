
window.TO_DEG = 180 / Math.PI;

// Set up the controller:
Leap.loop({background: true}, {

  hand: function(hand){
    var d1 = hand.indexFinger.proximal.direction(),
        d2 = hand.middleFinger.proximal.direction();

    var angle = Math.acos(Leap.vec3.dot(d1, d2));

    var cross = Leap.vec3.create();
    Leap.vec3.cross(cross, d1, d2);

    var dir = Leap.vec3.dot(hand.palmNormal, cross);

    if (dir < 0) {
      angle *= -1;
    }

    var output_rad = document.getElementById('output_rad'),
      output_deg = document.getElementById('output_deg'),
      progress = document.getElementById('progress');

    var rad = angle.toPrecision(2);
    var deg = (angle * TO_DEG).toPrecision(2);
    output_rad.innerHTML = rad + ' rad';
    output_deg.innerHTML = deg + '°';

    progress.style.width = angle * 100 + '%';
    recogniseGesture(deg);
  }

});

// handle rad/deg UI

$('#output_rad, #output_deg').click(function(){
  $('#output_rad, #output_deg').toggle();
});

function recogniseGesture(deg) {
  switch(deg) {
    case '19':
      $('#communication').html('+19');
      break;
    case '-19':
      $('#communication').html('-19');
      break;
    default:
      $('#communication').html('');
  }
}