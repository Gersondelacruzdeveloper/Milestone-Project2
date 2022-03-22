/**
 * Send an email message with Email js to my inbox
 */
function sendMail(event) {
  event.preventDefault();
  showSpiner()
  let contactForm = document.getElementById('contact-form');
  emailjs.send('service_830kjsk', 'template_eot1fjz', {
      subject: contactForm.subject.value,
      name: contactForm.name.value,
      message: contactForm.message_input_1.value + " " + contactForm.message_input_2.value + " " +
        contactForm.message_input_3.value + " " + contactForm.message_input_4.value,
      email: contactForm.email.value,
    })
    .then(function (response) {
        location.href = "contact-response.html"
      },
      function (error) {
        location.href = "contact-error-response.html"
      }
    )
}

/**
 * Show the spinner and give opacity to the background
 */
function showSpiner() {
  document.getElementById('loader').style.display = 'block'
  document.body.style.opacity = "0.5";
}