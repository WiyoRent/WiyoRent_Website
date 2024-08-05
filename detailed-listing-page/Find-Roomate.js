document.addEventListener("DOMContentLoaded", function() {
    const roommateMessage = document.querySelector(".roommate-message");
    const shareWhatsapp = document.getElementById("share-whatsapp");
    const shareEmail = document.getElementById("share-email");
    const messageTextarea = document.getElementById("roommate-Message");
    const roommateContainer = document.querySelector(".roommate-container");

    roommateContainer.addEventListener("click", function() {
        if (roommateMessage.classList.contains("open")) {
            roommateMessage.style.maxHeight = "0";
            roommateMessage.classList.remove("open");
        } else {
            roommateMessage.style.maxHeight = `${roommateMessage.scrollHeight}px`;
            roommateMessage.classList.add("open");
        }
    });

    shareWhatsapp.addEventListener("click", function(event) {
        event.stopPropagation();
        const message = encodeURIComponent(messageTextarea.value);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://wa.me/?text=${message}%0A${url}`, '_blank');
    });

    shareEmail.addEventListener("click", function(event) {
        event.stopPropagation();
        const message = encodeURIComponent(messageTextarea.value);
        const url = encodeURIComponent(window.location.href);
        window.location.href = `mailto:?subject=Roommate Inquiry&body=${message}%0A${url}`;
    });
});
