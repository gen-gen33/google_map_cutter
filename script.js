let map;
let markers = [];
let rectangle;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.6895, lng: 139.6917 }, // Initial position set to Tokyo
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.addListener('click', function(event) {
        addMarker(event.latLng);
        if (markers.length === 2) {
            drawRectangle();
            fitBoundsToRectangle();
        }
    });
}

function addMarker(location) {
    if (markers.length < 2) {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });

        marker.addListener('dragend', updateInputFields);
        markers.push(marker);

        updateInputFields();
    }
}

function updateInputFields() {
    if (markers[0]) {
        document.getElementById('lat1').value = markers[0].getPosition().lat();
        document.getElementById('lng1').value = markers[0].getPosition().lng();
    }
    if (markers[1]) {
        document.getElementById('lat2').value = markers[1].getPosition().lat();
        document.getElementById('lng2').value = markers[1].getPosition().lng();
    }
    if (rectangle) {
        drawRectangle();
        fitBoundsToRectangle();
    }
}

function drawRectangle() {
    if (rectangle) {
        rectangle.setMap(null);
    }
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => bounds.extend(marker.getPosition()));
    rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true,
        map: map,
        fillColor: '#FF0000',
        fillOpacity: 0,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 2
    });

    // Watch for changes to the rectangle bounds and update the zoom level
    google.maps.event.addListener(rectangle, 'bounds_changed', fitBoundsToRectangle);
}

function fitBoundsToRectangle() {
    map.fitBounds(rectangle.getBounds());
}

function applyCoordinates() {
    const lat1 = parseFloat(document.getElementById('lat1').value);
    const lng1 = parseFloat(document.getElementById('lng1').value);
    const lat2 = parseFloat(document.getElementById('lat2').value);
    const lng2 = parseFloat(document.getElementById('lng2').value);

    if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
        alert('Please input valid coordinates.');
        return;
    }

    if (markers.length === 2) {
        markers[0].setPosition(new google.maps.LatLng(lat1, lng1));
        markers[1].setPosition(new google.maps.LatLng(lat2, lng2));
    } else {
        resetMarkers();
        addMarker(new google.maps.LatLng(lat1, lng1));
        addMarker(new google.maps.LatLng(lat2, lng2));
    }

    drawRectangle();
    fitBoundsToRectangle();
}

function takeScreenshot() {
    let lat1 = parseFloat(document.getElementById('lat1').value);
    let lng1 = parseFloat(document.getElementById('lng1').value);
    let lat2 = parseFloat(document.getElementById('lat2').value);
    let lng2 = parseFloat(document.getElementById('lng2').value);

    if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
        if (markers.length < 2) {
            alert('Please input valid coordinates or add two markers on the map.');
            return;
        }
        lat1 = markers[0].getPosition().lat();
        lng1 = markers[0].getPosition().lng();
        lat2 = markers[1].getPosition().lat();
        lng2 = markers[1].getPosition().lng();
    }

    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(lat1, lng1),
        new google.maps.LatLng(lat2, lng2)
    );

    const center = bounds.getCenter();
    const zoom = map.getZoom(); // 現在のズームレベルを固定

    // 選択された地図タイプを取得
    const mapType = document.querySelector('input[name="maptype"]:checked').value;

    // 画像サイズを計算
    const projection = map.getProjection();
    const scale = Math.pow(2, zoom);

    const worldPoint1 = projection.fromLatLngToPoint(new google.maps.LatLng(lat1, lng1));
    const worldPoint2 = projection.fromLatLngToPoint(new google.maps.LatLng(lat2, lng2));

    const pixelWidth = Math.abs(worldPoint1.x - worldPoint2.x) * scale;
    const pixelHeight = Math.abs(worldPoint1.y - worldPoint2.y) * scale;

    const width = Math.round(pixelWidth);
    const height = Math.round(pixelHeight);

    const url = generateStaticMapUrl(center.lat(), center.lng(), width, height, zoom, mapType, config.API_KEY);

    window.open(url, '_blank');
}

function resetMarkers() {
    if (rectangle) {
        rectangle.setMap(null);
        rectangle = null;
    }
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    document.getElementById('lat1').value = '';
    document.getElementById('lng1').value = '';
    document.getElementById('lat2').value = '';
    document.getElementById('lng2').value = '';
}

function generateStaticMapUrl(centerLat, centerLon, width, height, zoom, mapType, apiKey) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&scale=2&maptype=${mapType}&key=${apiKey}`;
}

// Load Google Maps script dynamically with the API key from config.js
function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

loadScript();
