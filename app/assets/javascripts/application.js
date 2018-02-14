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
	let currentSong, nextSong, title, index = 0;
	let srcArr = [], srcText = {};
	const cacheSongList =  () => {
		srcArr = [], srcText = {};
		document.querySelectorAll('.songList li.musicSource a').forEach(
			(aTag) => {
				srcId = aTag.getAttribute('href').match(/\d+$/)[0];
				srcArr.push(srcId);
				srcText[srcId] = aTag.text;
			}
		);
	};
	const audioReload = () => {
		$audio.find('source').attr('src', `/musics/${nextSong}/stream`);
			audio.pause();
			audio.load();
			audio.play();
		title = srcText[nextSong];
		$('h2.songTitle').text(title);
	};
	
	cacheSongList();

	$audio.on('ended', function(){
		currentSong = nextSong || $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		nextSong = srcArr[index];
		audioReload();
	})

	$('#next').on('click', function(){
		currentSong = nextSong || $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		nextSong = srcArr[index];
		audioReload();
	})	

	$('#previous').on('click', function(){
		currentSong = nextSong || $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = index < 1 ? (srcArr.length - 1) : (index - 1);
		nextSong = srcArr[index];
		audioReload();
	})	

	$('.musicSource').on('click', function(){
		event.preventDefault();
		let $songLi = $(this);
		nextSong = $songLi.attr('class').match(/source-(\d+)/)[1];
		audioReload();
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