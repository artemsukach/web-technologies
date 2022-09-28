/* START TASK 1: Your code goes here */
let cell = document.querySelectorAll('.cell');
let table = document.querySelector('.table');

for (let i = 0; i < cell.length; i++) {
	if (i % 3 === 0) {
		cell[i].addEventListener('click', () => {
			for (let j = i; j < i + 3; j++) {
				cell[j].classList.toggle('cell--blue');
			}
		});
	} else if (i !== 5) {
		cell[i].addEventListener('click', () => cell[i].classList.toggle('cell--yellow'));
	}
	cell[5].addEventListener('click', () => {
		cell[i].classList.toggle('cell--green');
		table.classList.toggle('cell--green');
	});
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const validMassage = 'Data was successfully sent';
const invalidMassage = 'Type number does not follow format<br>+380*********'
let massage = document.querySelector('.massage');
let phone = document.querySelector('#phone');
let submitPhone = document.querySelector('#submit-phone');
let validPhone = /\+380[0-9]{9}$/;

phone.addEventListener('input', (event) => {
	console.log(event);
	if (validPhone.test(phone.value)) {
		massage.innerHTML = '';
		massage.classList.add('hidden');
		submitPhone.removeAttribute('disabled');
		massage.classList.remove('invalid');
		phone.classList.remove('border--red');
	} else {
		massage.classList.remove('hidden');
		submitPhone.setAttribute('disabled', 'disabled');
		massage.classList.remove('valid');
		massage.classList.add('invalid');
		phone.classList.add('border--red');
		massage.innerHTML = '';
		massage.innerHTML = invalidMassage;
	}
});

submitPhone.addEventListener('click', () => {
	massage.classList.remove('hidden');
	massage.classList.remove('invalid');
	phone.classList.remove('border--red');
	massage.classList.add('valid');
	massage.innerHTML = '';
	massage.innerHTML = validMassage;
	submitPhone.setAttribute('disabled', 'disabled');
})
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let court = document.querySelector('.basketball__wrapper ');
let ball = document.querySelector('.ball');
let move = document.querySelector('.move-ball');
let scoreA = document.querySelector('.score__a-result');
let scoreB = document.querySelector('.score__b-result');
let result = document.querySelector('.result');
let teamA = 'Team A score!';
let teamB = 'Team B score!';
let teamBColor = 'result--red';
let teamColorPrevious;
let x;
let y;

ballToStart();

result.addEventListener('massage', function (e) {
	showResult(e.detail.team, e.detail.score, e.detail.teamColor);
	setTimeout(delResult, 3000);
});

court.addEventListener('click', (event) => {
	x = event.offsetX - 20;
	y = event.offsetY - 20;
	move.style.transform = `translate(${x}px,${y}px)`;
	if (0 < x && x < 47 && 117 < y && y - 20 < 172) {
		setTimeout(() => {
			result.dispatchEvent(new CustomEvent('massage', {
				detail: {
					team: teamB,
					score: scoreB,
					teamColor: 'result--red'
				}
			}));
		}, 1000);
	} else if (512 < x && x < 567 && 117 < y && y < 172) {
		setTimeout(() => {
			result.dispatchEvent(new CustomEvent('massage', {
				detail: {
					team: teamA,
					score: scoreA,
					teamColor: 'result--blue'
				}
			}));
		}, 1000);
	}
});

function ballToStart() {
	move.style.transform = `translate(280px,145px)`;
}

function showResult(team, score, teamColor) {
	score.innerHTML++;
	result.innerHTML = team;
	result.classList.remove(teamColorPrevious);
	result.classList.add(teamColor);
	teamColorPrevious = teamColor;
}

function delResult() {
	result.innerHTML = '';
	ballToStart();
}
/* END TASK 3 */
