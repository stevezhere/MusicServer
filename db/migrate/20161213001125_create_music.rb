class CreateMusic < ActiveRecord::Migration[5.0]
  def change
    create_table :musics do |t|
    	t.string :title, null: false
    	t.string :path, null: false

    	t.timestamps null: false
    end
  end
end
