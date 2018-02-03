class SessionsController < Devise::SessionsController
  def new
  	super
  end

  def create
  	super
  	User.guest_cleanup
  end

end