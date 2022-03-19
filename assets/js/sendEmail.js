


/**
 * Send an email message with Email js to my inbox
 */
function sendMail(event){
event.preventDefault();
let contactForm = document.getElementById('contact-form')
emailjs.send('service_830kjsk', 'template_eot1fjz', 
{subject: contactForm.subject.value,
name: contactForm.name.value,
message: contactForm.message_input_1.value + " " + contactForm.message_input_2.value + " "
+ contactForm.message_input_3.value + " " + contactForm.message_input_4.value,
email:contactForm.email.value,
})
.then(function(response){
    location.href= "contact-response.html"
}, 
function(error){
    alert('faled', error)
}
)
}
