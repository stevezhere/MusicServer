class PlaylistEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musics: this.props.musics,
			newMusics: this.props.newMusics
		}
		this.addToPlaylist = this.addToPlaylist.bind(this);
		this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
	}

	addToPlaylist(songs) {

	}

	removeFromPlaylist(songs) {
	}

	render() {
		return(
			<div>
				<h2> Current Playlist </h2>
				<PlaylistChecklistForm
					songs={this.state.musics}
					playlistId={this.props.playlistId}
					method='DELETE'
					handleListUpdate={this.removeFromPlaylist}
				/>
				<br/>
				<br/>
				<h2> Available Songs </h2>
				<PlaylistChecklistForm
					songs={this.state.newMusics}
					playlistId={this.props.playlistId}
					method='POST'
					handleListUpdate={this.addToPlaylist}
				/>
			</div>
		)
	}
}

PlaylistEdit.defaultProps = { musics: [], newMusics: [] };