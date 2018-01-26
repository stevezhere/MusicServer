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
			data: {playlist: {share:  e.target.value}},
			success: (r) => {
				this.props.handleStatusUpdate(r);
			}
		});
	}

	statusButton() {
		let status, action;
		this.props.playlist.share ? 
			(status = 'Public', action =  'Stop Sharing')  : 
			(status = 'Private', action = 'Share');
		return(
			<div>
				Status: { status } /
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