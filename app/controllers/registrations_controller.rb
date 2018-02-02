class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
    @user = User.new(user_params)
    if @user.save
      current_user.move_to(@user) if current_user && current_user.guest?
      sign_up("user", @user)
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  private
  def user_params
  	params.require(:user).permit(:username, :email, :password)
  end
end