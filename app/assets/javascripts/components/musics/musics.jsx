class Musics extends React.Component {
	constructor(props){
		super(props);
		this.state = {musics: this.props.musics, guest: this.props.guest};
		this.addMusic = this.addMusic.bind(this);
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

	render() {
		return(
			<div>
				<h1> Local Music Server Homepage </h1>
				<br/><br/>
				<MusicForm handleNewMusic={this.addMusic} guest={this.state.guest}/>
				<h2>Musics in storage folder</h2>
				<ul className='songList'>
					{this.state.musics.map( (music) =>
						<li>
							<a href={`/musics/${music.id}`}>
								{music.title}
							</a>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

Musics.defaultProps = { musics: [], guest: true };