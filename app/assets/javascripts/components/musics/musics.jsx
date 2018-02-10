class Musics extends React.Component {
	constructor(props){
		super(props);
		this.state = {musics: this.props.musics, toggle: false};
		this.addMusic = this.addMusic.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleRemoveSong = this.handleRemoveSong.bind(this);
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

	removeSong(music) {
		let musics = this.state.musics.slice();
		let musicIdxs = musics.map((music) => music.id);
		let idx = musicIdxs.indexOf(music.id);
		musics.splice(idx, 1);
		this.setState({musics: musics});
	}

	handleToggle() {
		this.setState({toggle: !this.state.toggle});
	}

	handleRemoveSong(e) {
		e.preventDefault();
		if(confirm('Are you sure?')) {
			$.ajax({
				method: 'DELETE',
				url: e.target.parentElement.href,
				dataType: 'JSON',
				beforeSend: (xhr) => {
					xhr.setRequestHeader(
						'X-CSRF-Token', 
						$('meta[name="csrf-token"]').attr('content')
					)
				},
				success: (r) => {
					this.removeSong(r);
					this.handleToggle();
				}
			}).fail( (r) => {
				alert( r.responseText );
				this.handleToggle();
			});
		} else {
			this.handleToggle();
		}    
	}

	musicLink(music) {
		if(this.state.toggle) {
			return(
				<a className={`isDisabled-${this.props.guest}`} onClick={this.handleRemoveSong} href={`/musics/${music.id}`}>
					<b>{music.title}</b>
				</a>
			);
		} else {
			return(
				<a href={`/musics/${music.id}`}>
					{music.title}
				</a>
			);
		}
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
							{this.musicLink(music)}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

Musics.defaultProps = { musics: [], guest: true };