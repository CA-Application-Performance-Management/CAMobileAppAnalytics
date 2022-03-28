#
# Be sure to run `pod lib lint CAMobileAppAnalytics.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'CAMobileAppAnalytics'
  s.version          = '2022.3.0.3'
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
  s.source_files = 'CAMobileAppAnalytics/**/*.h'
  s.public_header_files = 'CAMobileAppAnalytics/**/*.h'
  s.resources = 'CAMobileAppAnalytics/**/*.js'
  s.vendored_libraries = 'CAMobileAppAnalytics/**/*.a'
  
  s.libraries = 'c++', 'z', 'sqlite3'
  s.frameworks = 'CoreLocation', 'SystemConfiguration', 'Foundation', 'UIKit', 'CoreGraphics', 'Security', 'CoreTelephony', 'WebKit'
  s.requires_arc = true
end
