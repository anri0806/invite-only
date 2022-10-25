# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "seeding...🌱"


g1 = Group.create(group_name: "Millers", created_at: "2022-9-12")
g2 = Group.create(group_name: "Erika's bachelorette Trip", created_at: "2022-8-15")

u1 = User.create(username: "Stephanie", email: "steph@gmail.com", password: "1234567", admin: true, group_id: g1.id)
u2 = User.create(username: "Dylan", email: "dylan@gmail.com", password: "abcdefg", admin: false, group_id: g1.id)
u3 = User.create(username: "Susan", email: "susan@gmail.com", password: "444444444", admin: false, group_id: g1.id)
u4 = User.create(username: "Emma", email: "emma@gmail.com", password: "333333333", admin: false, group_id: g1.id)
u5 = User.create(username: "David", email: "david@gmail.com", password: "555555555", admin: false, group_id: g1.id)
u7 = User.create(username: "Tiffany", email: "tiffany@gmail.com", password: "111111111", admin: true, group_id: g2.id)
u8 = User.create(username: "Sarah", email: "sarah@gmail.com", password: "222222222", admin: false, group_id: g2.id)
u9 = User.create(username: "Antoinette", email: "antoinette@gmail.com", password: "333333333", admin: false, group_id: g2.id)
u10 = User.create(username: "Esther", email: "esther@gmail.com", password: "666666666", admin: false, group_id: g2.id)
u11 = User.create(username: "Amy", email: "amy@gmail.com", password: "777777777", admin: false, group_id: g2.id)

p1 = Post.create(caption: "Hello Millers family!", created_at: "2022-9-13 9:00AM", user_id: u1.id, group_id: g1.id )
p2 = Post.create(caption: "This is awesome!", created_at: "2022-9-14 11:34AM", user_id: u2.id, group_id: g1.id)
p4 = Post.create(caption: "Anyone wants to do BBQ this weekend?", created_at: "2022-9-23 2:00PM", user_id: u5.id, group_id: g1.id)
p7 = Post.create(caption: "We are meeting up at 8AM at the airport on Friday! Don't be late!", created_at: "2022-8-23 11:12PM", user_id: u7.id, group_id: g2.id)
p10 = Post.create(caption: "Where is Esther and Antoinette?", created_at: "2022-8-27 6:02AM", user_id: u11.id, group_id: g2.id)


c1 = Comment.create(content: "Thank you for inviting me.", created_at: "2022-9-14 10:00AM", user_id: u2.id, post_id: p1.id, group_id: g1.id)
c2 = Comment.create(content: "I'm in", created_at: "2022-9-23 8:09PM", user_id: u2.id, post_id: p4.id, group_id: g1.id)
c3 = Comment.create(content: "haha don't worry!", created_at: "2022-8-23 11:30PM", user_id: u8.id, post_id: p7.id, group_id: g2.id )
c4 = Comment.create(content: "We got it!", created_at: "2022-8-23 11:39PM", user_id: u9.id, post_id: p7.id, group_id: g2.id )
c5 = Comment.create(content: "Sorry we are coming now!", created_at: "2022-8-27 6:10AM", user_id: u8.id, post_id: p10.id, group_id: g2.id )


puts "seeding done 🌱"