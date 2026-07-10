importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

// Initialize Firebase compat inside Service Worker context
firebase.initializeApp({
  apiKey: "AIzaSyDHgpEn9XHwbO8yeB9ccJtzaAli55VQfr0",
  authDomain: "theaskt.firebaseapp.com",
  projectId: "theaskt",
  storageBucket: "theaskt.firebasestorage.app",
  messagingSenderId: "828901237289",
  appId: "1:828901237289:web:0a2a04b3d527f8377ab238"
});

const messaging = firebase.messaging();

// Handle background notification display
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || payload.data?.title || "New Update from TheAskt";
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: payload.notification?.icon || payload.data?.icon || "/icon-192.png",
    image: payload.notification?.image || payload.data?.image || undefined,
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click action (redirect to article page)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const clickActionUrl = event.notification.data?.click_action || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, navigate it
      for (const client of clientList) {
        if (client.url === clickActionUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(clickActionUrl);
      }
    })
  );
});
