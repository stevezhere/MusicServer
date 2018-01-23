class PlaylistChecklistForm extends React.Component {
	constructor() {
		super();
		this.state = {songEntries: {}};
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
		let route = (this.props.method === 'DELETE') ? 'destroy' : 'create';
		$.ajax({
			method: this.props.method,
			url: `/playlists/${this.props.playlistId}/song_entries/${route}`,
			dataType: 'JSON',
			data: {song_entry: this.state.songEntries},
			success: (r) => {
				this.props.handleListUpdate(r);
			}
		});
	}

	playlistForm() {
		let action = (this.props.method === 'DELETE') ? 'Remove from' : 'Add to';
		return(
			<form onSubmit={this.handleSubmit}>
				<ul className='songList'>
					{ this.props.songs.map( (song) =>
						<li key={song.id}>
							<input type="checkbox" name={song.id} onChange={this.handleChange} />
							{ song.title }
						</li>
					)}
				</ul>
				<input type="submit" value={`${action} Playlist`}/>
			</form>
		);
	}

	render() {
		if(this.props.songs.length > 0){
			return this.playlistForm();
		} else {
			return <div> "No song available" </div>
		}	
	}
}