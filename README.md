# DevRev SDK for Expo
DevRev SDK, used for integrating DevRev services into your Expo app.

## Table of contents
- [DevRev SDK for Expo](#devrev-sdk-for-expo)
  - [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setting up the DevRev SDK](#setting-up-the-devrev-sdk)
    - [Step 1: Credentials](#step-1-credentials)
    - [Step 2: Configuration](#step-2-configuration)
  - [Features](#features)
    - [Identification](#identification)
      - [Anonymous identification](#anonymous-identification)
      - [Unverified identification](#unverified-identification)
    - [Verified identification](#verified-identification)
      - [Updating the user](#updating-the-user)
    - [PLuG support chat](#plug-support-chat)
      - [Creating a new support conversation](#creating-a-new-support-conversation)
    - [In-app link handling](#in-app-link-handling)
      - [In-app link callback (Android Only)](#in-app-link-callback-android-only)
    - [Analytics](#analytics)
    - [Observability](#observability)
      - [Opting in/out](#opting-inout)
      - [Session recording](#session-recording)
      - [Session properties](#session-properties)
      - [Masking sensitive data](#masking-sensitive-data)
      - [Timers](#timers)
      - [Screen tracking](#screen-tracking)
    - [Push notifications](#push-notifications)
      - [Configuration](#configuration)
      - [Registering for push notifications](#registering-for-push-notifications)
      - [Unregistering from push notifications](#unregistering-from-push-notifications)
      - [Processing push notification](#processing-push-notification)
        - [Android](#android)
          - [Example](#example)
        - [iOS](#ios)
          - [Example](#example-1)
  - [License](#license)

## Requirements
- `expo` (any version)
- `react-native` (compatible with Expo version)
- `@devrev/sdk-react-native` (version 1.0.2 or higher)

## Installation
1. To install the DevRev SDK, run the following command:
	```bash
	npx expo install @devrev/sdk-react-native-expo-plugin
	```
1. Configure the Expo config plugin in your `app.json` or `app.config.js`:
	```json
	{
	  "expo": {
	    "plugins": [
	      "@devrev/sdk-react-native-expo-plugin"
	    ]
	  }
	}
	```
1. Rebuild your app:
	```bash
	npx expo prebuild --clean
	```

## Setting up the DevRev SDK
### Step 1: Credentials
1. Open the DevRev web app at [https://app.devrev.ai](https://app.devrev.ai).
1. Go to the **Settings** page.
1. Then open the **PLuG Settings** page, and copy the value under **Your Unique App ID**.

### Step 2: Configuration
> [!IMPORTANT]
> The SDK must be configured before you can use any of its features.

Once you have the credentials, you can configure the DevRev SDK in your app. The SDK will be ready to use once you have called the configuration method:

```typescript
DevRevSDK.configure(appID: string)
```

## Features
### Identification
Certain features of the DevRev SDK **require** a user identification. There are two methods to identify your users:
- **Anonymous users**: Creates an anonymous user with an optional user identifier, no other data is stored or associated with the user.
- **Unverified users**: Identifies the user with a unique identifier, but does not verify the user's identity with the DevRev backend.

The identification functions should be placed at the appropriate place in your app after you login your user. If you have the user information at app launch, call the function after the `DevRevSDK.configure(appID:)` method.

> [!IMPORTANT]
> If you haven't previously identified the user, the DevRev SDK will automatically create an anonymous user for you right after the SDK has been configured.

> [!IMPORTANT]
> The user, organization and account traits in the `Identity` object also support custom fields, which need to be configured in the DevRev web app before they can be used. For more information, see [Object customization](https://devrev.ai/docs/product/object-customization).

#### Anonymous identification
The anonymous identification method is used to create an anonymous user with an optional user identifier.

```typescript
DevRevSDK.identifyAnonymousUser(userID: string)
```

#### Unverified identification
The unverified identification method is used to identify the user with a unique identifier, but does not verify the user's identity with the DevRev backend.

```typescript
DevRevSDK.identifyUnverifiedUser(userID: string, organizationID?: string)
```

### Verified identification
The verified identification method is used to identify the user with a unique identifier and verify the user's identity with the DevRev backend.

```typescript
DevRevSDK.identifyVerifiedUser(userID: string, sessionToken: string)
```

#### Updating the user
You can update the user's information using the following method:

```typescript
DevRevSDK.updateUser(identity: Identity)
```

> [!IMPORTANT]
> The `userID` property can *not* be updated.

### PLuG support chat
The support chat feature can be shown as a modal screen from the top-most screen.

> [!IMPORTANT]
> This feature requires that the SDK has been configured and the user has been identified (unverified and anonymous users).

```typescript
DevRevSDK.showSupport()
```

#### Creating a new support conversation
You have the ability to create a new conversation from within your app. The method will show the support chat screen and create a new conversation at the same time.

```typescript
DevRevSDK.createSupportConversation()
```

### In-app link handling
In certain cases, the links opened from the support chat are opened in the app instead of a browser. You can control whether the chat modal should be dismissed after the link is opened by calling the following method:

```typescript
DevRevSDK.setShouldDismissModalsOnOpenLink(value: boolean)
```

Setting this flag to true will use the system's default behavior for opening links, it will dismiss any DevRev modal screen in order to handle your own deep links.

#### In-app link callback (Android Only)
In certain cases where custom handling is required, the links from the support chat can be captured as follows:

```typescript
DevRevSDK.setInAppLinkHandler((url) => {
	// Perform an action here.
});
```

> [!NOTE]
> By default, if a custom handler is not set, all external/in-app links from the support chat are opened via the system default (e.g Chrome).

### Analytics
The DevRev SDK supports sending custom analytic events using a properties map.

> [!IMPORTANT]
> This feature requires that the SDK has been configured and the user has been identified (unverified and anonymous users).

You can track them using the following function:
```typescript
DevRevSDK.trackEvent(name: string, properties?: { [key: string]: string })
```

### Observability
The DevRev SDK provides observability features to help you understand how your users are interacting with your app.

#### Opting in/out
The observability features are opted-in by default, meaning that they are enabled from start.
You can opt-out of the observability features by calling the following method:

```typescript
DevRevSDK.stopAllMonitoring()
```

To opt back in, you can call the following method:

```typescript
DevRevSDK.resumeAllMonitoring()
```

#### Session recording
You can enable session recording to record user interactions with your app.

> [!CAUTION]
> The session recording feature is opt-out and is enabled by default.

The session recording feature has a number of methods to help you control the recording:

- `DevRevSDK.startRecording()`: Starts the session recording.
- `DevRevSDK.stopRecording()`: Stops the session recording and uploads it to the portal.
- `DevRevSDK.pauseRecording()`: Pauses the ongoing session recording.
- `DevRevSDK.resumeRecording()`: Resumes a paused session recording.
- `DevRevSDK.processAllOnDemandSessions()`: Stops the ongoing user recording and sends all on-demand sessions along with the

#### Session properties
You can add custom properties to the session recording to help you understand the context of the session. The properties are defined as a map of string values.

```typescript
DevRevSDK.addSessionProperties(properties: { [key: string]: any })
```

You also have the ability to clear the session properties in scenarios like user logout or when the session ends.

```typescript
DevRevSDK.clearSessionProperties()
```

#### Masking sensitive data
In order to protect sensitive data the DevRev SDK provides an auto-masking feature, which masks the data before it is being sent to the server. Input views such as text fields, text views, and web views are automatically masked.

While the auto-masking mechanism might be sufficient for most cases, you can also manually mark other views as sensitive using the following method:

```typescript
DevRevSDK.markSensitiveViews(tags: any[])
```

If any previously masked views need to be unmasked, you can use the following method:

```typescript
DevRevSDK.unmarkSensitiveViews(tags: any[])
```

#### Timers
As part of the observability features, the DevRev SDK provides a timer mechanism to help you measure the time spent on a specific task. Events such as response time, loading time, or any other time-based event can be measured using the timer.

The mechanism works using balanced start and stop methods that both accept a timer name and an optional dictionary of properties.

Start a timer using the method:
```typescript
DevRevSDK.startTimer(name: string, properties: { [key: string]: string })
```

And balance it with the stop method:
```typescript
DevRevSDK.stopTimer(name: string, properties: { [key: string]: string })
```

#### Screen tracking
The DevRev SDK provides automatic screen tracking to help you understand how users are navigating through your app. While view controllers are automatically tracked, you can also manually track screens using the following method:

```typescript
DevRevSDK.trackScreen(name: string)
```

### Push notifications
You can configure your app to receive push notifications from the DevRev SDK. The SDK is able to handle push notifications and perform actions based on the content of the notification.

The DevRev backend sends push notifications to your app to notify users about new messages in the PLuG support chat. In the future, the push notification support will be expanded with additional features.

#### Configuration
In order to receive push notifications, you need to configure your DevRev organization by following the [Push Notifications integration guide](#).

#### Registering for push notifications
> [!IMPORTANT]
> Push notifications require that the SDK has been configured and the user has been identified (unverified and anonymous users). The user identification is required to send the push notification to the correct user.

The DevRev SDK provides a method to register your device for receiving push notifications. You can call the following method to register for push notifications:

```typescript
DevRevSDK.registerDeviceToken(deviceToken: string, deviceID: string)
```

On Android devices the `deviceToken` should be the Firebase Cloud Messaging (FCM) token value, and on iOS devices it should be the APNS (Apple Push Notification Service) token.
The `deviceID` is a unique identifier for the device that must persist across device restarts and app launches.

#### Unregistering from push notifications
In cases when your app no longer wants to receive push notifications, you can unregister the device from receiving them. The method to unregister the device is:

```typescript
DevRevSDK.unregisterDevice(deviceID: string)
```

The method requires the device identifier, which is the same as the one used for registering the device.

#### Processing push notification

##### Android
Android notifications are implemented as data messages for flexibility, but this means automatic click processing isn't available. To handle notification clicks, developers need to intercept the click event, extract the payload, and pass it to a designated method for processing. This custom approach allows for tailored notification handling in Android applications.

```typescript
DevRevSDK.processPushNotification(payload: string)
```

Here, the `message` object from the notification payload needs to be passed to this function.

###### Example

```typescript
const notificationPayload = {
	// message may be nested based on the notification library
	"message": {
		// ... (the entire message object)
	}
};
const messageJson = notificationPayload["message"];
DevRevSDK.processPushNotification(JSON.stringify(messageJson));
```

##### iOS
On iOS devices you need to pass the received push notification payload to the DevRev SDK for processing. The SDK will handle the notification and perform the necessary actions:

```typescript
DevRevSDK.processPushNotification(payload: string)
```

###### Example

```typescript
DevRevSDK.processPushNotification(JSON.stringify(payload));
```

## License
Apache 2.0
