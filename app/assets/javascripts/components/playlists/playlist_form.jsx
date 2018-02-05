class PlaylistForm extends React.Component {
	constructor() {
		super();
		this.state = this.getInitialState();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getInitialState() {
		return { name: '' };
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/playlists',
			dataType: 'JSON',
			beforeSend: (xhr) => {
				xhr.setRequestHeader(
					'X-CSRF-Token', 
					$('meta[name="csrf-token"]').attr('content')
				)
			},
			data: { playlist: this.state },
			success: (r) => {
				this.props.handleNewPlaylist(r);
				this.setState(this.getInitialState());
			}
		}).fail( (r) => {
	  		alert( r.responseJSON.name[0] );
  	});
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type='text' name='name' placeholder='Name'
					value={this.state.name} onChange={this.handleChange}/>
				<input type='submit' value='Add Playlist'/>
			</form>
		);
	}
}