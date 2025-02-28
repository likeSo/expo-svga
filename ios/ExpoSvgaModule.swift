import ExpoModulesCore

public class ExpoSvgaModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoSvga')` in JavaScript.
    Name("ExpoSvga")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
      Function("setLogEnabled") { (enabled: Bool) in
      
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
      // view definition: Prop, Events.
      View(ExpoSvgaView.self) {
          Prop("source") { (view: ExpoSvgaView, source: SvgaViewSource) in
              if source.uri != nil {
                  view.play(uri: source.uri!)
              }
          }
          
          Prop("loops") { (view: ExpoSvgaView, loops: Bool) in
              view.svgaPlayer.loops = loops == true ? 1 : 0
          }
          Prop("clearsAfterStop") { (view: ExpoSvgaView, clearsAfterStop: Bool) in
              view.svgaPlayer.clearsAfterStop = clearsAfterStop
          }
          
          Prop("fillMode") { (view: ExpoSvgaView, fillMode: String) in
              view.svgaPlayer.fillMode = fillMode.capitalized
          }
          
          AsyncFunction("startAnimation") { (view: ExpoSvgaView) in
              view.svgaPlayer.startAnimation()
          }
          
          Events("onFinish", "onAnimateToFrame", "onAnimateToPercent")
      }
  }
}
