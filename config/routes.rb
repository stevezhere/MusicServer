Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  get '/musics', to: 'musics#index'
  get '/musics/show', to: 'musics#show'

  
  # resources :musics, only: [:index, :create]
  # post '/musics', to: 'musics#show'

  # get '/patients/:id', to: 'patients#show'
end
