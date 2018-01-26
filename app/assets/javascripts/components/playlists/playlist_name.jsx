class PlaylistName extends React.Component {
	constructor(props) {
		super(props);
		this.state = { toggle: false, name: this.props.playlist.name };
		this.handleToggle = this.handleToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleToggle() {
		let toggle = this.state.toggle;
		this.setState({ toggle: !toggle });
	}

	handleChange(e) {
		let name = e.target.value;
		this.setState({ name: name });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.props.playlist.name === this.state.name) {
			this.handleToggle();
		} else {
			$.ajax({
				method: 'PUT',
				url: `/playlists/${this.props.playlist.id}`,
				dataType: 'JSON',
				data: { playlist: {name: this.state.name} },
				success: () => {
					this.handleToggle();
					console.log('success');
				},
				error: () => {
					this.handleToggle();
					console.log('failed');
				}
			});
		}
	}

	PlaylistHeader() {
		return(
			<div>
				<h1>{ this.state.name }</h1>
				<br/>
				<br/>
				<button onClick={this.handleToggle}> Change Name </button>
			</div>
		);
	}

	PlaylistForm() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type='text' 
					value={this.state.name}
					onChange={this.handleChange}>
				</input>
				<input type='submit' value='Change Name'></input>
			</form>
		)
	}

	render() {
		if(this.state.toggle) {
			return this.PlaylistForm();
		} else {
			return this.PlaylistHeader();
		}
	}
}