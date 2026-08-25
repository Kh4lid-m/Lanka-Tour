/* Lanka Hire — Static site script */

const SITE = {
  whatsappNumber: "94740618188",
  phone: "+94 74 061 8188",
};

document.addEventListener("DOMContentLoaded", () => {
  // Update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const form = document.getElementById("inquiry-form");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    phone: document.getElementById("phone"),
    date: document.getElementById("date"),
    message: document.getElementById("message"),
  };

  const errors = {
    name: document.getElementById("name-error"),
    phone: document.getElementById("phone-error"),
    date: document.getElementById("date-error"),
    message: document.getElementById("message-error"),
  };

  const countEl = document.getElementById("message-count");
  const touched = { name: false, phone: false, date: false, message: false };

  function validate(values) {
    const next = {};

    if (!values.name.trim()) next.name = "Please enter your name.";
    else if (values.name.length > 100) next.name = "Name must be under 100 characters.";

    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    else if (values.phone.length > 30) next.phone = "Phone number is too long.";

    if (values.date) {
      const selected = new Date(values.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) next.date = "Please choose today or a future date.";
    }

    if (!values.message.trim()) next.message = "Please tell us what you need.";
    else if (values.message.length > 1000) next.message = "Message must be under 1000 characters.";

    return next;
  }

  function getValues() {
    return {
      name: fields.name.value,
      phone: fields.phone.value,
      date: fields.date.value,
      message: fields.message.value,
    };
  }

  function showErrors(validation) {
    Object.keys(errors).forEach((key) => {
      errors[key].textContent = validation[key] || "";
    });
  }

  function updateCharCount() {
    if (countEl) {
      countEl.textContent = `${fields.message.value.length}/1000`;
    }
  }

  Object.keys(fields).forEach((key) => {
    const el = fields[key];
    el.addEventListener("input", () => {
      if (key === "message") updateCharCount();
      if (touched[key]) {
        showErrors(validate(getValues()));
      }
    });
    el.addEventListener("blur", () => {
      touched[key] = true;
      showErrors(validate(getValues()));
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = getValues();
    const validation = validate(values);
    showErrors(validation);
    Object.keys(touched).forEach((key) => (touched[key] = true));

    if (Object.keys(validation).length === 0) {
      const text = encodeURIComponent(
        `Hi, I'm interested in booking a ride with Lanka Hire.\n\n` +
          `Name: ${values.name}\n` +
          `Phone: ${values.phone}\n` +
          `Date: ${values.date || "(not provided)"}\n` +
          `Message: ${values.message}`
      );
      window.open(`https://wa.me/${SITE.whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    }
  });

  updateCharCount();
});
