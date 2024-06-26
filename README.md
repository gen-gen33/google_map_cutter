# google_map_cutter

## Overview
The `google_map_cutter` project is a web application that allows users to select two points on a Google Map and cut out an image of the selected area. This application is particularly useful for creating custom maps and extracting specific regions for various uses.

## Features
- **Interactive Map**: Users can interact with the map to place markers and define the area to be cut out.
- **Custom Coordinates**: Users can manually input coordinates for precise selection.
- **Map Types**: Supports different map types, including roadmap and satellite views.
- **Screenshot Functionality**: Easily take screenshots of the selected area.
- **Reset Function**: Clear all markers and start over.

## Files
- `index.html`: The main HTML file that sets up the structure of the web page.
- `styles.css`: Contains the styling for the web page.
- `script.js`: Contains the main JavaScript logic for interacting with the Google Maps API and handling user inputs.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/google_map_cutter.git
   cd google_map_cutter
   ```
2. **Add Google Maps API Key**:
   - Create a file named `config.js` in the root directory.
   - Add your Google Maps API key in the following format:
     ```javascript
     const config = {
         API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY'
     };
     ```

## Usage
1. **Open `index.html`**:
   Open `index.html` in a web browser to start using the application.
   ![image](https://github.com/gen-gen33/google_map_cutter/assets/151072146/a9d75608-1c38-42b1-9179-0244507b7b8c)

3. **Interact with the Map**:
   - Click on the map to place two markers.
   - Adjust the markers by dragging them to the desired locations.
   - Input coordinates directly into the text fields if needed.
   - Select the map type (roadmap or satellite).
   ![image](https://github.com/gen-gen33/google_map_cutter/assets/151072146/15b17032-f9d5-4ebe-8f88-b4450e0c0b7e)

4. **Take a Screenshot**:
   - Click the "Take Screenshot" button to capture the selected area.
   - The screenshot will open in a new tab, where it can be saved.
   ![スクリーンショット_21-6-2024_232717_maps googleapis com](https://github.com/gen-gen33/google_map_cutter/assets/151072146/4ae3afa5-a778-49a1-a20e-75d1e0fa8476)

5. **Reset Markers**:
   - Click the "Reset Markers" button to clear all markers and start over.

## Screenshots
If you need specific images, please let me know, and I can provide screenshots or additional visual aids for the README.

## Dependencies
- Google Maps JavaScript API
- HTML2Canvas for screenshot functionality

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any questions or inquiries, please contact [gen_gen33@outlook.jp].

