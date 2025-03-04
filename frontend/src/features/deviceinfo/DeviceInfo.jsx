import { useEffect, useState } from "react";

// 🖥️ Get Device Details
const getDeviceDetails = () => {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    browser: detectBrowser(),
    os: detectOS(),
  };
};

// 🌐 Detect Browser
const detectBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Google Chrome";
  if (ua.includes("Firefox")) return "Mozilla Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
  if (ua.includes("Edge")) return "Microsoft Edge";
  if (ua.includes("MSIE") || ua.includes("Trident")) return "Internet Explorer";
  return "Unknown Browser";
};

// 🖥️ Detect OS
const detectOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "MacOS";
  if (ua.includes("X11")) return "UNIX";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown OS";
};

// 📍 Get User Location
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error.message)
      );
    } else {
      reject("Geolocation is not supported.");
    }
  });
};

// 🔄 Send Data to Backend
// const sendUserData = async (data) => {
//   try {
//     const response = await fetch("https://your-api.com/store-user-data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) throw new Error("Failed to send data");
//     console.log("Data sent successfully");
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// };

export const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const deviceDetails = getDeviceDetails();
        const loc = await getUserLocation();
        setDeviceInfo(deviceDetails);
        setLocation(loc);
        // sendUserData({ ...deviceDetails, ...loc });
      } catch (err) {
        setError(err);
        // sendUserData({ ...getDeviceDetails(), location: "Permission Denied" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(deviceInfo);
  console.log(location);
};

// export default DeviceInfo;
