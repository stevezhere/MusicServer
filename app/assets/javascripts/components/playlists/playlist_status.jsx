class PlaylistStatusButton extends React.Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
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
			data: {playlist: {share:  e.target.value}},
			success: (r) => {
				this.props.handleStatusUpdate(r);
			}
		});
	}

	statusButton() {
		let status, action;
		this.props.playlist.share ? 
			(status = 'Public / ', action =  'Stop Sharing')  : 
			(status = 'Private / ', action = 'Share');
		return(
			<div>
				<b>Status: </b> { status }
				<button onClick={this.handleClick} 
					value={!this.props.playlist.share}>
					{action}
				</button>
			</div>
		);
	}

	render() {
		return this.statusButton();
	}
}