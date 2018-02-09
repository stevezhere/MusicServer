module ApplicationHelper
	def isSessionGuest?
		if user_signed_in? && current_user.guest
			true
		else
			false 
		end
	end
end
