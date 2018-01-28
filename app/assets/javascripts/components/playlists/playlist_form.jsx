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
		$.post('/playlists',
			{ playlist: this.state },
			(data) => {
				this.props.handleNewPlaylist(data);
				this.setState(this.getInitialState());
			}, 'JSON'
		).fail( (r) => {
	  		alert( r.responseJSON.name[0] );
	  		//#flash_component later
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