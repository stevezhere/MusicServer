class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable
  has_many :playlists, :dependent => :destroy
  validates_presence_of :username

  def move_to(user)
  	self.playlists.update_all(user_id: user.id)
  end

  def self.guest_cleanup
  	User.where(guest: :true).destroy_all
  end
end
