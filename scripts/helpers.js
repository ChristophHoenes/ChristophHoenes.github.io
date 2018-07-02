// insert any functions that are useful throughout the experiment here
var shuffleComb = function(comb) {
    // while this one is trivial, this just to show that we CAN define a function here
    return _.shuffle(comb);
};
var create_random_trials = function(trial_number, prob_left, modus) {
  var color_i, size_i, shape_i, color, size, shape;
  if(prob_left > 1 || prob_left < 0) {
    prob_left = 0.5;
  }
  if(!Number.isInteger(trial_number * prob_left)) {
    console.log("WARNING: trial number and probability result in small representation error (no integer for left/right trials)");
  }
  var random_trials = [];
  if(modus == "normal") {
    color_i = Math.random();
    size_i = Math.random();
    shape_i = Math.random();
    if(color_i <= 0.25) {
      color = "yellow";
    } else if (color_i > 0.25 && color_i <= 0.5) {
      color = "red";
    } else if (color_i > 0.5 && color_i <= 0.75) {
      color = "green";
    } else {
      color = "blue";
    }
    if(size_i <= 0.25) {
      size = 15;
    } else if (size_i > 0.25 && size_i <= 0.5) {
      size = 30;
    } else if (size_i > 0.5 && size_i <= 0.75) {
      size = 45;
    } else {
      size = 60;
    }
    if(shape_i <= 0.33333) {
      shape = "triangle";
    } else if (shape_i > 0.33333 && shape_i <= 0.66666) {
      shape = "circle";
    } else {
      shape = "square";
    }
    var left_trial = {focalColor: color,
                  otherColor: color,
                  focalShape: shape,
                  focalNumber: 0,
                  otherShape: shape,
                  size: size,
                  total: 1,
		              location: "left"
                  }
    var right_trial = {focalColor: color,
                  otherColor: color,
                  focalShape: shape,
                  focalNumber: 0,
                  otherShape: shape,
                  size: size,
                  total: 1,
                  location: "right"
                  }

    for(i = 0; i< Math.round(trial_number*prob_left); i++) {
      random_trials[i] = left_trial;
    }
    for(i = Math.round(trial_number*prob_left); i< trial_number; i++) {
      random_trials[i] = right_trial;
    }

    } else {

      for(i = 0; i< Math.round(trial_number*prob_left); i++) {
        color_i = Math.random();
        size_i = Math.random();
        shape_i = Math.random();
        if(color_i <= 0.25) {
          color = "yellow";
        } else if (color_i > 0.25 && color_i <= 0.5) {
          color = "red";
        } else if (color_i > 0.5 && color_i <= 0.75) {
          color = "green";
        } else {
          color = "blue";
        }
        if(size_i <= 0.25) {
          size = 15;
        } else if (size_i > 0.25 && size_i <= 0.5) {
          size = 30;
        } else if (size_i > 0.5 && size_i <= 0.75) {
          size = 45;
        } else {
          size = 60;
        }
        if(shape_i <= 0.33333) {
          shape = "triangle";
        } else if (shape_i > 0.33333 && shape_i <= 0.66666) {
          shape = "circle";
        } else {
          shape = "square";
        }
        var left_trial = {focalColor: color,
                      otherColor: color,
                      focalShape: shape,
                      focalNumber: 0,
                      otherShape: shape,
                      size: size,
                      total: 1,
    		              location: "left"
                      }
        random_trials[i] = left_trial;
      }
      for(i = Math.round(trial_number*prob_left); i< trial_number; i++) {
        color_i = Math.random();
        size_i = Math.random();
        shape_i = Math.random();
        if(color_i <= 0.25) {
          color = "yellow";
        } else if (color_i > 0.25 && color_i <= 0.5) {
          color = "red";
        } else if (color_i > 0.5 && color_i <= 0.75) {
          color = "green";
        } else {
          color = "blue";
        }
        if(size_i <= 0.25) {
          size = 15;
        } else if (size_i > 0.25 && size_i <= 0.5) {
          size = 30;
        } else if (size_i > 0.5 && size_i <= 0.75) {
          size = 45;
        } else {
          size = 60;
        }
        if(shape_i <= 0.33333) {
          shape = "triangle";
        } else if (shape_i > 0.33333 && shape_i <= 0.66666) {
          shape = "circle";
        } else {
          shape = "square";
        }
        var right_trial = {focalColor: color,
                      otherColor: color,
                      focalShape: shape,
                      focalNumber: 0,
                      otherShape: shape,
                      size: size,
                      total: 1,
    		              location: "right"
                      }
        random_trials[i] = right_trial;
      }
  }
  return random_trials;
}

var shuffle_trials = function(trial_array, shuffle_count) {
  var trial_1, trial_2, tmp;
  for(i=0; i < shuffle_count; i++) {
    trial_1 = Math.round(Math.random()*(trial_array.length-1));
    trial_2 = Math.round(Math.random()*(trial_array.length-1));
    tmp = trial_array[trial_1];
    trial_array[trial_1] = trial_array[trial_2];
    trial_array[trial_2] = tmp;
  }
  return trial_array;
}
// draws the shapes on the canvas
// gets the canvas element and the trial info as arguments
//
// canvas.draw expects the following arguments:
// shape (circle, sqaure or triangle)
// size of the shape
// x and y coords
// color
//
// canvas.getCoords expects the following arguments:
// the number of the elements to be drawn (int)
// the size of a sinlgle elemen (int)
// returns: a list of objects with x and y properties
var drawOnCanvas = function(canvasElem, trialInfo, displayType) {
    var canvas = createCanvas(document.getElementById('canvas'));
	var coords = displayType == 'grid' ?
		  canvas.getGridCoords(trialInfo.rows, trialInfo.total, trialInfo.size) :
		displayType == 'gridSplit' ?
		canvas.getTwoSidedCoords(trialInfo.rows, trialInfo.gap, trialInfo.total, trialInfo.size, 'sideRow') :
    displayType == 'random' ?
    canvas.getRandomCoords(trialInfo.total, trialInfo.size) :
    //one single element at either top, bottom, left, right or center of the canvas
    canvas.getLocationCoords(trialInfo.location, trialInfo.size)
//    var coords = canvas.getRandomCoords(trialInfo.total, trialInfo.size);
    // var coords = canvas.getGridCoords(trialInfo.rows, trialInfo.total, trialInfo.size);
    // var coords = canvas.getTwoSidedCoords(trialInfo.rows, trialInfo.gap, trialInfo.total, trialInfo.size, 'sideRow');

    for (var i=0; i<trialInfo.total; i++) {
        if (i < trialInfo.focalNumber) {
            canvas.draw(trialInfo.focalShape, trialInfo.size, coords[i].x, coords[i].y, trialInfo.focalColor);
        } else {
            canvas.draw(trialInfo.otherShape, trialInfo.size, coords[i].x, coords[i].y, trialInfo.otherColor);
        }
    }
};
