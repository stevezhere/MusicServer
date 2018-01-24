class PlaylistEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musics: this.props.musics,
			newMusics: this.props.newMusics
		}
		this.UpdateList = this.UpdateList.bind(this);
	}

	sortList(list) {
		list.sort( (item1,item2) => {
			let song1 = item1.title.toUpperCase();
			let song2 = item2.title.toUpperCase();
  		if (song1 < song2) {
  			return -1;
  		} else if (song1 > song2) {
  			return 1;
  		} else {
  			return 0;
  		}
		});
	}

	UpdateList(songIds) {
		let key1 = Object.keys(songIds)[0];
		let songList1 = this.state[key1].slice();
		let songListIds = songList1.map( (song) => song.id );
		let key2 = key1 === 'musics' ? 'newMusics' : 'musics';
		let songList2 = this.state[key2].slice();
		let idx, remove_song, obj = {};
		Object.values(songIds)[0].forEach( (songId) => {
			idx = songListIds.indexOf(songId);
			songListIds.splice(idx, 1);
			remove_song = songList1.splice(idx, 1)[0];
			songList2.push(remove_song);
		});
		obj[key1] = songList1;
		obj[key2] = songList2;
		this.sortList(obj.newMusics);
		this.setState(obj);
	}

	render() {
		return(
			<div>
				<h2> Current Playlist </h2>
				<PlaylistChecklistForm
					songs={this.state.musics}
					playlistId={this.props.playlistId}
					method='DELETE'
					handleListUpdate={this.UpdateList}
				/>
				<br/>
				<br/>
				<h2> Available Songs </h2>
				<PlaylistChecklistForm
					songs={this.state.newMusics}
					playlistId={this.props.playlistId}
					method='POST'
					handleListUpdate={this.UpdateList}
				/>
			</div>
		)
	}
}

PlaylistEdit.defaultProps = { musics: [], newMusics: [] };