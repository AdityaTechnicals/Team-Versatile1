document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userQuestion = document.getElementById('user-question').value;
        const dietPreference = document.getElementById('diet-preference').value;

        // Clear input field
        document.getElementById('user-question').value = '';

        if (!userQuestion) {
            alert('Please enter a question.');
            return;
        }

        const data = {
            user_question: userQuestion,
            diet_preference: dietPreference
        };

        try {
            const response = await fetch('/solve-diet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const answer = responseData.answer;

            // Display the answer in the chat box
            displayMessage(userQuestion, 'user');
            displayMessage(answer, 'bot');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request.');
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerText = message;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }
});
