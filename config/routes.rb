Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  devise_for :users

  resources :users, only: :show do
    collection do 
      resources :playlists, except: [:index, :new] do
        collection do 
          get '/stream/:id', to: 'playlists#stream', as: 'stream'
          get '/stream/:id/next', to: 'playlists#next', as: 'next'
          get '/stream/:id/previous', to: 'playlists#previous', as: 'previous'
        end
      end
    end      
  end

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
