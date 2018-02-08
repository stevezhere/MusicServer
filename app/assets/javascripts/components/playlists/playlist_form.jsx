class PlaylistForm extends React.Component {
	constructor() {
		super();
		this.state = this.getInitialState();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	getInitialState() {
		return { name: '', toggle: false };
	}

	handleToggle(){
		this.setState({ toggle: !this.state.toggle })
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.name) {
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
				data: { playlist: {name: this.state.name} },
				success: (r) => {
					this.props.handleNewPlaylist(r);
					this.setState(this.getInitialState());
				}
			}).fail( (r) => {
		  		alert( r.responseText );
	  	});
		} else {
			this.handleToggle();
		}
	}

	playlistForm() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type='text' name='name' placeholder='Name'
					value={this.state.name} onChange={this.handleChange}/>
				<input type='submit' value='Save/Cancel'/>
			</form>
		)
	}

	playlistButton() {
		return <button onClick={this.handleToggle}> Add Playlist </button>;
	}

	render() {
		if(this.state.toggle) {
			return this.playlistForm();
		} else {
			return this.playlistButton();
		}
	}
}