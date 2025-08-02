import { useEffect, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamically import to avoid SSR issues
const CommunityMapComponent = dynamic(() => Promise.resolve(CommunityMapInner), {
  ssr: false
})

function CommunityMapInner() {
  const mapRef = useRef(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) return

    // Import Leaflet and plugins dynamically
    const loadMap = async () => {
      try {
        // Import Leaflet
        const L = (await import('leaflet')).default
        
        // Import marker cluster plugin
        const MarkerClusterGroup = (await import('leaflet.markercluster')).default
        
        // Make markerClusterGroup available on L
        if (!L.markerClusterGroup && MarkerClusterGroup) {
          L.markerClusterGroup = MarkerClusterGroup
        }
        
        // Fix default markers
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
        
        initializeMap(L)
        isInitialized.current = true
      } catch (error) {
        console.error('Error loading map:', error)
      }
    }
    
    loadMap()

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        isInitialized.current = false
      }
    }
  }, [])

  const initializeMap = (L) => {
    // Check if container exists and is not already initialized
    const container = document.getElementById('community-map')
    if (!container) {
      console.error('Map container not found')
      return
    }

    // Clear any existing map
    if (mapRef.current) {
      mapRef.current.remove()
    }

    // Sample community data
    const communityPins = [
      {
        id: 1,
        type: 'trap',
        lat: 33.7490,
        lng: -84.3880,
        message: "I trap in Atlanta, building my music career one beat at a time. 🎵",
        timestamp: "2024-01-15"
      },
      {
        id: 2,
        type: 'harmony',
        lat: 25.7617,
        lng: -80.1918,
        message: "Miami beach is where I find my harmony. The waves wash away all stress. 🌊",
        timestamp: "2024-01-14"
      },
      {
        id: 3,
        type: 'trap',
        lat: 40.7128,
        lng: -74.0060,
        message: "NYC hustle never stops. Every corner has a story, every street a dream. 🏙️",
        timestamp: "2024-01-13"
      },
      {
        id: 4,
        type: 'harmony',
        lat: 36.1699,
        lng: -115.1398,
        message: "Found peace in the desert sunrise outside Vegas. Sometimes you gotta get away. 🌅",
        timestamp: "2024-01-12"
      },
      {
        id: 5,
        type: 'trap',
        lat: 34.0522,
        lng: -118.2437,
        message: "LA grind is real. Chasing dreams in the city of angels. ✨",
        timestamp: "2024-01-11"
      },
      {
        id: 6,
        type: 'harmony',
        lat: 47.6062,
        lng: -122.3321,
        message: "Seattle coffee shops are my sanctuary. Rain and creativity go hand in hand. ☕",
        timestamp: "2024-01-10"
      }
    ];

    let map;
    let markerClusterGroup;
    let allMarkers = [];
    let isClusterMode = true;
    let isAddingPin = false;
    let tempMarker = null;

    // Initialize map
    try {
      map = L.map('community-map', {
        center: [39.8283, -98.5795], // Center of USA
        zoom: 4,
        zoomControl: false,
        attributionControl: false
      });
      
      mapRef.current = map
    } catch (error) {
      console.error('Error initializing map:', error)
      return
    }

    // Add custom zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Dark map tiles
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
      maxZoom: 20
    }).addTo(map);

    // Initialize marker cluster group
    try {
      markerClusterGroup = L.markerClusterGroup({
        disableClusteringAtZoom: 10,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: '<div class="cluster-icon">' + count + '</div>',
            className: 'custom-cluster',
            iconSize: [40, 40]
          });
        }
      });
    } catch (error) {
      console.error('Error creating marker cluster group:', error)
      // Fallback without clustering
      markerClusterGroup = L.layerGroup()
    }

    function createCustomIcon(type) {
      const iconHtml = type === 'trap' 
        ? '<div class="custom-marker trap-marker">🌹</div>'
        : '<div class="custom-marker harmony-marker">🕊️</div>';
      
      return L.divIcon({
        html: iconHtml,
        className: 'custom-marker-container',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });
    }

    function loadCommunityPins() {
      allMarkers = [];
      
      communityPins.forEach(pin => {
        const marker = L.marker([pin.lat, pin.lng], {
          icon: createCustomIcon(pin.type)
        });

        const popupContent = createPopupContent(pin);
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        allMarkers.push(marker);
        markerClusterGroup.addLayer(marker);
      });

      map.addLayer(markerClusterGroup);
    }

    function createPopupContent(pin) {
      const typeLabel = pin.type === 'trap' ? 'Trap' : 'Harmony';
      const emoji = pin.type === 'trap' ? '🌹' : '🕊️';
      const bgColor = pin.type === 'trap' ? 'bg-red-600' : 'bg-green-500';
      
      return `
        <div class="popup-content">
          <div class="popup-header ${bgColor}">
            <span class="popup-emoji">${emoji}</span>
            <span class="popup-type">${typeLabel}</span>
          </div>
          <div class="popup-body">
            <p class="popup-message">${pin.message}</p>
            <p class="popup-date">${new Date(pin.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      `;
    }

    function setupEventListeners() {
      // Add delay to ensure DOM elements are ready
      setTimeout(() => {
        // Add pin button
        const addPinBtn = document.getElementById('add-pin-btn');
        if (addPinBtn) {
          addPinBtn.addEventListener('click', () => {
            if (!isAddingPin) {
              startAddingPin();
            }
          });
        }

        // Toggle clusters
        const toggleBtn = document.getElementById('toggle-view-btn');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', toggleClusters);
        }

        // Modal events
        const cancelBtn = document.getElementById('cancel-pin-btn');
        if (cancelBtn) {
          cancelBtn.addEventListener('click', cancelAddingPin);
        }

        const form = document.getElementById('add-pin-form');
        if (form) {
          form.addEventListener('submit', handlePinSubmit);
        }

        // Close modal on outside click
        const modal = document.getElementById('add-pin-modal');
        if (modal) {
          modal.addEventListener('click', (e) => {
            if (e.target.id === 'add-pin-modal') {
              cancelAddingPin();
            }
          });
        }
      }, 100)

      // Map click for adding pins
      map.on('click', handleMapClick);
    }

    function startAddingPin() {
      isAddingPin = true;
      const btn = document.getElementById('add-pin-btn');
      if (btn) {
        btn.textContent = 'Click on map to place pin';
        btn.classList.add('bg-yellow-600', 'hover:bg-yellow-700');
        btn.classList.remove('bg-red-600', 'hover:bg-red-700');
      }
      map.getContainer().style.cursor = 'crosshair';
    }

    function handleMapClick(e) {
      if (!isAddingPin) return;

      const { lat, lng } = e.latlng;
      
      // Remove existing temp marker
      if (tempMarker) {
        map.removeLayer(tempMarker);
      }

      // Add temporary marker
      tempMarker = L.marker([lat, lng], {
        icon: createCustomIcon('trap')
      }).addTo(map);

      // Store coordinates for form submission
      window.pendingPinCoords = { lat, lng };

      // Show modal
      const modal = document.getElementById('add-pin-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function handlePinSubmit(e) {
      e.preventDefault();
      
      const typeElement = document.getElementById('pin-type');
      const messageElement = document.getElementById('pin-message');
      
      if (!typeElement || !messageElement) return;
      
      const type = typeElement.value;
      const message = messageElement.value || 'No message provided';
      
      if (!window.pendingPinCoords) return;

      // Create new pin data
      const newPin = {
        id: communityPins.length + 1,
        type: type,
        lat: window.pendingPinCoords.lat,
        lng: window.pendingPinCoords.lng,
        message: message,
        timestamp: new Date().toISOString()
      };

      // Add to community pins
      communityPins.push(newPin);

      // Update temp marker with correct icon
      if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = L.marker([newPin.lat, newPin.lng], {
          icon: createCustomIcon(newPin.type)
        });
        
        const popupContent = createPopupContent(newPin);
        tempMarker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        allMarkers.push(tempMarker);
        markerClusterGroup.addLayer(tempMarker);
      }

      // Reset form and close modal
      cancelAddingPin();
      
      // Show success message
      if (tempMarker) {
        tempMarker.openPopup();
      }
    }

    function cancelAddingPin() {
      isAddingPin = false;
      const btn = document.getElementById('add-pin-btn');
      if (btn) {
        btn.textContent = '+ Add Your Pin';
        btn.classList.remove('bg-yellow-600', 'hover:bg-yellow-700');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
      }
      map.getContainer().style.cursor = '';
      
      // Hide modal
      const modal = document.getElementById('add-pin-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      
      // Reset form
      const form = document.getElementById('add-pin-form');
      if (form) {
        form.reset();
      }
      
      // Remove temp marker if exists
      if (tempMarker && !communityPins.find(pin => 
        pin.lat === tempMarker.getLatLng().lat && pin.lng === tempMarker.getLatLng().lng
      )) {
        map.removeLayer(tempMarker);
        tempMarker = null;
      }
      
      window.pendingPinCoords = null;
    }

    function toggleClusters() {
      const btn = document.getElementById('toggle-view-btn');
      
      if (isClusterMode) {
        // Remove clusters, show individual markers
        map.removeLayer(markerClusterGroup);
        allMarkers.forEach(marker => map.addLayer(marker));
        if (btn) btn.textContent = 'Enable Clusters';
        isClusterMode = false;
      } else {
        // Remove individual markers, show clusters
        allMarkers.forEach(marker => map.removeLayer(marker));
        map.addLayer(markerClusterGroup);
        if (btn) btn.textContent = 'Toggle Clusters';
        isClusterMode = true;
      }
    }

    function addCustomStyles() {
      // Check if styles already added
      if (document.getElementById('community-map-styles')) return
      
      const style = document.createElement('style');
      style.id = 'community-map-styles'
      style.textContent = `
        .custom-marker-container {
          background: transparent !important;
          border: none !important;
        }

        .custom-marker {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 2px solid white;
          transition: transform 0.2s ease;
        }

        .custom-marker:hover {
          transform: scale(1.1);
        }

        .trap-marker {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }

        .harmony-marker {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .custom-cluster {
          background: transparent !important;
          border: none !important;
        }

        .cluster-icon {
          background: linear-gradient(135deg, #374151, #1f2937);
          border: 2px solid #dc2626;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .custom-popup .leaflet-popup-content-wrapper {
          background: #1f2937;
          color: white;
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }

        .custom-popup .leaflet-popup-tip {
          background: #1f2937;
        }

        .popup-content {
          min-width: 250px;
        }

        .popup-header {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-weight: bold;
        }

        .popup-emoji {
          font-size: 18px;
        }

        .popup-body {
          padding: 12px;
          background: #374151;
        }

        .popup-message {
          margin: 0 0 8px 0;
          line-height: 1.4;
          color: #e5e7eb;
        }

        .popup-date {
          margin: 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .leaflet-control-zoom {
          border: none !important;
        }

        .leaflet-control-zoom a {
          background: rgba(0,0,0,0.8) !important;
          color: white !important;
          border: 1px solid #374151 !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(220,38,38,0.8) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Initialize everything
    addCustomStyles();
    loadCommunityPins();
    setupEventListeners();
  }

  return null
}

export default function CommunityMap() {
  return (
    <>
      <Head>
        <title>Community Map - Trap & Harmony</title>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" 
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-black/95 backdrop-blur-sm border-b border-red-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Community <span className="text-red-600">Map</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Share where you trap and find harmony. Connect with the community through stories and locations.
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div 
            id="community-map" 
            className="w-full h-[70vh] relative z-10"
          />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 space-y-2">
            <button 
              id="add-pin-btn"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-lg"
            >
              + Add Your Pin
            </button>
            <button 
              id="toggle-view-btn"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-lg block"
            >
              Toggle Clusters
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-gray-300">Trap (Work/Hustle)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Harmony (Peace/Joy)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Pin Modal */}
        <div 
          id="add-pin-modal" 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Add Your Pin</h3>
            <form id="add-pin-form" className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Pin Type
                </label>
                <select 
                  id="pin-type" 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="trap">🌹 Trap (Where I work/hustle)</option>
                  <option value="harmony">🕊️ Harmony (Where I find peace)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Message (optional)
                </label>
                <textarea 
                  id="pin-message"
                  placeholder="Share your story..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
                  maxLength="150"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Add Pin
                </button>
                <button 
                  type="button"
                  id="cancel-pin-btn"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <CommunityMapComponent />
      </div>
    </>
  )
}

