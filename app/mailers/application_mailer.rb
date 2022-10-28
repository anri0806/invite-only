class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  default from: 'no-reply@invite-only.com'
  # default from: email_address_with_name('no-reply@invite-only.com', 'Invite Only')

  
  layout 'mailer'

end
