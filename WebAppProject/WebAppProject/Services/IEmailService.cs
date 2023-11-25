using WebAppProject.Models.Emails;

namespace WebAppProject.Services
{
    public interface IEmailService
    {
        public void SendEmail(Message message);
    }
}
