import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: email,
      subject,
      message,
    };

    const serviceID = "service_lambt8e";
    const templateID = "template_1snfqxn";
    const userID = "97pI7JWf7O5EPMjAH";

    emailjs.init(userID);

    if (attachment) {
      const reader = new FileReader();

      reader.onload = () => {
        templateParams.attachment = reader.result;

        emailjs
          .send(serviceID, templateID, templateParams)
          .then((response) => {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
            resetForm();
          })
          .catch((error) => {
            console.log("Email failed to send:", error);
          });
      };

      reader.readAsDataURL(attachment);
    } else {
      emailjs
        .send(serviceID, templateID, templateParams)
        .then((response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          resetForm();
        })
        .catch((error) => {
          console.log("Email failed to send:", error);
        });
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setAttachment(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' value={name} onChange={handleNameChange} />

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={handleEmailChange}
      />

      <label htmlFor='subject'>Subject</label>
      <input
        type='text'
        id='subject'
        value={subject}
        onChange={handleSubjectChange}
      />

      <label htmlFor='message'>Message</label>
      <textarea
        id='message'
        value={message}
        onChange={handleMessageChange}
      ></textarea>

      <label htmlFor='attachment'>Attachment</label>
      <input type='file' id='attachment' onChange={handleAttachmentChange} />

      <button type='submit'>Send Email</button>
    </form>
  );
};

export default EmailForm;
