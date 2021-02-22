/*
 * wematch_da24_mobile/common.js에 calcRoute 내용을 가져왔음
 */

interface AddressProps {
  start: string;
  end: string;
}

export const calcRouteByDirectionService = (
  address: AddressProps,
  callback: (distance: string | null) => void
) => {
  let distance = "";
  let final_distance = "";

  if (
    address.start === "" ||
    address.start === "출발지" ||
    address.start === "읍/면/동 주소"
  ) {
    return;
  }
  if (
    address.end === "" ||
    address.end === "도착지" ||
    address.end === "읍/면/동 주소"
  ) {
    return;
  }

  if (address.start.indexOf("세종특별자치시 세종시") >= 0) {
    address.start = "충청남도" + address.start.split("세종특별자치시 세종시").join("");
  }

  if (address.end.indexOf("세종특별자치시 세종시") >= 0) {
    address.end = "충청남도" + address.start.split("세종특별자치시 세종시").join("");
  }

  const request = {
    origin: address.start,
    destination: address.end,
    travelMode: google.maps.TravelMode.TRANSIT
  };

  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(
    request,
    (
      response: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (response.routes && response.routes.length > 0) {
          distance = response.routes[0].legs[0].distance.text;
        }

        final_distance = distance.replace(" km", "").replace(" m", "");
        callback(final_distance);
      } else {
        callback(null);
      }
    }
  );
};

export const calcRouteByGeoCoder = (
  addresses: string[],
  callback: (coords?: google.maps.LatLng[] | null) => void
) => {
  const coords: google.maps.LatLng[] = [];

  for (let i = 0; i < addresses.length; i++) {
    let currAddress = addresses[i];
    const geoCoder = new window.google.maps.Geocoder();
    if (geoCoder) {
      geoCoder.geocode({ address: currAddress }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          coords.push(results[0].geometry.location);
          if (coords.length === addresses.length) {
            callback(coords);
          }
        } else {
          callback(null);
        }
      });
    }
  }
};
