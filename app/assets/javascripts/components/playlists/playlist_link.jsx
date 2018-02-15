class PlaylistLink extends React.Component {
	constructor() {
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e) {
		e.preventDefault();
		$.ajax({
			method: 'DELETE',
			url: e.target.href,
			dataType: 'JSON',
			beforeSend: (xhr) => {
				xhr.setRequestHeader(
					'X-CSRF-Token', 
					$('meta[name="csrf-token"]').attr('content')
				)
			},
			success: () => {
				this.props.handleDeletePlaylist(this.props.playlist)
				this.props.handleDeleteToggle();
			}
		}).fail( (r) => {
			alert( r.responseText );
			this.props.handleDeleteToggle();
		});
	}


	displayLink() {
		return(
			<a href={`/playlists/${this.props.playlist.id}`}>
					{this.props.playlist.name}
			</a>
		);
	}

	destroyLink() {
		return(
			<a href={`/playlists/${this.props.playlist.id}`}
				onClick={this.handleDelete}>
					{this.props.playlist.name}
			</a>
		);
	}

	render() {
		if(this.props.deleteToggle) {
			return this.destroyLink();
		} else {
			return this.displayLink();
		}
	}
}