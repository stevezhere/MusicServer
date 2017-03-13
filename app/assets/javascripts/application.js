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
//= require_tree .


function main(){
	var $audio = $('#audioPlayer');
	var audio = $audio.get(0);
	var srcArr = [];
		document.querySelectorAll('ul li.musicSource a').forEach(
			aTags => 
				srcArr.push(aTags.getAttribute('href').match(/\d+$/)[0])
		);
	var currentSong;
	var index = 0;
	var title;

	$audio.on('ended', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('li a')[index].text;
		$('h2').text((index+1) + ') ' + title);
	})

	$('#next').on('click', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index + 1) % srcArr.length;
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('li a')[index].text;
		$('h2').text((index+1) + ') ' + title);
	})	

	$('#previous').on('click', function(){
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		index = (index - 1) % srcArr.length
		if (index < 0){ index = 2 }
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $('li a')[index].text;
		$('h2').text((index+1) + ') ' + title);
	})	

	$('.musicSource').on('click', function(){
		event.preventDefault();
		currentSong = $audio.find('source').attr('src').match(/\/(\d+)\//)[1];
		index = srcArr.indexOf(currentSong);
		var $this = $(this)
		index = parseInt($this.html().match(/^\d+/)[0]) - 1
		$audio.find('source').attr('src', '/musics/'+srcArr[index]+'/stream');
			audio.pause();
			audio.load();
			audio.play();
		title = $this.find('a').html();
		$('h2').text((index+1) + ') ' + title);
	})

	$('#search').on('keyup', function(){
		var $form = $(this);
		var search = $form.find("input[name='music[title]']").val().toLowerCase();
		$('#available-song').find('.highlight').removeClass('highlight');
		document.querySelectorAll('ul li a').forEach((aTag) => {
			if (aTag.innerHTML.toLowerCase().includes(search)){
				aTag.classList.add('highlight');
			}
		});
	})

	$('#search').on('focusout', function(){
		$('#available-song').find('.highlight').removeClass('highlight');
		$(this)[0].reset();
	})
}

$(document).ready(main);