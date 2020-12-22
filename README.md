
<p align="center">
  <img src="Screen Shot 2020-12-14 at 12.34.22 AM.png"  height="450" /><br />
</p>
<br/>
# Build Your First Ionic App: Photo Gallery (Ionic React and Capacitor) with ReactQuery & Firebase

Get started with Ionic by building a photo gallery app that runs on iOS, Android, and the web - with just one codebase. This is the complete project referenced in the ["Your First App: React" guide](https://ionicframework.com/docs/react/your-first-app). Follow along to create a complete CRUD (create-read-update-delete) experience.

Powered by [Ionic React](https://ionicframework.com/docs/react) (web app) and [Capacitor](https://capacitor.ionicframework.com) (native app runtime).

## New Features
  * [NEW] Writing photo to Firebase Firestore
  * [NEW] Storing photo gallery in Firebase Storage
  * [NEW] Using React Query [https://react-query.tanstack.com/](https://react-query.tanstack.com/)

## Project Structure
* Tab1 (Photos) (`src/pages/Tab1.tsx`): Photo Gallery UI and basic logic.
* usePhotoQueries Hook (`src/hooks/usePhotoQueries.ts`): Logic encapsulating querying, chaching and updating photos.
* firebase-service  (`src/firebase-service.ts`): Reading adn Writing to firebase

## How to Run

[NEW] You need to include a `.env` file in the root directory of your application that has your firebase configuration
```
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-project-bucket
```

> Note: It's highly recommended to follow along with the [tutorial guide](https://ionicframework.com/docs/react/your-first-app), which goes into more depth, but this is the fastest way to run the app. 



