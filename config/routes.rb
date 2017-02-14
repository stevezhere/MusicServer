Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  get 'musics/search', to: 'musics#search'
  get 'musics/scan', to: 'musics#scan'
  resources :musics, only: [:index, :create, :new, :show]
  
  # resources :musics, only: [:index, :create]
  # post '/musics', to: 'musics#show'

  # get '/patients/:id', to: 'patients#show'
end
