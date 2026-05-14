export const LOCATIONS = {
  haiti: {
    lat: 18.5944,
    lng: -72.3074,
    color: "#FF6B6B",
    label: "Haiti / DR",
    detail: "2 field projects",
  },
  korea: {
    lat: 37.5665,
    lng: 126.978,
    color: "#3B82F6",
    label: "Korea",
    detail: "2 engineering systems",
  },
  usa: {
    lat: 42.3601,
    lng: -71.0589,
    color: "#10B981",
    label: "USA",
    detail: "next chapter",
  },
} as const;

export type LocationKey = keyof typeof LOCATIONS;

export function latLngToVector3(lat: number, lng: number, radius = 2.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}
