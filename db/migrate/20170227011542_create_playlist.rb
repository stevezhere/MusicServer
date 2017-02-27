class CreatePlaylist < ActiveRecord::Migration[5.0]
  def change
    create_table :playlists do |t|
    	t.string :name, null: false
    	t.string :description
    	t.references :user, null: false

    	t.timestamps null: false
    end
  end
end
