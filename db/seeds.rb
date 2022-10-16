# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "seeding...🌱"


g1 = Group.create(group_name: "Brooks Family", created_at: "2022-9-12")
g2 = Group.create(group_name: "Husky Basketball Team", created_at: "2022-9-15")

u1 = User.create(username: "Stephanie", email: "steph@gmail.com", password: "1234567", admin: true, group_id: g1.id)
u2 = User.create(username: "Dylan", email: "dylan@gmail.com", password: "abcdefg", admin: false, group_id: g1.id)
u3 = User.create(username: "Tiffany", email: "tiffany@gmail.com", password: "111111111", admin: true, group_id: g2.id)
u4 = User.create(username: "Sarah", email: "sarah@gmail.com", password: "222222222", admin: false, group_id: g2.id)
u5 = User.create(username: "Emma", email: "emma@gmail.com", password: "333333333", admin: false, group_id: g1.id)

p1 = Post.create(caption: "Hello Brooks Family!", created_at: "2022-9-13 9:00AM", user_id: u1.id, group_id: g1.id )
p2 = Post.create(caption: "Post anything related to our team here. (i.e. practice schedule, pictures, etc.)", created_at: "2022-9-16 12:00PM", user_id: u3.id, group_id: g2.id )
p3 = Post.create(caption: "This is awesome!", created_at: "2022-9-14 11:34AM", user_id: u2.id, group_id: g1.id)


# c1 = Comment.create(content: "Thank you for inviting me.", created_at: "2022-9-14 10:00AM", user_id: u2.id, post_id: p1.id, group_id: g1.id)
# c2 = Comment.create(content: "Awesome!", created_at: "2022-9-16 10:00PM", user_id: u4.id, post_id: p2.id, group_id: g2.id )


puts "seeding done 🌱"