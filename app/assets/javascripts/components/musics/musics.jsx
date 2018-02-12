class Musics extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			musics: this.props.musics, 
			tempPlaylist: [], 
			playlistToggle: false, 
			deleteToggle: false
		};
		this.addMusic = this.addMusic.bind(this);
		this.deleteMusic = this.deleteMusic.bind(this);
		this.addToPlaylist = this.addToPlaylist.bind(this);
		this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
		this.handlePlaylistToggle = this.handlePlaylistToggle.bind(this);
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

	addMusic(music) {
		let musics = this.state.musics.slice();
		musics.push(music);
		this.sortList(musics);
		this.setState({musics: musics});
	}

	deleteMusic(music) {
		let musics = this.state.musics.slice();
		let idx = musics.indexOf(music);
		musics.splice(idx, 1);
		this.setState({musics: musics});
	}

	handleDeleteToggle() {
		this.setState({
			deleteToggle: !this.state.deleteToggle, 
			playlistToggle: false
		});
	}

	addToPlaylist(music) {
		let tempPlaylist = this.state.tempPlaylist.slice();
		tempPlaylist.push(music);
		this.setState({tempPlaylist: tempPlaylist});
	}

	handlePlaylistToggle() {
		this.setState({
			playlistToggle: !this.state.playlistToggle,
			deleteToggle: false
		});
	}

	trashButton() {
		if(this.state.deleteToggle) {
			return( "Which song would you like to Remove?" );
		} else { 
			return <img src="/assets/trash-bin.png" alt="Trash Bin" size="18"/>;	
		}
	}

	streamMusic() {
		if(this. playlistToggle) {
			return this.state.tempPlaylist;
		} else {
			return this.state.musics;
		}
	}

	showPlaylist() {
		debugger;
		if(this.state.playlistToggle) {
			return(
				<div>
					<h2>Temp Playlist</h2>
					<ol>
						{this.state.tempPlaylist.map( (music) =>
							<li>
								{music.title}
							</li>	
						)}
					</ol>
				</div>
			)
		}
	}

	render() {
		return(
			<div>
				<h1> Local Music Server Homepage </h1>
				<br/><br/>
				<AudioPlayer musics={this.streamMusic()} musicEmpty={!this.state.musics.length}/>
				{this.showPlaylist()}
				<center>
					<button onClick={this.handlePlaylistToggle}>Create Temp Playlist</button>
				</center>
				<div title="Only Users may Add/Delete Music">
					<MusicForm handleNewMusic={this.addMusic} guest={this.props.guest}/>
					<button onClick={this.handleDeleteToggle}> 
						{this.trashButton()}
					</button>
				</div>
				<h2>Musics in storage folder</h2>
				<ul className='songList'>
					{this.state.musics.map( (music, idx) =>
						<li className={`musicSource ${idx}`} key={music.id}>
							<MusicLink music={music} guest={this.props.guest} 
								deleteToggle={this.state.deleteToggle}
								handleDeleteMusic={this.deleteMusic} 
								handleDeleteToggle={this.handleDeleteToggle}
								playlistToggle={this.state.playlistToggle}
								handlePlaylistAdd={this.addToPlaylist}/>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

Musics.defaultProps = { musics: [], guest: true };