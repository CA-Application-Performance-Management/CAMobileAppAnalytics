// swift-tools-version: 5.4
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription
import Foundation

//let package = Package(
//    name: "CAMobileAppAnalytics",
//    platforms: [.iOS(.v11)],
//    products: [
//        // Products define the executables and libraries a package produces, and make them visible to other packages.
//        .library(
//            name: "CAMobileAppAnalytics",
//            targets: ["CAMobileAppAnalytics"]),
//    ],
//    dependencies: [
//        // Dependencies declare other packages that this package depends on.
//        // .package(url: /* package url */, from: "1.0.0"),
//    ],
//    targets: [
//    .target(
//        name: "CAMobileAppAnalytics",
//        dependencies: [
//        .target(
//              name: "xcframework",
//              condition: .when(platforms: [.iOS])
//            ),
//        ],
//        path: "./Sources/CAMobileAppAnalytics/",
//        exclude: ["Classes/libCAMobileAppAnalytics.a", "Classes/libCAMobileAppAnalytics-simulator.a"],
//        resources: [
//               .process("Resources")
//        ],
//        publicHeadersPath: ".",
//        cSettings: [
//            .headerSearchPath("Classes")
//        ],
//        linkerSettings: [.unsafeFlags(["-ObjC"])]
//        ),
//        .binaryTarget(name: "xcframework",
//                      path: "./Sources/CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework"),
//    ]
//)

// swift-tools-version: 5.7
let package = Package(
    name: "CAMobileAppAnalytics",
    platforms: [
        .iOS(.v11)
    ],
    products: [
        .library(
            name: "CAMobileAppAnalytics",
            targets: ["CAMobileAppAnalytics"]
        )
    ],
    targets: [
        // Main Swift-facing target
        .target(
            name: "CAMobileAppAnalytics",
            dependencies: [
                "CAMobileAppAnalyticsWrapper"
            ],
            path: "Sources/CAMobileAppAnalytics",
            resources: [
                .process("Resources")
            ]
        ),

        // C/ObjC Wrapper that exposes public headers
        .target(
            name: "CAMobileAppAnalyticsWrapper",
            dependencies: [ "CAMobileAppAnalyticsBinary"],
            path: "Sources/Wrapper",
            publicHeadersPath: "include",
            cSettings: [
                    .headerSearchPath("."),
                    .headerSearchPath("../CAMobileAppAnalytics.xcframework/ios-arm64_arm64e_armv7_armv7s/Headers"),
                    .headerSearchPath("../CAMobileAppAnalytics.xcframework/ios-arm64_i386_x86_64-simulator/Headers")
//                    // Explicit SDK path so UIKit/CoreLocation are found
//                    .unsafeFlags([
//                        "-isysroot",
//                        "\(ProcessInfo.processInfo.environment["SDKROOT"] ?? "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk")"
//                    ])
                ],
            linkerSettings: [
                            .linkedFramework("UIKit"),
                            .linkedFramework("Foundation"),
                            .linkedFramework("CoreLocation"),
                            .linkedFramework("SystemConfiguration"),
                            .linkedFramework("CoreGraphics"),
                            .linkedFramework("Security"),
                            .linkedFramework("CoreTelephony"),
                            .linkedFramework("WebKit"),
                            // C libraries
                            .linkedLibrary("c++"),
                            .linkedLibrary("z"),
                            .linkedLibrary("sqlite3"),
                            .unsafeFlags(["-ObjC"])
                        ]
        ),

        // Binary XCFramework
        .binaryTarget(
            name: "CAMobileAppAnalyticsBinary",
            path: "Sources/CAMobileAppAnalytics.xcframework"
        )
    ]
)
