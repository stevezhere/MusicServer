class PlaylistChecklistForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {songs: this.props.songs, songEntries: {}};
		this.handleSubmit = this.handleSubmit.bind(this);		
		this.handleChange = this.handleChange.bind(this);		
	}

	handleChange(e) {
		let songId = e.target.name;
		let songEntries = Object.assign({}, this.state.songEntries);
		if (songEntries[songId]){
			delete songEntries[songId];
		} else {
			songEntries[songId] = 'on';
		}
		this.setState({ songEntries: songEntries });
	}

	handleSubmit(e) {
		e.preventDefault();
		$.ajax({
			method: 'DELETE',
			url: `/playlists/${this.props.playlistId}/song_entries/destroy`,
			dataType: 'JSON',
			data: {song_entry: this.state.songEntries},
			success: (r) => {
				this.DeleteSong(r.deleted);
			}
		});
	}

	DeleteSong(r) {
		let songs = this.state.songs.slice();
		let songIds = songs.map( (song) => song.id );
		Object.keys(this.state.songEntries).reverse().forEach(
			(entryId) => {
				let idx = songIds.indexOf(parseInt(entryId));
				songs.splice(idx, 1);
			}
		);
		this.setState({ songs: songs, songEntries: {} });
	}

	playlistForm() {
		return(
			<form onSubmit={this.handleSubmit}>
				<ul className='songList'>
					{ this.state.songs.map( (song) =>
						<li key={song.id}>
							<input type="checkbox" name={song.id} onChange={this.handleChange} />
							{ song.title }
						</li>
					)}
				</ul>
				<input type="submit" value="Remove from Playlist"/>
			</form>
		);
	}

	render() {
		if(this.state.songs.length > 0){
			return this.playlistForm();
		} else {
			return <div> "Playlist is Empty" </div>
		}	
	}
}