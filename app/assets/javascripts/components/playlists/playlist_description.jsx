class PlaylistDescription extends React.Component {
	constructor(props) {
		super(props);
		this.state = {description: this.props.playlist.description, toggle: false}
		this.handleToggle = this.handleToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleToggle() {
		this.setState({toggle: !this.state.toggle})
	}

	handleChange(e) {
		let description = e.target.value;
		this.setState({description: description});
	}

	handleSubmit(e) {
		e.preventDefault();
		$.ajax({
			method: 'PUT',
			url: `/playlists/${this.props.playlist.id}`,
			dataType: 'JSON',
			beforeSend: (xhr) => {
				xhr.setRequestHeader(
					'X-CSRF-Token', 
					$('meta[name="csrf-token"]').attr('content')
				)
			},
			data: {playlist: this.state},
			success: () => this.handleToggle()
		}).fail( (r) => {
	  		alert( r.responseText );
  	});
	}

	descriptionForm() {
		return(
			<form onSubmit={this.handleSubmit}>
				<textarea value={this.state.description}
					onChange={this.handleChange}>
				</textarea><br/>
				<input type='submit' value="Save Changes"/>
			</form>
		);
	}

	displayDescription() {
		return(
			<div>
				<p>{this.state.description}</p><br/>
				<button className={`isDisabled-${!this.props.authenticate}`}
				onClick={this.handleToggle}>Edit Description</button>
			</div>
		);
	}

	render() {
		if(this.state.toggle){	
			return this.descriptionForm();
		} else {
			return this.displayDescription();
		}
	}
}