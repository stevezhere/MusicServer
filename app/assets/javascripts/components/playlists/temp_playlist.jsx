class TempPlaylist extends React.Component {
	listClass() {
		if(this.props.playable) {
			return 'songList searchableList';
		} else {
			return 'searchableList';
		}
	}

	showPlaylist() {
		if(this.props.musics.length || this.props.playable) {
			return(
				<div>
					<hr/>
					<h2>Temporary Playlist</h2>
					<ol className={this.listClass()}>
						{this.props.musics.map( (music) =>
							<li className={`musicSource source-${music.id}`} key={music.id}>
								<a href={`/musics/${music.id}`}>
									{music.title}
								</a>
							</li>	
						)}
					</ol>
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	render() {
		return this.showPlaylist();
	}
}