# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-06-11

### Changed
- Improved the communication with the DevRev backend.
- Improved the encryption techniques used throughout the SDK.

### Removed
- The `getSessionURL` function has been removed.

## [1.0.0-beta.7] - 2025-05-21

### Removed
- Removed the hardcoded kotlin version from the plugin to prevent issues in version updates.

## [1.0.0-beta.6] - 2025-05-02

### Changed
- Fixed a data type mismatch issue in the `addSessionProperties` method for iOS build.

## [1.0.0-beta.5] - 2025-04-30

### Changed
- Updated the `trackEvent`, `addSessionProperties`, `startTimer`, `endTimer` functions to accept plain objects instead of a map.

### Fixed
- Fixed the crash in the `trackEvent` function due to a type casting issue.

## [1.0.0-beta.4] - 2025-04-03

### Changed
- Improved the handling of custom fields in user, account and organization traits.

## [1.0.0-beta.1] - 2025-01-30

### Added
- Introducing the Session Analytics feature. This feature allows you to monitor the health of your application and its components.
- Added support for Push Notifications for the PLuG support chat.
- Added support for on-demand (offline) sessions.
- Added support to create new conversations in the PLuG support chat.
- Added support for in-app link handling.
