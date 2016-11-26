


export const getImpactDistance = (weapon) => {

  var coords = {
    lat1: weapon.target.location.coords.latitude,
    lon1: weapon.target.location.coords.longitude,
    lat2: weapon.destination.latitude,
    lon2: weapon.destination.longitude,
  }

  return _getDistance(coords);

}



// ------------------------------------------------------------------------
//  Actually calculate the distance (in km)
// ------------------------------------------------------------------------

function _getDistance({lat1, lon1, lat2, lon2}) {

  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  const distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

  return Math.round(distance * 100) / 100 // round to nearest 1000th
}
