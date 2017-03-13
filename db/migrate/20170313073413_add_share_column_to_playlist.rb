class AddShareColumnToPlaylist < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :share, :boolean
  end
end
