using MimeKit;

namespace WebAppProject.Models.Emails
{
    public class Message
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public List<MailboxAddress> To { get; set; }

        public Message(IEnumerable<string> to, string subject, string content, string email) 
        {

            To = new List<MailboxAddress>();
            To.AddRange(to.Select(x => new MailboxAddress(email, x)));
            Subject = subject;
            Content = content;
        }
    }
}
