class MusicForm extends React.Component {
	constructor() {
		super();
		this.state = { toggle: false };
		this.handleToggle = this.handleToggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleToggle() {
		this.setState({ toggle: !this.state.toggle })
	}

	handleSubmit(e) {
		e.preventDefault();
		let form = e.target
		let data = new FormData(form);
		$.ajax({
			method: 'POST',
			url: '/musics',
			enctype: 'multipart/form-data',
			processData: false,
      contentType: false,
      dataType: 'JSON',
      cache: false,
      beforeSend: (xhr) => {
				xhr.setRequestHeader(
					'X-CSRF-Token', 
					$('meta[name="csrf-token"]').attr('content')
				)
			},
			data: data,
			success: (r) => {
				this.handleToggle();
				console.log(r);
			}
		}).fail( (r) => {
			alert( r.responseText );
			this.handleToggle();
		});
	}

	formButton() {
		return(
			<button onClick={this.handleToggle}>
				Add New Song 
			</button>
		);
	}

	newForm() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="music[title]" 
					placeholder='SongTitle'/>
				<input type="file" name="music[audio]" id="music_audio"/>
				<input type="submit" value="Store Music"/>
			</form>
		);
	}

	render() {
		if(this.state.toggle) {
			return this.newForm();
		} else {
			return this.formButton();
		}
	}
}