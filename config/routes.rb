Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'musics#index'

  devise_for :users, controllers: {registrations: "registrations", sessions: "sessions"}
  resources :users, only: :show

  resources :playlists, except: [:new] do
    post '/song_entries/create', to: 'song_entries#create'
    delete '/song_entries/destroy', to: 'song_entries#destroy'
  end

  resources :musics, except: [:new, :edit, :update] do 
  	collection do
  		# get :search
      get '/:id/stream', to: 'musics#stream', as: 'stream'
  	end
  end
end
