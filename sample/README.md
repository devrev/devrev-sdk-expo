# DevRev SDK Sample App

- [DevRev SDK Sample App](#devrev-sdk-sample-app)
    - [Requirements](#requirements)
    - [Setup](#setup)
    - [Installation](#Installation)
    - [Running the sample app](#running-the-app)

## Requirements
- Node.js (v16 or higher)
- Yarn (v1.22 or higher)
- Xcode (v14 or higher, for iOS development)
- Android Studio (2022.1 or higher, for Android development)

## Setup
Before you start using the sample app you will need to configure it with your DevRev credentials. 

1. Open the DevRev web app at [https://app.devrev.ai](https://app.devrev.ai) and go to the **Settings** page.
2. Under **PLuG settings** copy the value under **Your unique App ID**.
3. Add your credentials in `App.tsx` to the following configuration method.

```typescript
DevRevSDK.configure(
    'YOUR_APP_ID',
);
```

## Installation
1. Rebuild your app:
    ```bash
	npx expo prebuild --clean
	```

2. Install dependencies:
    ```bash
    yarn
    ```

## Running the Sample App
To start the development server, run:

### For Android

```bash
npx expo run:android
```

### For iOS
- Open `ios/DevRevExpoSDKSample/AppDelegate.mm` and add the following lines.
    1. Import Firebase at the top of the file:
        ```objc
        #import Firebase;
        ```
    2. Configure Firebase inside the `application:didFinishLaunchingWithOptions:` method:
        ```objc
        [FIRApp configure];
        ```
        
```bash
npx expo run:ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
