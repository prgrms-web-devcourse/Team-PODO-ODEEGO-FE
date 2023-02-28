// import { useState } from "react";
// import KakaoMap from "../../components/map/kakak-map";

// export default function Maptest() {
//   // const [visible, setVisible] = useState(true);
//   const [mapSize, setMapSize] = useState([400, 400]);
//   const [markerPositions, setMarkerPositions] = useState<number[][]>([]);

//   const markerPositions1 = [
//     [33.452278, 126.567803],
//     [33.452671, 126.574792],
//     [33.451744, 126.572441],
//   ];
//   const markerPositions2 = [
//     [37.499590490909185, 127.0263723554437],
//     [37.499427948430814, 127.02794423197847],
//     [37.498553760499505, 127.02882598822454],
//     [37.497625593121384, 127.02935713582038],
//     [37.49629291770947, 127.02587362608637],
//     [37.49754540521486, 127.02546694890695],
//     [37.49646391248451, 127.02675574250912],
//   ];

//   return (
//     <>
//       <button onClick={() => setMarkerPositions(markerPositions1)}>
//         Marker Set 1
//       </button>
//       <button onClick={() => setMarkerPositions(markerPositions2)}>
//         Marker Set 2
//       </button>
//       <h2>Kakao Map</h2>
//       <KakaoMap markerPositions={markerPositions1} size={mapSize} />
//     </>
//   );
// }
