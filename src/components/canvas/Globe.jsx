import { Suspense, useRef, useEffect } from "react";
import CanvasLoader from "../Loader";
import * as THREE from "three";
import Globe from "react-globe.gl";

// globe-data.json from https://geojson-maps.ash.ms/
import countries from "./globe/globe-data.json";
import lines from "./globe/lines.json";
import map from "./globe/map.json";

// BUG: disable Orbital controlls in mobile mode

const GlobeObject = () => {
  const globeEl = useRef();

  // Auto Rotate and Disable Zoom controls
  useEffect(() => {
    if (globeEl.current !== undefined && globeEl.current.controls) {
      globeEl.current.controls().enableZoom = false;

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 2;

      globeEl.current.pointOfView({ altitude: 4 }, 5000);
    }
  }, []);

  // Globe Material
  const globeMaterial = new THREE.MeshPhongMaterial();
  globeMaterial.color = new THREE.Color(0x3a228a);
  globeMaterial.emissive = new THREE.Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  return (
    <Globe
      ref={globeEl}
      globeMaterial={globeMaterial}
      backgroundColor="rgba(0,0,0,0)"
      // ARC settings
      arcsData={lines.pulls}
      arcAltitude={(e) => {
        return e.arcAlt;
      }}
      arcStroke={(e) => {
        return e.status ? 0.5 : 0.3;
      }}
      arcDashLength={0.9}
      arcDashGap={4}
      arcLabel={(d) => +d.label}
      arcDashInitialGap={(e) => e.order * 1}
      arcDashAnimateTime={1000}
      arcColor={(e) => {
        return e.status === "complete" ? "#915EFF" : "#ffffff";
      }}
      arcsTransitionDuration={1000}
      // Label settings
      labelsData={map.coordinates}
      labelColor={() => "#ffcb21"}
      labelDotRadius={0.3}
      labelSize={(e) => e.size}
      labelText={"city"}
      labelResolution={6}
      labelAltitude={0.01}
      // Point settings
      pointsData={map.coordinates}
      pointColor={() => "#ffffff"}
      pointsMerged={true}
      pointAltitude={0.07}
      pointRadius={0.05}
      hexPolygonsData={countries.features}
      hexPolygonResolutio={3}
      hexPolygonMargin={0.7}
      hexPolygonColor={() => "rgba(255,255,255, 1)"}
      showAtmosphere={true}
      atmosphereColor="#3a228a"
    />
  );
};

const GlobeCanvas = () => {
  return (
    <Suspense fallback={<CanvasLoader />}>
      <GlobeObject />
    </Suspense>
  );
};

export default GlobeCanvas;
