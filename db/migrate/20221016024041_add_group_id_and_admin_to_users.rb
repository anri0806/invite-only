class AddGroupIdAndAdminToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :group_id, :integer
    add_column :users, :admin, :boolean
  end
end
