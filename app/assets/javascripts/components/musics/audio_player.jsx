class AudioPlayer extends React.Component {
	musicTitle() {
		if(this.props.musicEmpty) {
			return "EMPTY SONGLIST";
		} else {
			return this.props.music.title;
		}
	}

	musicStream() {
		if(!this.props.musicEmpty) {
			return `/musics/${this.props.music.id}/stream`;
		} else {
			return "";
		}
	}

	emptyList() {
		if(this.props.musicEmpty) {
			return <li> "No Songs Available" </li>;
		}
	}

	render() {
		return(
			<div className='container playerDiv'>
				<div className="row">
					<div className="col-xs-6 col-xs-offset-3 titleContainer">
						<h2 className="songTitle">
							{ this.musicTitle() }
						</h2>
					</div>
				</div>
				<div className="row trackButtonsRow">
					<div className="col-xs-1 col-xs-offset-4" title='Next Song'>
							<button id='previous' className={`isDisabled-${this.props.musicEmpty}`}>
								<img src="/assets/rewind.png" alt="rewind" size="15" />
							</button>
					</div>
					<div className="col-xs-1 col-xs-offset-2" title='Previous Song'>
						<button id='next' className={`isDisabled-${this.props.musicEmpty}`}>
							<img src="/assets/fast-forward.png" alt="forward" size="15"/>
						</button>
					</div>		
				</div>
				<div className="row audioRow">
					<div className="col-xs-1 col-xs-offset-3">
						<audio id='audioPlayer' title='Who needs Track? NOPE' controls>
							<source src={ this.musicStream() }/>
						</audio>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-10 col-xs-offset-2" title="Load List">
						<button id='cacheSong'> 
							<img src="/assets/eject.png" alt="eject" size="8" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

AudioPlayer.defaultProps = { music: null , musicEmpty: true };