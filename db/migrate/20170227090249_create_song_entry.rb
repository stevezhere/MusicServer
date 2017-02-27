class CreateSongEntry < ActiveRecord::Migration[5.0]
  def change
    create_table :song_entries do |t|
    	t.references :music, null: false
    	t.references :playlist, null: false

    	t.timestamps null: false
    end
  end
end
