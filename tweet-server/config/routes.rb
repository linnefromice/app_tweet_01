Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/sign_in', to: 'users#sign_in'
  post '/sign_up', to: 'users#sign_up'
  resource :users, :only => [:show]
  get '/users/detail/:id', to: 'users#detail'
  resource :tweets
  delete '/tweets/:id', to: 'tweets#delete'
  get '/tweets/detail/:id', to: 'tweets#detail'
end
