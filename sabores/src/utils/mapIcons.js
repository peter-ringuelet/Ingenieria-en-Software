import L from "leaflet";

export const restaurantIcon = (visited) =>
  new L.Icon({
    iconUrl: visited
      ? "https://cdn-icons-png.flaticon.com/512/1046/1046747.png"
      : "/icons/food.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

export const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
