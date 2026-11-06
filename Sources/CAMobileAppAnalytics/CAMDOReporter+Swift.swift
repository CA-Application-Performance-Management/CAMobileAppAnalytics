import Foundation
#if canImport(CAMobileAppAnalyticsWrapper)
import CAMobileAppAnalyticsWrapper
#endif

/// Swift convenience for logging handled errors.
///
/// Default arguments are evaluated at the call site, so `stack`, `file`, `line` and
/// `function` describe where the error was handled without the caller passing anything.
public extension CAMDOReporter {

    /// Logs a handled `Error` together with the stack trace and source location of the call site.
static func logHandledError(
        _ error: Error,
        stack: [String] = Thread.callStackSymbols,
        file: String = #fileID,
        line: Int = #line,
        function: String = #function
    ) {
        __logHandledError(error as NSError, stack: stack, file: file, line: line, function: function)
    }
}
