function contactViaWhatsApp() {
    var message = document.getElementById('contact-message').value;
    var currentPageUrl = window.location.href;
    var encodedMessage = encodeURIComponent(message + "\n\n" + currentPageUrl);
    window.open('https://wa.me/+250794089835?text=' + encodedMessage, '_blank');
}


function contactViaEmail() {
    var message = document.getElementById('contact-message').value;
    var currentPageUrl = window.location.href;
    var encodedMessage = encodeURIComponent(message + "\n\n" + currentPageUrl);
    window.location.href = 'mailto:wiyorent@gmail.com?subject=Booking Inquiry&body=' + encodedMessage;
}