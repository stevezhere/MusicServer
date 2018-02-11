class MusicLink extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
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
					this.props.handleToggle();
				}
			}).fail( (r) => {
				alert( r.responseText );
				this.props.handleToggle();
			});
		} else {
			this.props.handleToggle();
		}    
	}

	displayLink() {
		return(
			<a href={`/musics/${this.props.music.id}`}>
					{this.props.music.title}
			</a>
		);
	}

	destroyLink() {
		return(
			<a className={`isDisabled-${this.props.guest}`}
				onClick={this.handleDelete}>
					<b>{this.props.music.title}</b>
			</a>
		);
	}

	render() {
		if(this.props.toggle) {
			return this.destroyLink();
		} else {
			return this.displayLink();
		}
	}
}