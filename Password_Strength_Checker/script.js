const passwordInput = document.getElementById('password');
const strengthDisplay = document.getElementById('strength');
const suggestionsDisplay = document.getElementById('suggestions');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const { strength, suggestions } = checkPasswordStrength(password);

    strengthDisplay.textContent = `Strength: ${strength}`;

    suggestionsDisplay.innerHTML = '';
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsDisplay.appendChild(li);
    });
});

function checkPasswordStrength(password) {
    let strength = 'Weak';
    const suggestions = [];

    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);

    let score = 0;

    if (lengthCriteria) score++;
    else suggestions.push('Use at least 8 characters.');

    if (numberCriteria) score++;
    else suggestions.push('Add at least one number.');

    if (symbolCriteria) score++;
    else suggestions.push('Include at least one special character.');

    if (uppercaseCriteria) score++;
    else suggestions.push('Use at least one uppercase letter.');

    if (score === 4) {
        strength = 'Very Strong';
    } else if (score === 3) {
        strength = 'Strong';
    }

    return { strength, suggestions };
}
