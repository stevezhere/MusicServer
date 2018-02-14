// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require components
//= require_tree .


function main(){
	const $audio = $('#audioPlayer');
	const audio = $audio.get(0);
	const cacheSongList =  () => {
		document.querySelectorAll('.songList li.musicSource a').forEach(
			aTags => 
				srcArr.push(aTags.getAttribute('href').match(/\d+$/)[0])
		);
	};
	let currentSong, title, index = 0, srcArr = [];
	cacheSongList();

	$audio.on('ended', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('.songList li a')[index].text;
		$('h2.songTitle').text(title);
	})

	$('#next').on('click', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('.songList li a')[index].text;
		$('h2.songTitle').text(title);
	})	

	$('#previous').on('click', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = index < 1 ? (srcArr.length - 1) : (index - 1)
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('.songList li a')[index].text;
		$('h2.songTitle').text(title);
	})	

	$('.musicSource').on('click', function(){
		event.preventDefault();
		let $songLi = $(this)
		index = parseInt($songLi.attr('class').match(/\d+/)[0])
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $songLi.find('a').html();
		$('h2.songTitle').text(title);
	})

	$('#search').on('keyup', function(){
		let $form = $(this);
		let search = $form.find("input[name='music[title]']").val().toLowerCase();
		$('.searchableList').find('.highlight').removeClass('highlight');
		document.querySelectorAll('.searchableList li').forEach((liTag) => {
			if ($(liTag).text().toLowerCase().includes(search)){
				liTag.classList.add('highlight');
			}
		});
	})

	$('#search').on('focusout', function(){
		$('.searchableList').find('.highlight').removeClass('highlight');
	})
}

//listen for DOM ready (doesn't work with TL partial load)
// $(document).ready(main); 

//listen for turbolink load
$( document ).on('turbolinks:load', function(){ main() });