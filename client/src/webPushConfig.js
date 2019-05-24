import { PUBLIC_VAPID_KEY } from "./key";
let subscription;
const publicVapidKey = PUBLIC_VAPID_KEY;

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export async function sendSubscription() {
  if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
  }

  // Register SW, Register Push, Send Push
  async function send() {
    // Register Service Worker
    const register = await navigator.serviceWorker.register(
      "/swPushListener.js",
      {
        scope: "/"
      }
    );

    // Register Push
    subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    // Send Push Notification
  }
}
export async function subscribePush() {
  await fetch("/sendNotification", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}
