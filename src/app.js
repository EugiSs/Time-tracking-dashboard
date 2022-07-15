function getJSON() {
	fetch("/data.json").then(response => response.json())
		.then(data => showInfo(data));
};
getJSON();

let work, play, study, exercise, social, selfCare;

// Показывает изначальную инормацию
function showInfo(data) {
	[work, play, study, exercise, social, selfCare] = data;

	// нужно для каждого блока
	let cardWork = document.querySelector('.work');
	cardWork.querySelector('.card__title').textContent = `${work.title}`;
	cardWork.querySelector('.card__hours-current').textContent = `${work.timeframes.weekly.current}`;
	cardWork.querySelector('.card__hours-last').textContent = `Last Week - ${work.timeframes.weekly.previous}`;

};

// function changeInfo(timeframe) {
// 	let [work, play, study, exercise, social, selfCare] = data;
// 	let cardWork = document.querySelector('.work');
// 	cardWork.querySelector('.card__hours-current').textContent = `${work.timeframes.timeframe.current}`;
// 	cardWork.querySelector('.card__hours-last').textContent = `Last Week - ${work.timeframes.timeframe.previous}`;
// }


// Проверяет текущий временной промежуток
function checkTimeframe() {
	let timeframe = document.querySelector('.profile__timeframes > .active').id;
	return timeframe;
};

document.querySelector('.profile__timeframes').addEventListener('click', changeTimeframe);

// Меняет временной промежуток
function changeTimeframe(e) {
	if ('.profile__timeframes-link.active') {
		document.querySelector('.profile__timeframes-link.active').classList.remove('active')
	}
	if (e.target.closest('.profile__timeframes-link')) {
		e.target.classList.add('active');

		switch (checkTimeframe()) {
			case 'daily': 
			// [work, play, study, exercise, social, selfCare] = data;
			let cardWork = document.querySelector('.work');
			cardWork.querySelector('.card__hours-current').textContent = `${work.timeframes.daily.current}`;
			cardWork.querySelector('.card__hours-last').textContent = `Last Day - ${work.timeframes.daily.previous}`;

				break;

			case 'weekly':

				break;

			case 'monthly':

				break;

			default:
				break;
		}
	};
};
