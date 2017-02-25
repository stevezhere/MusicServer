Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  # get 'musics/search', to: 'musics#search'
  # get 'musics/scan', to: 'musics#scan'
  resources :musics, except: [:edit, :update] do 
  	collection do
  		get :search
  		get :scan
      get '/stream/:id', to: 'musics#stream', as: 'stream'
  	end
  end
  
  # resources :musics, only: [:index, :create]
  # post '/musics', to: 'musics#show'

  # get '/patients/:id', to: 'patients#show'
end
