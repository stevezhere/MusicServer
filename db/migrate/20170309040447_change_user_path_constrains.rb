class ChangeUserPathConstrains < ActiveRecord::Migration[5.0]
  def change
  	change_column :musics, :path, :string, :null => true
  end
end
