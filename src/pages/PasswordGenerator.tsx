import React, { useState } from "react";
import "./PasswordGenerator.scss";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(9);

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.value = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="passwordgenerator-wrapper">
      <div className="wrapper">
        <h2>Password Generator</h2>
        <div>
          <label>Password Length: </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <button onClick={generatePassword}>Generate Password</button>
        </div>
        {password && (
          <div>
            <strong>Generated Password:</strong>
            <p>{password}</p>
            <button onClick={copyToClipboard}>Copy Password</button>
          </div>
        )}
      
    </div>
  );
};

export default PasswordGenerator;
