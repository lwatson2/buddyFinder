import axios from "axios";
let subscription;
const publicVapidKey =
  "BIZR7NyJbK3dFsqILgaZH-TNcfJQR9mhVzhjDu1e2a3r-7EDSLgwGvPOdXaBkppfqjUJ_Xw1TiSZ4g18o0EvmKU";

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
  await fetch("/register", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}
