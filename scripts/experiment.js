// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

	// record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();

    // specify view order
    this.views_seq = [intro,
					  beginMain,
					  main,
            postTest,
            thanks];

    // prepare information about trials (procedure)
	// randomize main trial order, but keep practice trial order fixed
    random_trials = create_random_trials(120, 0.7, "normal");
    //customized shuffle preventing chaining of trial type
    random_trials = shuffle_trials(random_trials, 2*random_trials.length);
    this.trial_info.main_trials = random_trials;
    //this.trial_info.main_trials = _.shuffle(main_trials.concat(random_trials))
	this.trial_info.practice_trials = practice_trials

};
