class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  default from: 'no-reply@invite-only.com'

  layout 'mailer'
end
