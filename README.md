# Media Storage App

Welcome to the Media Storage App project! This application allows users to upload and manage media files (images and videos) using a simple and intuitive interface.

## Screenshots
Take a look at our app in action:

<p float="left">
  <img src="src/assets/images/app_overview.jpg" width="250" />
  <img src="src/assets/images/media_upload.jpg" width="250" />
  <img src="src/assets/images/media_list.jpg" width="250" />
</p>

- **App Overview (`app_overview.jpg`)**: Provides a general overview of the React Native application interface, showcasing various functionalities and components.
  
- **Media Upload (`media_upload.jpg`)**: Demonstrates the media upload feature within the app, showing a file picker and upload button.
  
- **Media List (`media_list.jpg`)**: Displays the list of uploaded media, including options to view and delete media items.

## Overview

The Media Storage App is a React Native application that allows users to upload and manage media files using a simple and intuitive interface. It integrates with a backend to store and retrieve media files and provides options to view and delete media items.

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Saurabhkumar12-byte/Originbluy_media_storage_app.git
    cd Originbluy_media_storage_app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Add your backend URL and API key (if any):**
    - Create a `.env` file in the root of the project:

    ```
    BACKEND_URL=your_backend_url_here
    API_KEY=your_api_key_here (if required)
    ```

4. **Run the project:**
    - For Android:
    ```bash
    npx react-native run-android
    ```
    - For iOS:
    ```bash
    npx react-native run-ios
    ```

## Features

- **Media Upload:** Allows users to upload images and videos.
- **Media Management:** Displays a list of uploaded media with options to view and delete items.
- **Integration with Backend:** Stores and retrieves media files from a backend server.

## Libraries Used

- `react-navigation` for navigation.
- `react-native-video` for video playback.
- `axios` for API requests.
- `react-native-document-picker` for file selection.
- `react-redux` for state management.
- `redux-thunk` for handling asynchronous actions.

## Folder Structure

Originbluy_media_storage_app/
├── android/
├── ios/
├── src/
│ ├── api/
│ │ └── mediaApi.ts # API functions for handling media requests
│ ├── assets/
│ │ └── images/ # Images and icons
│ ├── components/
│ │ └── MediaItem.tsx # Component for displaying media items
│ ├── screens/
│ │ └── MediaScreen.tsx # Screen for displaying and managing media
│ ├── store/
│ │ ├── slices/
│ │ │ └── mediaslice.ts # Redux slice for media management
│ │ └── index.ts # Redux store setup
│ └── App.tsx # Main entry point of the application
├── .env # Environment variable for API key and backend URL
├── README.md # This readme file
├── package.json
└── tsconfig.json


## Usage

1. **Media Screen:**
   - Select a file to upload by tapping the "Select Media" button.
   - Upload the selected file by tapping the "Upload Media" button.
   - View the list of uploaded media in the FlatList component.
   - Delete a media item by tapping the "Delete" button on the media item.

## Notes

- Ensure all dependencies are installed before running the application.
