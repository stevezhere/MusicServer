class TempPlaylist extends React.Component {
	constructor() {
		super();
		this.handleRemoveSong = this.handleRemoveSong.bind(this);
	}

	handleRemoveSong(e) {
		e.preventDefault();
		this.props.handlePlaylistRemove(parseInt(e.target.className));
	}

	activeClass() {
		let activeClass = {};
		if(this.props.playable) {
			activeClass['songList'] = 'songList searchableList';
			activeClass['activeList'] = 'activeList';
		} else {
			activeClass['songList'] = 'searchableList';
			activeClass['activeList'] = '';
		}
		return activeClass;
	}

	showPlaylist() {
		if(this.props.musics.length || this.props.playable) {
			return(
				<div>
					<hr/>
					<h2 className={this.activeClass()['activeList']}>Temporary Playlist</h2>
					<ol className={this.activeClass()['songList']}>
						{this.props.musics.map( (music, idx) =>
							<li className={`musicSource source-${music.id}`} key={music.id}>
								<a href={`/musics/${music.id}`} className={idx} onClick={this.handleRemoveSong}>
									{music.title}
								</a>
							</li>	
						)}
					</ol>
				</div>
			);
		} else {
			return( 
				<div>
					<center>
							<h3> Create Temp Playlist </h3>
								<li> Press <u>"Queue List"</u> </li>
								<li> <u>"Choose Songs"</u> on Song List </li>
								<li> <u>"Remove Songs"</u> on Temp List </li>
							<li> Load to audio with <u>"Eject Button"</u> </li>
							<h3> Back to SongList </h3>
								<li> Click "Queue" again back to Song List </li>
								<li> "Load Song" again </li>
					</center>
				</div>
			);
		}
	}

	render() {
		return this.showPlaylist();
	}
}