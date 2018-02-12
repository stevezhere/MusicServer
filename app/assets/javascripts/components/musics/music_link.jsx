class MusicLink extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleListAdd = this.handleListAdd.bind(this);
	}

	handleDelete(e) {
		e.preventDefault();
		if(confirm('Are you sure?')) {
			$.ajax({
				method: 'DELETE',
				url: `/musics/${this.props.music.id}`,
				dataType: 'JSON',
				beforeSend: (xhr) => {
					xhr.setRequestHeader(
						'X-CSRF-Token', 
						$('meta[name="csrf-token"]').attr('content')
					)
				},
				success: () => {
					this.props.handleDeleteMusic(this.props.music)
					this.props.handleDeleteToggle();
				}
			}).fail( (r) => {
				alert( r.responseText );
				this.props.handleDeleteToggle();
			});
		} else {
			this.props.handleDeleteToggle();
		}    
	}

	handleListAdd(e) {
		e.preventDefault();
		this.props.handlePlaylistAdd(this.props.music);
	}

	displayLink() {
		return(
			<a href={`/musics/${this.props.music.id}`}>
					{this.props.music.title}
			</a>
		);
	}

	addToListLink() {
		return(
			<a onClick={this.handleListAdd}>
					{this.props.music.title}
			</a>
		);
	}

	destroyLink() {
		return(
			<a className={`isDisabled-${this.props.guest}`}
				onClick={this.handleDelete}>
					{this.props.music.title}
			</a>
		);
	}

	render() {
		if(this.props.playlistToggle) {
			return this.addToListLink();
		} else if (this.props.deleteToggle) {
			return this.destroyLink();
		} else {
			return this.displayLink();
		}
	}
}