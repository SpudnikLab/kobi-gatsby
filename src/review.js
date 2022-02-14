/**
 * for review page
 */
/* eslint-disable wrap-iife */
(function () {
	document
		.querySelector('.btn-play-review')
		.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector('.audio-holder').classList.add('show');
		});

	window.addEventListener('load', function () {
		setTimeout(function () {
			var player = videojs.getPlayer('audio-review');
			var $controlBar = document.querySelector('.vjs-control-bar');
			var $backward10 = document.createElement('button');
			var $forward10 = document.createElement('button');
			$backward10.classList.add(
				'audio-player-btn',
				'audio-player-btn--backward'
			);
			$controlBar.insertBefore($backward10, $controlBar.childNodes[0]);
			$backward10.addEventListener('click', function (e) {
				e.preventDefault();
				player.currentTime(player.currentTime() - 10);
			});

			$forward10.classList.add(
				'audio-player-btn',
				'audio-player-btn--forward'
			);
			$controlBar.appendChild($forward10);
			$forward10.addEventListener('click', function (e) {
				e.preventDefault();
				player.currentTime(player.currentTime() + 10);
			});
		});
	});
})();
/* eslint-enable wrap-iife */
