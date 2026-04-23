import { ReactNode } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";

interface ClusterLayerProps {
  children: ReactNode;
}

export default function ClusterLayer({ children }: ClusterLayerProps) {
  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      maxClusterRadius={50}
    >
      {children}
    </MarkerClusterGroup>
  );
}
