var app = angular.module('mathmaniaApp', []);
app.controller('mainCtrl', function (CONSTANTS) {
    var vm = this;

    vm.correctAnswers = 0;
    vm.totalAnswers = 0;
    vm.isPlaying = false;
    vm.justPlayed = false;
    generateQuestion();

    vm.play = function () {
        vm.correctAnswers = 0;
        vm.totalAnswers = 0;
        vm.questionResult = '';
        generateQuestion();
        vm.isPlaying = true;
    }

    vm.checkToSubmit = function (keyEvent) {
        if (keyEvent.which === 13) {
            vm.isCorrect = isAnswerCorrect();
            vm.questionResult = getResultText(vm.isCorrect);
            if (vm.isCorrect) {
                vm.correctAnswers += 1;
            }
            vm.totalAnswers += 1;
            if (vm.totalAnswers >= CONSTANTS.TOTAL_QUESTIONS) {
                vm.isPlaying = false;
                vm.justPlayed = true;
            } else {
                generateQuestion();
            }
        }
    }

    function generateQuestion() {
        var rand1 = randomIntFromInterval(CONSTANTS.MIN_NUMBER, CONSTANTS.MAX_NUMBER);
        var rand2 = randomIntFromInterval(CONSTANTS.MIN_NUMBER, CONSTANTS.MAX_NUMBER);

        vm.num1 = Math.max(rand1, rand2);
        vm.num2 = Math.min(rand1, rand2);
        vm.operator = CONSTANTS.OPERATORS[Math.floor(Math.random() * CONSTANTS.OPERATORS.length)];
        vm.predictedResult = '';
    }

    function isAnswerCorrect() {
        var actualResult = getActualResult().toString();
        return actualResult === vm.predictedResult;
    }

    function getActualResult() {
        var actualResult = -1;
        if (vm.operator === '+') {
            actualResult = vm.num1 + vm.num2;
        } else if (vm.operator === '-') {
            actualResult = vm.num1 - vm.num2;
        } else if (vm.operator === 'x') {
            actualResult = vm.num1 * vm.num2;
        }
        return actualResult;

    }

    function getResultText(isCorrect) {
        if (isCorrect === true) {
            return 'Correct! ' + vm.num1 + vm.operator + vm.num2 + '=' + getActualResult();
        } else if (isCorrect === false) {
            return 'Incorrect! ' + vm.num1 + vm.operator + vm.num2 + '=' + getActualResult();
        }
        return '';
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});

app.constant('CONSTANTS', {
    'TOTAL_QUESTIONS': 10,
    'MIN_NUMBER': 0,
    'MAX_NUMBER': 9,
    'OPERATORS' : ['+', '-', 'x']
});