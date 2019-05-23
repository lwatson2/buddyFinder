self.addEventListener("push", e => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: "icons8-envelope-480.png",
    badge: "client/public/iconfinder_mail_blue_68760.png"
  };
  self.registration.showNotification(data.title, options);
});
