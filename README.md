# Invite Only

<img src="/client/src/Images/invite-only.png" alt="Alt text" title="invite-only">

## Description

Invite Only is a private social media designed for anyone or anything from close friends to extended family or for any occasions like trips, weddings, etc. The user will be able to create a group to share posts and only invited users can see them. Users will only be able to sign up through an invitation email by admin user. 


## Usage

1. Log in/ Sign up
A user can sign up as an admin and create a group.  Once logged in, admin user can invite people by email on the Invite People tab.  Invited user will receive an email with "Accept invitation" link.  Once clicked, it will direct a user to sign up page to join a private group.

2. Feed 
Users will be able to see the posts in a private group that they were invited to, as well as post pictures and comments once logged in.

3. Profile 
On profile tab, users can see their own profile as well as posts history.

4. Members
Users can see the list of members in a group. They can also view each member's profile page and posts histories.

5. Invite people
Only admin user will be able to see the "Invite People" tab.  Admin user can invite people by entering email and it will automatically send invitation email to the person.


## System Dependencies

- Ruby 2.7.4
- NodeJS (v16), and npm
- Rails 7
- Postgresql
- React 17
- Devise
- Devise Invitable


## installation

1. Fork and clone this repository
2. Open the project file and run followings:

bundle install
rails db:create
npm install --prefix client
rails s
npm start --prefix client


## Contact
Anri Kawahara, github: anri0806
