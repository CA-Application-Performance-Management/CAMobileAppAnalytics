import Foundation
@_exported import CAMobileAppAnalyticsWrapper
public struct CAMobileAppAnalytics {
    public init() {
    }
}
@objc public extension Bundle {
    @objc static var CAMobileAppAnalytics_Bundle: Bundle {
        return Bundle.module
    }
}
