// swift-tools-version: 5.4
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "CAMobileAppAnalytics",
    platforms: [.iOS(.v11)],
    products: [
        .library(
            name: "CAMobileAppAnalytics",
            targets: ["CAMobileAppAnalytics"]),
    ],
    targets: [
        .target(
            name: "CAMobileAppAnalytics",
            dependencies: [
                "CAMobileAppAnalyticsWrapper"
            ],
            path: "./Sources/CAMobileAppAnalytics/",
            exclude: ["Classes/libCAMobileAppAnalytics.a", "Classes/libCAMobileAppAnalytics-simulator.a"],
            resources: [
                   .process("Resources")
            ],
        ),
        // C/ObjC Wrapper that exposes public headers
        .target(
            name: "CAMobileAppAnalyticsWrapper",
            dependencies: [ "CAMobileAppAnalyticsBinary"],
            path: "Sources/Wrapper",
            publicHeadersPath: "include",
            cSettings: [
                .headerSearchPath("../CAMobileAppAnalytics/Classes/"),
            ],
            linkerSettings: [.unsafeFlags(["-ObjC"])]
        ),
        .binaryTarget(
            name: "CAMobileAppAnalyticsBinary",
            path: "./Sources/CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework")
    ]
)
