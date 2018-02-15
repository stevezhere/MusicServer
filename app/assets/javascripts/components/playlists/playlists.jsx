class Playlists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { playlists: this.props.playlists, deleteToggle: false };
		this.addPlaylist = this.addPlaylist.bind(this);
		this.deletePlaylist = this.deletePlaylist.bind(this);
		this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
	}

	addPlaylist(playlist) {
		let playlists = this.state.playlists.slice();
		playlists.push(playlist);
		this.setState({ playlists: playlists });
	}

	deletePlaylist(playlist) {
		let playlists = this.state.playlists.slice();
		let idx = playlists.indexOf(playlist);
		playlists.splice(idx, 1);
		this.setState({playlists: playlists});
	}

	handleDeleteToggle() {
		this.setState({ deleteToggle: !this.state.deleteToggle })
	}

	trashButton() {
		if(this.state.deleteToggle) {
			return "Which playlist would you like to Remove?";
		} else { 
			return <img src="/assets/trash-bin.png" alt="Trash Bin" size="18"/>;
		}
	}

	formAccess() {
		if(this.props.formAccess) {
			return(
				<div>
					<PlaylistForm handleNewPlaylist={this.addPlaylist}/>
					<button onClick={this.handleDeleteToggle}> 
						{ this.trashButton() }
					</button>
				</div>
			)
		}
	}

	render() {
		return(
			<div>
				<h2>Playlist:</h2>
				<ul className='searchableList'>
					{ this.state.playlists.map( (playlist) => 
						<li key={playlist.id}> 
							<PlaylistLink playlist={playlist}
								deleteToggle={this.state.deleteToggle}
								handleDeletePlaylist={this.deletePlaylist}
								handleDeleteToggle={this.handleDeleteToggle} />
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