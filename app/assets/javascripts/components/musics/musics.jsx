class Musics extends React.Component {
	constructor(props){
		super(props);
		this.state = {musics: this.props.musics, toggle: false};
		this.addMusic = this.addMusic.bind(this);
		this.deleteMusic = this.deleteMusic.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
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

	handleToggle() {
		this.setState({toggle: !this.state.toggle});
	}

	trashButton() {
		if(this.state.toggle) {
			return( "Which song would you like to Remove?" );
		} else { 
			return <img src="/assets/trash-bin.png" alt="Trash Bin" size="18"/>;	
		}
	}

	render() {
		return(
			<div>
				<h1> Local Music Server Homepage </h1>
				<br/><br/>
				<div title="Only Users may Add/Delete Music">
					<MusicForm handleNewMusic={this.addMusic} guest={this.props.guest}/>
					<button onClick={this.handleToggle}> 
						{this.trashButton()}
					</button>
				</div>
				<h2>Musics in storage folder</h2>
				<ul className='songList'>
					{this.state.musics.map( (music) =>
						<li key={music.id}>
							<MusicLink music={music} guest={this.props.guest} 
								toggle={this.state.toggle}
								handleDeleteMusic={this.deleteMusic} 
								handleToggle={this.handleToggle} />
						</li>
					)}
				</ul>
			</div>
		);
	}
}

Musics.defaultProps = { musics: [], guest: true };