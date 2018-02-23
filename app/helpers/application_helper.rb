module ApplicationHelper
	def userAccess?
		user_signed_in? && !current_user.guest
	end
end
