class Musics extends React.Component {
	constructor(props){
		super(props);
		this.state = {musics: this.props.musics};
	}

	render() {
		return(
			<div>
				<h1> Local Music Server Homepage </h1>
				<br/><br/>
				<MusicForm />
				<h2>Musics in storage folder</h2>
				<ul className='songList'>
					{this.state.musics.map( (music) =>
						<MusicLink key={music.id} music={music} />
					)}
				</ul>
			</div>
		);
	}
}

Musics.defaultProps = { musics: [] };