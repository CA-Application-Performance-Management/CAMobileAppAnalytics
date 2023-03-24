#
# Be sure to run `pod lib lint CAMobileAppAnalytics.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'CAMobileAppAnalytics'
  s.version          = '23.4.0.1'
  s.summary          = 'CAMobileAppAnalytics is an iOS SDK for App Experience Analytics.'
  s.description      = <<-DESC
  "CAMobileAppAnalytics is an iOS SDK for App Experience Analytics that provides deep insights into the performance, user experience, crash, and log analytics of apps."
                         DESC
  s.homepage = "https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/configuring/collect-data-from-ios-applications.html"
  s.social_media_url =  "https://twitter.com/CAinc"
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'CA Technologies (A Broadcom Company)' => 'www.broadcom.com' }
  s.source           = { :git => 'https://github.com/CA-Application-Performance-Management/CAMobileAppAnalytics.git', :tag => s.version.to_s }
  s.ios.deployment_target = '9.0'
  s.platform         =:ios, '9.0'
  s.default_subspecs = "lib"

  s.libraries = 'c++', 'z', 'sqlite3'
  s.frameworks = 'CoreLocation', 'SystemConfiguration', 'Foundation', 'UIKit', 'CoreGraphics', 'Security', 'CoreTelephony', 'WebKit'
  s.requires_arc = true


  s.subspec 'lib' do |ss|
    ss.source_files = 'CAMobileAppAnalytics/Classes/*.h'
    ss.public_header_files = 'CAMobileAppAnalytics/Classes/*.h'
    ss.resources = 'CAMobileAppAnalytics/Classes/*.js'
    ss.vendored_libraries = 'CAMobileAppAnalytics/Classes/*.a'
  end

  s.subspec 'xcframework' do |ss|
    ss.source_files = 'CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework/ios-arm64_arm64e_armv7_armv7s/Headers/*.{h}'
    ss.public_header_files = 'CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework/ios-arm64_arm64e_armv7_armv7s/Headers/*.{h}'
    ss.resources = 'CAMobileAppAnalytics/Classes/*.js'
    ss.vendored_frameworks = 'CAMobileAppAnalytics/CAMobileAppAnalytics.xcframework'
    ss.xcconfig = {
      'OTHER_LDFLAGS' => '-ObjC'
    }
  end
  
end
