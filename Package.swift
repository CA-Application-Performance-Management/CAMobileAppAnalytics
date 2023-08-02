// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "CAMobileAppAnalytics",
    platforms: [.iOS(.v11)],
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "CAMobileAppAnalytics",
            targets: ["CAMobileAppAnalytics"]),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
    .target(
        name: "CAMobileAppAnalytics",
        dependencies: [
        .target(
              name: "xcframework",
              condition: .when(platforms: [.iOS])
            ),
        ],
        exclude: ["Classes/libCAMobileAppAnalytics.a", "Classes/libCAMobileAppAnalytics-simulator.a"],
        resources: [
               .copy("Classes/CaMDOInterceptor.js"), 
               .copy("Classes/CaMDOIntegration.js")
        ],
        publicHeadersPath: "Classes/CAMDOReporter.h",
        cSettings: [
            .headerSearchPath("Classes")
        ],
        linkerSettings: [.unsafeFlags(["-ObjC"])]
        ),  
        .binaryTarget(name: "xcframework",
                      path: "./Sources/CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework"),
    ]
)
