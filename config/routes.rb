Rails.application.routes.draw do

  root to: 'application#root'

  resources :users, only: [:index]
  resources :groups, only: [:index, :show, :create]
  resources :posts, only: [:index, :show, :create, :destroy]
  resources :comments, only: [:index, :show, :create, :update, :destroy]

  get "/get_users/:id", to: "users#get_users"
  get "/group_posts/:id", to: "posts#group_posts"
  get "/user_posts/:id", to: "posts#user_posts"
  get "/group_comments/:id", to: "comments#group_comments"
  # get "users/invitation/accept?invitation_token/:parameter"

  devise_scope :user do
    patch 'users/invitation/accept', to: 'users_invitations#update'
  end
  
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
    invitation: 'users/invitation',
    # users_invitations: 'users/invitation/accept'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    invitations: 'users_invitations',
    # invitations: 'devise/invitations'
    # users_invitations: 'users_invitations'
  }


 
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
