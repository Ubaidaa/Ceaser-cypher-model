document.getElementById('encryption-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  var inputText = document.getElementById('encryption-text-input').value;
  var key = document.getElementById('encryption-key-input').value;
  var algorithm = document.getElementById('encryption-algorithm-select').value;
  
  var encryptedText = '';
  
  // Perform encryption based on the selected algorithm
  if (algorithm === 'caesar') {
    encryptedText = caesarCipher(inputText, key);
  } else if (algorithm === 'vigenere') {
    encryptedText = vigenereCipher(inputText, key);
  }
  
  document.getElementById('encryption-output').textContent = encryptedText;
});

document.getElementById('decryption-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  var inputText = document.getElementById('decryption-text-input').value;
  var key = document.getElementById('decryption-key-input').value;
  var algorithm = document.getElementById('decryption-algorithm-select').value;
  
  var decryptedText = '';
  
  // Perform decryption based on the selected algorithm
  if (algorithm === 'caesar') {
    decryptedText = caesarCipher(inputText, -key);
  } else if (algorithm === 'vigenere') {
    decryptedText = vigenereCipher(inputText, key);
  }
  
  document.getElementById('decryption-output').textContent = decryptedText;
});

function caesarCipher(text, key) {
  var shift = parseInt(key) || 0; // Convert key to an integer, default to 0 if invalid
  var result = '';
  for (var i = 0; i < text.length; i++) {
    var charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letter
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letter
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      // Non-alphabetic character
      result += text.charAt(i);
    }
  }
  return result;
}

function vigenereCipher(text, key) {
  var result = '';
  var keyIndex = 0;
  for (var i = 0; i < text.length; i++) {
    var charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letter
      var keyCharCode = key.charCodeAt(keyIndex % key.length);
      var shift = keyCharCode - 65;
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      keyIndex++;
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letter
      var keyCharCode = key.charCodeAt(keyIndex % key.length);
      var shift = keyCharCode - 97;
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      keyIndex++;
    } else {
      // Non-alphabetic character
      result += text.charAt(i);
    }
  }
  return result;
}
