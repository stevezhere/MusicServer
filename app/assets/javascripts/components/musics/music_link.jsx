class MusicLink extends React.Component {
	render() {
		return(
			<li><a href={`/musics/${this.props.music.id}`}>{this.props.music.title}</a></li>
		);
	}
}