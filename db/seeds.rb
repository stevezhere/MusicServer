# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
	username: "Stevie",
	email: "me@me.com",
	password: "123321"
})

Music.create({
	title: "When Your Gone",
	audio_file_name: "When_You're_Gone_(trim).mp3",
  audio_content_type: "audio/mpeg",
  audio_file_size: 410155,
  audio_updated_at: Time.now
})
Music.create({
	title: "This I Promise You",
	audio_file_name: "This_I_Promise_You_(trim).mp3",
  audio_content_type: "audio/mpeg",
  audio_file_size: 482253,
  audio_updated_at: Time.now
})
Music.create({
	title: "Can't Stand It",
	audio_file_name: "Can't_Stand_It_(trim).mp3",
  audio_content_type: "audio/mpeg",
  audio_file_size: 433978,
  audio_updated_at: Time.now
})