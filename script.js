var categories = ['Sports', 'Programming', 'Quick Maths', 'Music', 'Disney/Pixar'];
var questions = [
    [ // Sports
        'This team won the 2018 World Series.', // Who are the Boston Red Sox?
        'This NBA Player and Coach has 11 NBA Titles, the most ever.', // Who is Bill Russell?
        'This team just won the Champions League Final.', // Who is Liverpool?
        'The Masters, "A Tradition Unlike Any Other," is played at this golf course.', // What is Augusta National
        'This football (soccer) award given to The Best FIFA Men\'s Player is French for "Golden Ball."' // What is Ballon d'Or
    ],
    [ // Programming
        'question 1', // 
        'question 2', // 
        'question 3', // 
        'question 4', // 
        'question 5' // 
    ],
    [ // Quick Maths
        'question 1', // 
        'question 2', // 
        'question 3', // 
        'question 4', // 
        'question 5' // 
    ],
    [ // Music
        'question 1', // 
        'question 2', // 
        'question 3', // 
        'question 4', // 
        'question 5' // 
    ],
    [ // Disney/Pixar
        'question 1', // 
        'question 2', // 
        'question 3', // 
        'question 4', // 
        'question 5' // 
    ]
];
var teams = [
    ['Team 1', 0],
    ['Team 2', 0],
    ['Team 3', 0]
];
var currentTeam = 0;

function setupBoard() {
    for (var i = 0; i < categories.length; i++) {
        var col = document.createElement('div');
        col.className = 'col-sm text-center';
        var card = document.createElement('div');
        card.className = 'card';

        var cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        var header = document.createElement('h2');
        var headerText = document.createTextNode(categories[i]);
        header.appendChild(headerText);

        var list = document.createElement('ul');
        list.className = 'list-group list-group-flush';
        for (var j = 0; j < questions[i].length; j++) {
            var link = document.createElement('a');
            link.setAttribute('href', '');
            link.setAttribute('data-toggle','modal');
            link.setAttribute('data-target', '#questionModal');
            link.setAttribute('data-category', i.toString())
            link.setAttribute('data-money', ((j+1)*100).toString());
            link.setAttribute('data-questionid', j.toString());
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            var amount = document.createTextNode('$' + (j+1)*100);
            listItem.appendChild(amount);
            
            list.append(link);
            link.append(listItem);
        }

        $('#gameBoard').append(col);
        col.append(card);
        card.append(cardHeader);
        cardHeader.append(header);
        card.append(list);
    }
}

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

    setupBoard();
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