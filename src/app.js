function getJSON(timeframe) {
	fetch("/data.json").then(response => response.json())
		.then(data => showCardsInfo(data, timeframe));
};
getJSON('weekly');


function showCardsInfo(data, timeframe) {
	let app = document.querySelector('.app');

	// Delete all cards (!profile) before adding new cards
	while (app.childNodes.length > 1) {
		app.removeChild(app.lastChild);
	}

	// Adding cards and their content
	data.forEach(activity => {
		let cssClass = activity.title.toLowerCase().replace(' ', '-');
		let currentHours = activity.timeframes[timeframe].current;
		let previousHours = activity.timeframes[timeframe].previous;

		app.insertAdjacentHTML('beforeend', `
			<section class="card ${cssClass}">
				<div class="card__topframe"></div>
				<div class="card__content">
					<div class="card__header">
						<p class="card__title">${activity.title}</p>
						<div class="card__img">
							<img src="img/icon-ellipsis.svg" alt="img">
						</div>
					</div>
					<div class="card__hours">
						<div class="card__hours-current">${currentHours}</div>
						<div class="card__hours-last"> ${checkTimeframe(timeframe)} ${previousHours}</div>
					</div>
				</div>
			</section>
		`)
	})
};

// Check current timeframe
function checkTimeframe(timeframe) {
	switch (timeframe) {
		case 'daily': return "Last Day - ";
		case 'weekly': return "Last Week - ";
		case 'monthly': return "Last Month - ";
	}
};

// Change timeframe and cards content
document.querySelector('.profile__timeframes').addEventListener('click', function (e) {
	if (e.target.closest('.profile__timeframes-link')) {
		e.preventDefault();

		document.querySelector('.profile__timeframes-link.active').classList.remove('active')
		e.target.classList.add('active');
	} else {
		return false;
	};

	let timeframe = document.querySelector('.profile__timeframes > .active').id;
	checkTimeframe(timeframe);

	getJSON(timeframe);
	return false;
});


// Hover effects on cards and on elipsis into cards
document.querySelector('.app').addEventListener('mouseover', function (e) {
	if (e.target.closest('.card__content')) {
		e.target.closest('.card__content').classList.add('hover');

		if (e.target.closest('.card__img')) {
			e.target.closest('.card__content').classList.remove('hover')
		}
	};
});
document.querySelector('.app').addEventListener('mouseout', function (e) {
	if (e.target.closest('.card__content')) {
		e.target.closest('.card__content').classList.remove('hover')
	}
})