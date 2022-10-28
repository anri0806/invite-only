class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  # default from: 'no-reply@invite-only.com'

  default from: 'Invite Only <no-reply@invite-only.com>'
  # default(from: "Invite Only <no-reply@invite-only.com>")

  
  layout 'mailer'

end
