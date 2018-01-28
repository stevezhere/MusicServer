class PlaylistChecklistForm extends React.Component {
	constructor() {
		super();
		this.state = {entry_ids: []};
		this.handleSubmit = this.handleSubmit.bind(this);		
		this.handleChange = this.handleChange.bind(this);		
	}

	handleChange(e) {
		let songId = e.target.value;
		let entry_ids = this.state.entry_ids.slice();
		if (entry_ids.includes(songId)){
			let idx = entry_ids.indexOf(songId);
			entry_ids.splice(idx, 1);
		} else {
			entry_ids.push(songId);
		}
		this.setState({ entry_ids: entry_ids });
	}

	handleSubmit(e) {
		e.preventDefault();
		let route = (this.props.method === 'DELETE') ? 'destroy' : 'create';
		$.ajax({
			method: this.props.method,
			url: `/playlists/${this.props.playlistId}/song_entries/${route}`,
			dataType: 'JSON',
			data: {song_entry: this.state },
			success: (r) => {
				this.props.handleListUpdate(r);
				this.setState({ entry_ids: [] });
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
							<input type="checkbox" value={song.id} onChange={this.handleChange} />
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
			return <div> "No song available" </div>;
		}	
	}
}