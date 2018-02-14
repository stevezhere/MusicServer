class Playlists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { playlists: this.props.playlists };
		this.addPlaylist = this.addPlaylist.bind(this);
	}

	addPlaylist(playlist) {
		let playlists = this.state.playlists.slice();
		playlists.push(playlist);
		this.setState({ playlists: playlists });
	}

	formAccess() {
		if(this.props.formAccess) {
			return <PlaylistForm handleNewPlaylist={this.addPlaylist}/>;
		}
	}

	render() {
		return(
			<div>
				<h2>Playlist:</h2>
				<ul className='searchableList'>
					{ this.state.playlists.map( (playlist) => 
						<li key={playlist.id}> 
							<a href={`/playlists/${playlist.id}`}>
								{playlist.name}
							</a>
						</li> 
					)}
				</ul>
				<br/>
				{ this.formAccess() }
			</div>
		);
	}
}

//in case fail to retrieve playlists
Playlists.defaultProps = { playlists: [], formAccess: false };