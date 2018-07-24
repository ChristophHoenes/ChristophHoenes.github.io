var intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our experiment!<br> You will have to do a simple task. " +
    "All you need to do is to guess on which side of the screen an object is going to occur. " +
    "The object can appear either on the right or on the left hand side of the screen.<br>" +
    "<strong>Try to guess right</strong> as many of the 100 trials as you can.<br>" +
    "<br> Click on 'Next' to get to the instructions. Please <strong>read and follow them carefully</strong>.",
    // introduction's slide proceeding button text
    "buttonText": "Next",
    // render function renders the view
    render: function() {

        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
}


var beginMain = {
    "text": "In the following you will have to click on one of the two buttons. " +
            "If you think the next object will occur on the left hand side press button 'Left'. " +
            "if you think the next object will occur on the right hand side press button 'Right'.<br>" +
            "<br>Your task is to guess where the object is going to appear next. After clicking on a button the object " +
            "(a random geometrical shape either triangle, square or circle with a random color either red, blue, yellow, or green) " +
            "is displayed on the left or right hand side for <strong>1 second</strong> so you can see if you were right.<br>" +
            "<br>Please <strong>wait</strong> for the object to disappear again before you press any button again.<br>" +
            "<br>Your choices have <strong>no</strong> effect on the probability of the position of the object in the other trials.<br>You will do 100 trials. Have fun :)",
    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
}

var main = {

	trials : 100,

    render : function(CT) {

		// fill variables in view-template
        var viewTemplate = $('#main-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
        }));

		// update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
        $('#filled').css('width', filled);

        $('#left').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            // draws the shapes on the canvas
            drawOnCanvas(document.getElementById('canvas'),
    					 exp.trial_info.main_trials[CT],
    					 'location');
            console.log(exp.trial_info.main_trials[CT]);
            setTimeout(() => {
            trial_data = {
                 trial_type: "main",
                 trial_number: CT + 1,
                 focalShape: exp.trial_info.main_trials[CT].focalShape,
                 otherShape: exp.trial_info.main_trials[CT].otherShape,
                 focalNumber: exp.trial_info.main_trials[CT].focalNumber,
                 otherNumber: exp.trial_info.main_trials[CT].total - exp.trial_info.main_trials[CT].focalNumber,
                 total: exp.trial_info.main_trials[CT].total,
                 focalColor: exp.trial_info.main_trials[CT].focalColor,
                 otherColor: exp.trial_info.main_trials[CT].otherColor,
                 rows: exp.trial_info.main_trials[CT].rows,
                 location: exp.trial_info.main_trials[CT].location,
                 choice: "left",
                 RT: RT
        };
        exp.trial_data.push(trial_data);
        exp.findNextView();
      },1000);
    });

        $('#right').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            // draws the shapes on the canvas
            drawOnCanvas(document.getElementById('canvas'),
    					 exp.trial_info.main_trials[CT],
    					 'location');
            console.log(exp.trial_info.main_trials[CT]);
            setTimeout(() => {
            trial_data = {
                trial_type: "main",
                trial_number: CT + 1,
                focalShape: exp.trial_info.main_trials[CT].focalShape,
                otherShape: exp.trial_info.main_trials[CT].otherShape,
                focalNumber: exp.trial_info.main_trials[CT].focalNumber,
                otherNumber: exp.trial_info.main_trials[CT].total - exp.trial_info.main_trials[CT].focalNumber,
                total: exp.trial_info.main_trials[CT].total,
                focalColor: exp.trial_info.main_trials[CT].focalColor,
                otherColor: exp.trial_info.main_trials[CT].otherColor,
                rows: exp.trial_info.main_trials[CT].rows,
                location: exp.trial_info.main_trials[CT].location,
                choice: "right",
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
          },1000);
        });

        // record trial starting time
        startingTime = Date.now();

    }
};


var postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
}
