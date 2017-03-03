Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  devise_for :users
  resources :users, only: :show

  resources :playlists, except: [:index, :new] do

    post '/song_entries/create', to: 'song_entries#create'
    delete '/song_entries/destroy', to: 'song_entries#destroy'


    collection do 
      get '/:id/stream', to: 'playlists#stream', as: 'stream'
      get '/:id/stream/next', to: 'playlists#next', as: 'next'
      get '/:id/stream/previous', to: 'playlists#previous', as: 'previous'
    end
  end

  resources :musics, except: [:edit, :update] do 
  	collection do
  		get :search
  		get :scan
      get '/:id/stream', to: 'musics#stream', as: 'stream'
  	end
  end
  
end
