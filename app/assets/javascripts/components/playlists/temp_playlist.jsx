class TempPlaylist extends React.Component {
	constructor() {
		super();
		this.handleRemoveSong = this.handleRemoveSong.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
	}

	handleRemoveSong(e) {
		e.preventDefault();
		this.props.handlePlaylistRemove(parseInt(e.target.className));
	}

	savePlaylist(e) {
		e.preventDefault();
		$.ajax({
			url: '/playlists',
			method: 'POST',
			dataType: 'JSON',
			beforeSend: (xhr) => {
				xhr.setRequestHeader(
					'X-CSRF-Token', 
					$('meta[name="csrf-token"]').attr('content')
				)
			},
			data: {playlist: {name: `List - ${new Date().toLocaleString()}`}},
			success: (r) => {
				let entry_ids = this.props.musics.map( music => music.id );
				let data = {song_entry: {entry_ids: entry_ids}};
		  	$.ajax({
		  		url: `/playlists/${r.id}/song_entries/create`,
		  		method: 'POST',
		  		beforeSend: (xhr) => {
						xhr.setRequestHeader(
							'X-CSRF-Token', 
							$('meta[name="csrf-token"]').attr('content')
						)
					},
					data: data
				});
			}
		});
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
					<button className={`buttonAccess-${!!this.props.musics.length}`}
						title="Redirect Playlist Settings" 
						onClick={this.savePlaylist}> 
						Save Playlist 
					</button>
					<ol className={this.activeClass()['songList']}>
						{this.props.musics.map( (music, idx) =>
							<li className={`musicSource source-${music.id}`} key={music.id} title='Remove Song'>
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
								<li> Press <u>"Queue: TempList"</u> </li>
								<li> Choose Songs from <u>"Storage List"</u> </li>
								<li> Remove Songs from <u>"Temp List"</u> </li>
					</center>
				</div>
			);
		}
	}

	render() {
		return this.showPlaylist();
	}
}