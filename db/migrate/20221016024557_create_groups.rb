class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :group_name
      t.integer :how_many_members
      t.string :members

      t.timestamps
    end
  end
end
