Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  resources :musics, only: [:index, :create, :new, :show]
  get '/search', to: 'musics#search'
  get '/scan', to: 'musics#scan'
  
  # resources :musics, only: [:index, :create]
  # post '/musics', to: 'musics#show'

  # get '/patients/:id', to: 'patients#show'
end
