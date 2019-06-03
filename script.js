var categories = ['cat 1', 'cat 2', 'cat 3', 'cat 4', 'cat 5'];
var questions = [
    ['question 1', 'question 2', 'question 3', 'question 4', 'question 5'],
    ['question 1', 'question 2', 'question 3', 'question 4', 'question 5'],
    ['question 1', 'question 2', 'question 3', 'question 4', 'question 5'],
    ['question 1', 'question 2', 'question 3', 'question 4', 'question 5'],
    ['question 1', 'question 2', 'question 3', 'question 4', 'question 5']
]
var teams = [
    ['Team 1', 0],
    ['Team 2', 0],
    ['Team 3', 0]
];
var currentTeam = 0;

function incrementTeam() {
    console.log(teams.length)
    if (currentTeam < teams.length-1) {
        currentTeam++;
    } else {
        currentTeam = 0;
    }
}

function whosTurnIsIt() {
    $('#teamTurn').text(teams[currentTeam][0] + ' is up');
}

function setScoreboard() {
    $('#scoreboard').empty();
    teams.forEach(function(team) {
        var s = '<p">' + team[0] + ': $' + team[1] + '</p>';
        $('#scoreboard').append(s);
    });
}

function nextQuestion() {
    incrementTeam();
    console.log("Current Team " + currentTeam);
    $('#questionModal').modal('hide');
    whosTurnIsIt();
    setScoreboard();
}

$(document).ready(function() {
    var category = '';
    var money = '';
    var questionid = '';

    whosTurnIsIt();
    setScoreboard();

    $('a').click(function() {
        $(this).addClass('isDisabled');
        $(this).children().addClass('disabled');
    });

    $('#questionModal').on('shown.bs.modal', function(event) {
        var link = $(event.relatedTarget);
        category = link.data('category');
        money = link.data('money');
        questionid = link.data('questionid');
    
        var modal = $(this);
        modal.find('.modal-title').text(categories[category] + ' for $' + money);
        modal.find('.modal-body p').text(questions[category][questionid]);
    });

    $('#correct').click(function() {
        teams[currentTeam][1] += parseInt(money);
        nextQuestion();
    });

    $('#incorrect').click(function() {
        teams[currentTeam][1] -= parseInt(money);
        nextQuestion();
    });
});